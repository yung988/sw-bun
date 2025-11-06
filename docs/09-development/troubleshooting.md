# Troubleshooting Guide

> Řešení běžných problémů a chyb ve SW Beauty projektu

## Build Errors

### Turbopack Errors

**Error: "Turbopack compilation failed"**
```
Error: Compilation failed
  × Module not found
```

**Příčina:** Import neexistujícího souboru nebo špatná cesta

**Řešení:**
```bash
# 1. Zkontrolovat cestu
ls src/components/MyComponent.tsx  # Existuje?

# 2. Zkontrolovat import
# ❌ import { Button } from '@/component/Button'
# ✅ import { Button } from '@/components/ui/button'

# 3. Clear cache + restart
rm -rf .next
bun run dev
```

---

### TypeScript Errors

**Error: "Type 'X' is not assignable to type 'Y'"**

**Řešení:**
```typescript
// 1. Zkontrolovat type definition
type Props = {
  name: string  // Očekává string
}

<Component name={123} />  // ❌ Passing number

// 2. Fix type nebo value
<Component name="John" />  // ✅
```

**Error: "Cannot find module '@/lib/utils'"**

**Příčina:** Špatný path alias nebo tsconfig

**Řešení:**
```json
// tsconfig.json - zkontrolovat paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Musí být správně
    }
  }
}
```

```bash
# Restart TypeScript server (VS Code)
Cmd+Shift+P → TypeScript: Restart TS Server
```

---

### Module Not Found

**Error: "Module not found: Can't resolve 'gsap'"**

**Příčina:** Dependency není nainstalovaná

**Řešení:**
```bash
# Install missing package
bun add gsap

# Pokud je v package.json ale chybí v node_modules
rm -rf node_modules bun.lock
bun install

# Clear Next.js cache
rm -rf .next
bun run dev
```

---

## Runtime Errors

### GSAP Initialization Errors

**Error: "gsap is not defined" nebo "ScrollTrigger is not registered"**

**Příčina:** GSAP použit na serveru nebo plugin not registered

**Řešení:**
```tsx
'use client'  // ✅ MUST be client component

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ✅ Register POUZE na klientu
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

useLayoutEffect(() => {
  // GSAP kód zde
}, [])
```

**Error: "ctx.revert is not a function"**

**Příčina:** Starý GSAP pattern, použijte context API

**Řešení:**
```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.element', { opacity: 0 })
  }, ref)

  return () => ctx.revert()  // ✅ Cleanup
}, [])
```

---

### Image Loading Issues

**Error: "Invalid src prop ... hostname not configured"**

**Příčina:** Remote image hostname není v next.config.ts

**Řešení:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "yourdomain.com" },  // ✅ Přidat
    ],
  },
}
```

**Error: Image not loading (404)**

**Příčina:** Špatná cesta nebo soubor neexistuje

**Řešení:**
```bash
# Zkontrolovat existenci
ls public/images/hero.jpg

# ✅ Správná cesta
/images/hero.jpg  # (public/ je implicit)

# ❌ Špatná cesta
/public/images/hero.jpg  # NO 'public/' v cestě
```

---

### API Failures

**Error: "500 Internal Server Error" v API Route**

**Debugging:**
```typescript
// app/api/booking/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Request body:', body)  // Debug

    // Your code
  } catch (error) {
    console.error('API Error:', error)  // ✅ Log error
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

**Check logs:**
```bash
# Development
bun run dev
# Logs v terminálu

# Production (Vercel)
vercel logs
```

**Error: "RESEND_API_KEY is not defined"**

**Příčina:** Environment variable není nastavena

**Řešení:**
```bash
# Development
echo "RESEND_API_KEY=re_xxx" >> .env.local
bun run dev  # Restart

# Production
vercel env add RESEND_API_KEY
vercel --prod  # Redeploy
```

---

## Development Issues

### Hot Reload Not Working

**Symptom:** Změny se nezobrazují, musíte manuálně refreshovat

**Řešení:**
```bash
# 1. Restart dev server
# Ctrl+C
bun run dev

# 2. Clear cache
rm -rf .next

# 3. Zkontrolovat Turbopack
# package.json - musí být --turbopack flag
"dev": "next dev --turbopack"

# 4. Zkontrolovat file watcher limit (macOS/Linux)
ulimit -n  # Mělo by být > 10000
```

---

### Port Conflicts

**Error: "Port 3000 is already in use"**

**Řešení:**
```bash
# 1. Kill process na portu 3000
lsof -ti:3000 | xargs kill -9

# 2. Nebo použít jiný port
PORT=3001 bun run dev

# 3. Nebo najít + kill manuálně
lsof -i :3000
kill -9 <PID>
```

---

### Dependencies Issues

**Error: "peer dependency warnings"**

**Příčina:** Nekompatibilní verze packages

**Řešení:**
```bash
# 1. Update všechno
bun update

# 2. Nebo specific package
bun add react@latest

# 3. Force install (pokud warnings persist)
bun install --force

# 4. Nuclear option
rm -rf node_modules bun.lock
bun install
```

**Error: "Cannot find module 'X' after bun add X"**

**Příčina:** Cache issue nebo TS server

**Řešení:**
```bash
# 1. Restart dev server
bun run dev

# 2. Restart TS server (VS Code)
Cmd+Shift+P → TypeScript: Restart TS Server

# 3. Clear cache
rm -rf .next node_modules bun.lock
bun install
```

---

## CSV/Data Issues

### Parsing Errors

**Error: "Cannot read property 'Category' of undefined"**

**Příčina:** CSV header neodpovídá kódu

**Řešení:**
```typescript
// Zkontrolovat CSV headers
// swbeauty-procedury.csv - první řádek:
Category,Subcategory,Name,Price,...

// lib/services.ts - musí matchovat
const category = row['Category']  // ✅ Case-sensitive!
```

**Debug CSV parsing:**
```typescript
const parsed = Papa.parse(csvText, { header: true })
console.log('Headers:', Object.keys(parsed.data[0]))
console.log('First row:', parsed.data[0])
```

---

### Missing Services

**Symptom:** Některé služby se nezobrazují

**Debugging:**
```typescript
// lib/services.ts
const items = parseCSV(csv)
console.log('Parsed items:', items.length)
console.log('First item:', items[0])

// Zkontrolovat filtrování
if (!item.name || !item.category) {
  console.log('Skipped item:', item)
  continue
}
```

---

### Image Resolution

**Symptom:** Obrázky služeb nezobrazují správné images

**Příčina:** Image path v CSV nebo fallback logic

**Řešení:**
```bash
# 1. Zkontrolovat CSV
cat public/swbeauty-procedury.csv | grep "Image"

# 2. Zkontrolovat soubory existují
ls public/images/*.jpg

# 3. Debug image resolution
# lib/services.ts - priceItemToService()
console.log('Image path:', imagePath)
console.log('Mosaic images:', mosaic)
```

---

## Email/API Issues

### Resend API Errors

**Error: "401 Unauthorized"**

**Příčina:** Špatný nebo chybějící API key

**Řešení:**
```bash
# Zkontrolovat API key
echo $RESEND_API_KEY  # V .env.local

# Verify API key je platný
curl -X GET https://api.resend.com/api-keys \
  -H "Authorization: Bearer $RESEND_API_KEY"

# Vygenerovat nový na resend.com
```

**Error: "429 Too Many Requests"**

**Příčina:** Rate limit (100 emails/den free tier)

**Řešení:**
- Upgrade Resend plán
- Použít jiný email pro testing
- Implementovat request throttling

---

### CORS Errors

**Error: "CORS policy blocked"**

**Příčina:** Frontend volá API z jiného origin

**Řešení:**
```typescript
// app/api/route.ts
export async function POST(request: Request) {
  const response = NextResponse.json({ success: true })

  // ✅ Povolit CORS (pokud nutné)
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST')

  return response
}
```

**Ale:** Next.js API Routes jsou same-origin by default, CORS by neměl být problém pokud voláte z Next.js frontendu.

---

## Performance Issues

### Slow Builds

**Symptom:** `bun run build` trvá dlouho

**Řešení:**
```bash
# 1. Zkontrolovat bundle analyzer
bun add -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)

# Spustit
ANALYZE=true bun run build

# 2. Optimalizovat importy
# ❌ Import celé library
import _ from 'lodash'

# ✅ Import pouze potřebné
import { debounce } from 'lodash-es'

# 3. Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

---

### Slow Runtime

**Symptom:** Stránka je pomalá, laguje

**Debugging:**
```bash
# 1. Vercel Speed Insights
<SpeedInsights />  # V layoutu

# 2. React DevTools Profiler
# Chrome → React DevTools → Profiler

# 3. Zkontrolovat GSAP animace
# - Jsou všechny ctx.revert() called?
# - Používáte will-change správně?
```

**Common fixes:**
```tsx
// 1. Memoize komponenty
const MemoizedComponent = memo(MyComponent)

// 2. useMemo/useCallback
const filtered = useMemo(() => filter(data), [data])

// 3. Virtualizace (pro long lists)
import { FixedSizeList } from 'react-window'

// 4. Image optimization
<Image
  src="..."
  sizes="(max-width: 768px) 100vw, 50vw"  // ✅ Proper sizes
  priority={isAboveFold}
/>
```

---

## Database/Cache Issues

**Symptom:** Services cache není invalidován

**Řešení:**
```typescript
// lib/services.ts
export function clearServicesCache() {
  servicesCache = null
}

// Volat po update CSV
clearServicesCache()
await getAllServices()  // Fresh load
```

**Symptom:** Změny v CSV se nezobrazují

**Příčina:** Cache nebo build cache

**Řešení:**
```bash
# 1. Clear services cache
# Restart dev server (cache je in-memory)
bun run dev

# 2. Clear Next.js cache
rm -rf .next

# 3. Production - redeploy
git push  # Trigger new build
```

---

## Where to Find Logs

### Development
```bash
# Terminal kde běží bun run dev
# Všechny console.log se zobrazí zde

# Browser console
# Chrome DevTools → Console
```

### Production (Vercel)
```bash
# CLI
vercel logs

# Dashboard
# vercel.com → project → Logs
```

### Error Tracking (budoucnost)
```bash
# Sentry, LogRocket, atd.
```

---

## Quick Fixes

### Nuclear Option (Reset Everything)
```bash
rm -rf node_modules bun.lock .next
bun install
bun run dev
```

### Clear All Caches
```bash
# Node modules
rm -rf node_modules

# Bun cache
rm -rf ~/.bun/install/cache

# Next.js cache
rm -rf .next

# TypeScript cache
rm -rf tsconfig.tsbuildinfo

# Reinstall
bun install
```

### Verify Installation
```bash
# Check versions
bun --version
node --version
next --version  # bun run next --version

# Check env
echo $RESEND_API_KEY
cat .env.local

# Check dependencies
bun run check  # Lint + format
```

---

## Common Error Patterns

| Error | Příčina | Řešení |
|-------|---------|--------|
| `Module not found` | Missing import | `bun add <package>` |
| `gsap is not defined` | Server-side GSAP | Add `'use client'` |
| `Image hostname not configured` | Missing next.config | Add to remotePatterns |
| `API 500` | Server error | Check logs, env vars |
| `Type error` | TypeScript | Fix types |
| `Port in use` | Process running | `kill -9 <PID>` |
| `Hot reload broken` | Cache/watcher | Clear .next, restart |

---

## Závěr

**Debug strategy:**
1. Read error message carefully
2. Check logs (terminal, browser, Vercel)
3. Verify environment (env vars, dependencies)
4. Clear caches
5. Nuclear option (rm -rf all)

**Související dokumentace:**
- [Environment Variables](/docs/08-configuration/environment-variables.md)
- [Code Style](/docs/09-development/code-style.md)
- [Quick Reference](/docs/QUICK_REFERENCE.md)
