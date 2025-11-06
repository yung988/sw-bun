# Architecture Overview

> High-level architektonický přehled SW Beauty aplikace

## Table of Contents

- [Co je SW Beauty](#co-je-sw-beauty)
- [Architektura na Vysoké Úrovni](#architektura-na-vysoké-úrovni)
- [Next.js App Router Approach](#nextjs-app-router-approach)
- [Server vs Client Components](#server-vs-client-components)
- [API Routes Struktura](#api-routes-struktura)
- [Data Flow](#data-flow)
- [Design Patterns](#design-patterns)
- [Key Architectural Decisions](#key-architectural-decisions)
- [Performance Considerations](#performance-considerations)
- [Security Approach](#security-approach)
- [Deployment Architecture](#deployment-architecture)

---

## Co je SW Beauty

**SW Beauty** je moderní webová prezentace pro kosmetický salon specializující se na pokročilé estetické procedury (HIFU lifting, Endosphere, kosmetika, budování svalů EMS, atd.).

### Hlavní Funkce

1. **Katalog Služeb** - Dynamicky načítané z CSV souboru
2. **Online Rezervace** - Formulář s validací a email notifikacemi
3. **Ceník** - Interaktivní tabulka s vyhledáváním a filtrováním
4. **Galerie** - Pokročilé GSAP scroll animace
5. **Dárkové Poukazy** - Konfigurátor s live preview
6. **Kontaktní Formulář** - S Resend email integrací

### Cílová Skupina

- Potenciální klienti (B2C) hledající kosmetické služby
- Existující klienti pro rezervace a informace
- Mobilní uživatelé (50%+ trafficu)

---

## Architektura na Vysoké Úrovni

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   React    │  │   GSAP     │  │   Lenis    │            │
│  │ Components │  │ Animations │  │   Scroll   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 15 (App Router)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Server Components (RSC)                             │   │
│  │  - Homepage                                          │   │
│  │  - Service Pages                                     │   │
│  │  - Static Content                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Client Components                                   │   │
│  │  - Navbar, Footer                                    │   │
│  │  - Modals (Booking, Voucher)                        │   │
│  │  - Forms, Animations                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes                                          │   │
│  │  - /api/pricelist (GET CSV data)                    │   │
│  │  - /api/booking (POST reservation)                  │   │
│  │  - /api/contact (POST contact form)                 │   │
│  │  - /api/send-gift-card (POST voucher)              │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    CSV File  │  │ Image Assets │  │  Resend API  │      │
│  │  (services)  │  │  (/images)   │  │   (email)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Architektonické Vrstvy

1. **Presentation Layer** (Browser)
   - React komponenty (Server + Client)
   - GSAP animace
   - Tailwind CSS styling
   - Lenis smooth scroll

2. **Application Layer** (Next.js)
   - App Router pages
   - API Routes
   - Middleware (pokud je)
   - Server Actions (budoucnost)

3. **Data Layer**
   - CSV parsing (papaparse)
   - File system (public/)
   - External APIs (Resend)
   - In-memory caching

---

## Next.js App Router Approach

Projekt používá **Next.js 15 App Router** (nikoli Pages Router).

### Struktura Složek

```
src/app/
├── layout.tsx              # Root layout (Server Component)
├── page.tsx                # Homepage (Server Component)
├── globals.css             # Global styles
├── api/                    # API Routes
│   ├── booking/route.ts
│   ├── contact/route.ts
│   ├── pricelist/route.ts
│   └── send-gift-card/route.ts
├── sluzby/                 # Services pages
│   ├── page.tsx
│   ├── _client.tsx         # Client-only logic
│   └── [kategorie]/
│       ├── page.tsx
│       └── _client.tsx
├── cenik/
│   └── page.tsx
└── kontakt/
    └── page.tsx
```

### File Conventions

- **`page.tsx`** - Route page (může být Server nebo Client Component)
- **`layout.tsx`** - Layout wrapper (Server Component)
- **`_client.tsx`** - Client-only logic (konvence tohoto projektu)
- **`route.ts`** - API Route handler (GET, POST, atd.)
- **`loading.tsx`** - Loading UI (React Suspense)
- **`error.tsx`** - Error boundary

### Routing

Automatický file-system based routing:

```
/                       → app/page.tsx
/sluzby                 → app/sluzby/page.tsx
/sluzby/kosmetika       → app/sluzby/[kategorie]/page.tsx (kategorie="kosmetika")
/cenik                  → app/cenik/page.tsx
/kontakt                → app/kontakt/page.tsx
/api/pricelist          → app/api/pricelist/route.ts
```

---

## Server vs Client Components

### Server Components (Default)

**Kdy použít:**
- Statický obsah
- Data fetching (z CSV, databáze)
- SEO-critical content
- Markdown/MDX rendering

**Příklady v projektu:**
```tsx
// app/page.tsx - Homepage (Server Component)
export default async function HomePage() {
  const services = await getAllServices()  // Server-side data fetch
  return <HomeContent services={services} />
}
```

**Výhody:**
- Zero JavaScript na klienta (menší bundle)
- Přímý přístup k file systému, databázi
- Lepší SEO
- Rychlejší initial load

### Client Components

**Kdy použít:**
- Interaktivita (useState, useEffect)
- Event handlery (onClick, onChange)
- Browser APIs (localStorage, window)
- Context providers
- GSAP animace (potřebují DOM refs)

**Označení:**
```tsx
'use client'  // Vždy na začátku souboru

import { useState } from 'react'

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  // ...
}
```

**Příklady v projektu:**
- Navbar, Footer (interaktivní menu)
- BookingModal, VoucherModal (useState, GSAP)
- Všechny animační komponenty (useLayoutEffect, GSAP)
- PriceTable (search state, filters)

### Hybrid Pattern

```tsx
// app/sluzby/page.tsx (Server Component)
export default async function ServicesPage() {
  const services = await getAllServices()  // Server-side

  return <ServicesClient services={services} />  // Pass to Client
}

// app/sluzby/_client.tsx (Client Component)
'use client'
export default function ServicesClient({ services }) {
  const [search, setSearch] = useState('')
  // Client-side interaktivita
}
```

---

## API Routes Struktura

### GET /api/pricelist

**Účel:** Načíst všechny služby z CSV souboru

**Response:**
```typescript
PriceItem[] = [
  {
    category: "Kosmetika",
    subcategory: "Základní péče",
    name: "Hloubkové čištění pleti",
    description: "...",
    price: "1200",
    duration: 60,
    sessions: 1,
    benefits: ["..."],
    image: "/images/kosmetika.jpg",
    images: [...]
  },
  // ...
]
```

**Implementace:**
```typescript
// app/api/pricelist/route.ts
export async function GET() {
  const csv = await fs.readFile('public/swbeauty-procedury.csv', 'utf-8')
  const items = parseCSV(csv)
  return NextResponse.json(items)
}
```

### POST /api/booking

**Účel:** Odeslat rezervaci a poslat email

**Request Body:**
```typescript
{
  service: string
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message?: string
}
```

**Response:**
```typescript
{ success: true } | { error: string }
```

**Implementace:**
- Validace Zod schema
- Odeslání emailu přes Resend
- Return success/error

### POST /api/contact

**Účel:** Kontaktní formulář

### POST /api/send-gift-card

**Účel:** Objednávka dárkového poukazu

---

## Data Flow

### CSV → Services Flow

```
┌─────────────────────────┐
│ swbeauty-procedury.csv  │
│ (public/)               │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   lib/services.ts       │
│   - parseCSV()          │
│   - priceItemToService()│
│   - servicesCache       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Server Components      │
│  - getAllServices()     │
│  - getServiceBySlug()   │
│  - getCategories()      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   React Components      │
│   - ServiceCard         │
│   - PriceTable          │
│   - CategoryMosaic      │
└─────────────────────────┘
```

### Cache Strategy

```typescript
// lib/services.ts
let servicesCache: Service[] | null = null
let servicesLoading: Promise<Service[]> | null = null

async function loadServices(): Promise<Service[]> {
  if (servicesCache) return servicesCache  // Return cached

  if (!servicesLoading) {
    servicesLoading = (async () => {
      const csv = await getPriceListFile()
      const items = parseCSV(csv)
      return Promise.all(items.map(priceItemToService))
    })()

    servicesCache = await servicesLoading
    servicesLoading = null
  }

  return servicesCache ?? []
}
```

**Cache Features:**
- In-memory cache (reset při restartu serveru)
- Deduplication (multiple simultaneous calls)
- `clearServicesCache()` pro invalidaci

---

## Design Patterns

### 1. Provider Pattern (Context API)

```typescript
// ModalProvider.tsx
const ModalContext = createContext<ModalContextType>()

export function ModalProvider({ children }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  // ...
  return (
    <ModalContext.Provider value={{ openBooking, openVoucher }}>
      {children}
      <BookingModal ... />
      <VoucherModal ... />
    </ModalContext.Provider>
  )
}

export function useModals() {
  return useContext(ModalContext)
}
```

**Použití:**
- ModalProvider (booking, voucher)
- BrandProvider (logo assets)
- IntroProvider (intro completion state)

### 2. Composition Pattern

```tsx
<Section id="o-nas">
  <Container>
    <h2>O nás</h2>
    <p>Popis</p>
  </Container>
</Section>
```

### 3. Render Props / Children as Function

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={(newDate) => setDate(newDate)}
/>
```

### 4. Custom Hooks

```typescript
// useBookingModal hook
export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [service, setService] = useState<Service>()

  const open = (preselectedService?: Service) => {
    setService(preselectedService)
    setIsOpen(true)
  }

  return { isOpen, open, close: () => setIsOpen(false), service }
}
```

### 5. Factory Pattern (Service Creation)

```typescript
async function priceItemToService(item: PriceItem): Promise<Service> {
  const categoryId = createSlug(item.category)
  const mosaic = await getCategoryMosaicServer(categoryId)
  // Transform raw data → Service object
  return { slug, name, price, images, ... }
}
```

---

## Key Architectural Decisions

### 1. CSV místo Databáze

**Rozhodnutí:** Služby jsou v CSV souboru (`swbeauty-procedury.csv`)

**Proč:**
- Jednoduchost (žádná databáze, žádný hosting)
- Snadná editace (Excel, Google Sheets)
- Statický obsah (nečastá změna)
- Fast builds (no DB connection)

**Trade-offs:**
- Nemůžeme přidat službu bez redeploy
- Nepodporuje real-time updates
- Limit na velikost dat (ale pro tento use case OK)

**Budoucnost:** Pokud potřebujeme dynamické přidávání → CMS (Sanity, Contentful) nebo databáze (Supabase)

### 2. Bun místo npm/yarn

**Rozhodnutí:** Používat Bun jako package manager a runtime

**Proč:**
- Rychlejší install (3-10× rychlejší než npm)
- Drop-in replacement pro Node.js
- Built-in TypeScript support
- Fast script execution

**Commands:**
```bash
bun install      # Místo npm install
bun run dev      # Místo npm run dev
bun add gsap     # Místo npm install gsap
```

### 3. GSAP místo Framer Motion

**Rozhodnutí:** GSAP pro animace (ne Framer Motion)

**Proč:**
- Lepší performance (hardware accelerated)
- Větší kontrola (imperativní API)
- ScrollTrigger plugin (industry standard)
- Timeline sequences
- Quiet luxury feel vyžaduje jemné, precizní animace

**Trade-offs:**
- Imperativní (ne deklarativní jako Framer)
- Steeper learning curve
- Placená licence pro komerční (ale GreenSock je férová)

### 4. Tailwind 4 CSS-First

**Rozhodnutí:** Upgrade na Tailwind 4 (beta)

**Proč:**
- Moderní `@theme` direktiva
- CSS variables out-of-the-box
- Lepší performance (Oxide engine)
- Future-proof

**Trade-offs:**
- Beta verze (může mít bugy)
- Breaking changes from v3

### 5. Email s Resend (ne SendGrid, Nodemailer)

**Rozhodnutí:** Resend pro email delivery

**Proč:**
- Developer-friendly API
- React Email komponenty
- Dobrá deliverability
- Generous free tier (100 emails/den)

---

## Performance Considerations

### 1. Image Optimization

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero"
  fill
  sizes="100vw"
  priority  // Pro above-fold images
/>
```

- Next.js Image automaticky optimalizuje (WebP, sizes)
- `priority` pro hero images (prevent LCP issues)
- `loading="lazy"` pro below-fold

### 2. Code Splitting

```tsx
// Dynamic import pro heavy komponenty
const GallerySection = dynamic(() => import('@/components/GallerySection'), {
  loading: () => <div>Loading...</div>,
  ssr: false  // Pokud není potřeba SSR
})
```

### 3. Server Components

- Většina pages je Server Components (zero JS na klienta)
- Client Components pouze kde je potřeba interaktivita

### 4. Font Optimization

```tsx
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',  // FOUT prevence
  preload: true
})
```

### 5. CSS Bundle Size

- Tailwind purge automaticky (Tailwind 4)
- Pouze použité třídy v produkci
- Gzip compression

---

## Security Approach

### 1. Input Validation

```typescript
// Zod schema
const bookingSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^(\+420)?[0-9]{9}$/),
  // ...
})
```

- Vždy validovat na serveru (API Routes)
- Zod pro type-safe validation
- Sanitizace user inputu

### 2. Environment Variables

```bash
# .env.local (NEVER commit!)
RESEND_API_KEY=re_xxx
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz
```

- `NEXT_PUBLIC_*` pro client-side
- Secret keys POUZE na serveru
- Vercel environment variables v produkci

### 3. API Rate Limiting

**Budoucnost:** Implementovat rate limiting (např. `vercel/edge-rate-limit`)

### 4. CORS

Next.js API Routes defaultně CORS bezpečné (same-origin only)

### 5. Content Security Policy

**Budoucnost:** CSP headers v `next.config.ts`

---

## Deployment Architecture

### Vercel Platform

**Production:**
```
Git Push (main branch)
    ↓
Vercel Build (Turbopack)
    ↓
Deploy to Edge Network
    ↓
HTTPS: swbeauty.cz
```

**Preview Deployments:**
- Každý pull request → preview URL
- Automatické cleanup po merge

### Build Configuration

```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  }
}
```

**Turbopack:**
- Rychlejší než Webpack (Rust-based)
- Incremental builds
- Faster HMR (Hot Module Replacement)

### Environment

**Development:**
- `bun run dev` na `http://localhost:3000`
- Turbopack dev server
- Fast refresh

**Production:**
- Static Generation kde je možné (Server Components)
- Edge Functions pro API Routes
- CDN pro images, CSS, JS

---

## Závěr

SW Beauty architektura je postavená na:
- **Next.js 15 App Router** (Server + Client Components)
- **CSV-based data layer** (jednoduchost, rychlost)
- **GSAP animations** (high-quality UX)
- **Tailwind 4** (moderní styling)
- **Vercel deployment** (zero-config, edge network)

**Klíčové principy:**
1. Server-first (minimalizace client JS)
2. Performance (Image optimization, code splitting)
3. Simplicita (CSV over DB, Bun, Tailwind)
4. UX (GSAP, Lenis, quiet luxury design)

**Další dokumentace:**
- [Tech Stack Details](/docs/02-architecture/tech-stack.md)
- [Component Catalog](/docs/06-components/component-catalog.md)
- [Development Guide](/docs/09-development/code-style.md)
