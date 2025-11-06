# Environment Variables

> Kompletní dokumentace environment variables v SW Beauty projektu

## Table of Contents

- [Přehled Proměnných](#přehled-proměnných)
- [Development Setup](#development-setup)
- [Production Setup](#production-setup)
- [Použití v Kódu](#použití-v-kódu)
- [Bezpečnost](#bezpečnost)
- [Troubleshooting](#troubleshooting)

---

## Přehled Proměnných

### RESEND_API_KEY

**Typ:** Secret (server-only)
**Povinné:** Ano (pro email funkcionalitu)
**Použití:** API klíč pro Resend email service

**Kde získat:**
1. Registrovat se na https://resend.com
2. Vytvořit API klíč v dashboard
3. Copy klíč (začíná `re_...`)

**Kde je použita:**
- `app/api/booking/route.ts` - odesílání rezervací
- `app/api/contact/route.ts` - kontaktní formulář
- `app/api/send-gift-card/route.ts` - dárkové poukazy

**Příklad:**
```bash
RESEND_API_KEY=re_abc123xyz456
```

---

### NEXT_PUBLIC_SITE_URL

**Typ:** Public (client + server)
**Povinné:** Ne (má fallback)
**Použití:** Base URL aplikace pro absolutní odkazy

**Development:**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production:**
```bash
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz
```

**Kde je použita:**
- Email templates (absolutní odkazy)
- Social share odkazy
- Canonical URLs (SEO)

**Fallback:** Pokud není nastavena, Next.js použije `process.env.VERCEL_URL`

---

### NODE_ENV

**Typ:** Systémová (automatická)
**Hodnoty:** `development` | `production` | `test`

**Automaticky nastavuje:**
- `bun run dev` → `development`
- `bun run build` → `production`
- `bun test` → `test`

**Použití:**
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info')
}
```

---

## Development Setup

### .env.local

Vytvořit soubor `.env.local` v root projektu:

```bash
# .env.local (NEVER commit to git!)

# Resend API Key (required)
RESEND_API_KEY=re_your_api_key_here

# Public Site URL (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**DŮLEŽITÉ:**
- `.env.local` je v `.gitignore` - **NIKDY** necommitovat
- Použít pouze pro lokální development
- Pro každého vývojáře jiné hodnoty (vlastní API keys)

### .env.example

Template pro ostatní vývojáře (COMMITOVAT):

```bash
# .env.example - Copy to .env.local and fill in values

RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Production Setup

### Vercel Dashboard

1. Přejít na Vercel project → Settings → Environment Variables
2. Přidat proměnné:

```
RESEND_API_KEY          = re_production_key
NEXT_PUBLIC_SITE_URL    = https://swbeauty.cz
```

3. Vybrat environment: Production, Preview, Development
4. Save

**Redeploy:** Po změně env vars je nutné redeploy:
```bash
vercel --prod
```
nebo git push (automatický deploy)

### Environment Scopes

- **Production:** Pouze main branch
- **Preview:** Pull requests, feature branches
- **Development:** `vercel dev` lokálně

---

## Použití v Kódu

### Server-Side (API Routes, Server Components)

```typescript
// app/api/booking/route.ts
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY  // Přístupné

  if (!apiKey) {
    throw new Error('RESEND_API_KEY not set')
  }

  const resend = new Resend(apiKey)
  // ...
}
```

**Pravidla:**
- Secret keys POUZE na serveru
- Nikdy nepřeposílat na klienta
- Vždy validovat, že existují

---

### Client-Side (Client Components)

```tsx
'use client'

export default function MyComponent() {
  // ✅ Public proměnná (NEXT_PUBLIC_ prefix)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  // ❌ Secret proměnná - undefined na klientu!
  const apiKey = process.env.RESEND_API_KEY  // undefined!

  return <div>Site: {siteUrl}</div>
}
```

**Pravidla:**
- Pouze `NEXT_PUBLIC_*` proměnné jsou dostupné
- Ostatní jsou `undefined`
- Vždy používat fallback:
  ```tsx
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://swbeauty.cz'
  ```

---

### Edge Runtime (Middleware)

```typescript
// middleware.ts
export function middleware(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  // ...
}
```

**Omezení:**
- Pouze `NEXT_PUBLIC_*` a Vercel system vars
- Žádné Node.js-specific proměnné

---

## Bezpečnost

### Co NESMÍ být v .env

❌ **NIKDY necommitovat:**
- API keys (`RESEND_API_KEY`)
- Databázové URL a credentials
- Private keys
- OAuth secrets
- JWT secrets

❌ **NIKDY nepřeposílat na klienta:**
```tsx
// ❌ BAD - Posílá secret na klienta!
<div data-key={process.env.RESEND_API_KEY}>
```

### Co MŮŽE být public

✅ **NEXT_PUBLIC_* proměnné:**
- Public API endpoints
- Feature flags (public)
- Site URL
- Analytics IDs (Google Analytics, atd.)

**Ale:**
- Vždy zvážit, zda OPRAVDU musí být public
- Preferovat server-side kdy je to možné

---

### Validace Environment Variables

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

export const env = envSchema.parse(process.env)

// Použití:
import { env } from '@/lib/env'
const apiKey = env.RESEND_API_KEY  // Type-safe!
```

**Výhody:**
- Type safety
- Runtime validation
- Fail-fast při chybějících vars
- Autocomplete

---

## Troubleshooting

### Proměnná není dostupná

**Symptom:**
```typescript
const apiKey = process.env.RESEND_API_KEY
console.log(apiKey)  // undefined
```

**Příčiny:**
1. Soubor `.env.local` neexistuje
2. Špatný název proměnné (typo)
3. Používáte client komponentu (a není `NEXT_PUBLIC_`)
4. Změnili jste `.env.local` ale nerestartovali server

**Řešení:**
```bash
# 1. Zkontrolovat .env.local existuje
ls -la .env.local

# 2. Restartovat dev server
bun run dev

# 3. Zkontrolovat název proměnné
cat .env.local

# 4. Pro klienta přidat NEXT_PUBLIC_
NEXT_PUBLIC_SITE_URL=...
```

---

### Production proměnné nefungují

**Symptom:** V produkci chyba "API key not found"

**Příčiny:**
1. Env vars nejsou nastavené v Vercel dashboard
2. Deployment před nastavením vars
3. Špatný environment scope

**Řešení:**
1. Vercel Dashboard → Environment Variables
2. Přidat `RESEND_API_KEY`
3. Vybrat "Production"
4. Save
5. Redeploy:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

---

### "NEXT_PUBLIC_* not updated"

**Symptom:** Public proměnná má starou hodnotu

**Příčina:** Next.js bundluje `NEXT_PUBLIC_*` při build time

**Řešení:**
```bash
# Rebuild aplikace
bun run build

# V development - restart server
# Kill + bun run dev
```

**DŮLEŽITÉ:**
- `NEXT_PUBLIC_*` vars jsou **build-time**, ne runtime!
- Změna vyžaduje rebuild

---

### Testing s Env Vars

```typescript
// __tests__/api.test.ts
describe('API', () => {
  beforeAll(() => {
    process.env.RESEND_API_KEY = 'test_key'
  })

  it('should send email', async () => {
    // Test code
  })
})
```

**Mock:**
```typescript
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: { send: vi.fn().mockResolvedValue({ id: '123' }) }
  }))
}))
```

---

## .env.local Template

Kompletní template pro vývojáře:

```bash
# .env.local - Local development environment variables
# Copy from .env.example and fill in your values

# ============================================
# REQUIRED - Email Service
# ============================================
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# ============================================
# OPTIONAL - Site Configuration
# ============================================
# Base URL for your application (used in emails, social sharing)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ============================================
# SYSTEM (Automatically set by Next.js)
# ============================================
# NODE_ENV=development  # Set automatically by Next.js

# ============================================
# NOTES
# ============================================
# - NEVER commit .env.local to git
# - Use .env.example as a template for other developers
# - Server-only vars: No NEXT_PUBLIC_ prefix
# - Client vars: Must have NEXT_PUBLIC_ prefix
# - Restart dev server after changes
```

---

## Quick Reference

| Proměnná | Typ | Povinná | Kde použít |
|----------|-----|---------|------------|
| `RESEND_API_KEY` | Secret | Ano | Server-only |
| `NEXT_PUBLIC_SITE_URL` | Public | Ne | Server + Client |
| `NODE_ENV` | System | Automaticky | Všude |

**Commands:**
```bash
# Development
echo "RESEND_API_KEY=re_xxx" > .env.local
bun run dev

# Production (Vercel)
vercel env add RESEND_API_KEY
vercel --prod
```

**Validace:**
```bash
# Check env vars are loaded
node -e "console.log(require('dotenv').config())"

# In Next.js
console.log(process.env)  # V server komponentě
```

---

## Závěr

Environment variables v SW Beauty:
- **Development:** `.env.local` soubor (gitignored)
- **Production:** Vercel Dashboard
- **Security:** Secret keys POUZE na serveru
- **Public vars:** `NEXT_PUBLIC_*` prefix

**Další dokumentace:**
- [Architecture Overview](/docs/02-architecture/overview.md)
- [Troubleshooting](/docs/09-development/troubleshooting.md)
