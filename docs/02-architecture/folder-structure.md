# Folder Structure & Architecture

Komplexní přehled organizace souborů a složek v SW Beauty projektu.

## Table of Contents

- [Directory Tree](#directory-tree)
- [Root Level](#root-level)
- [Source Directory (/src)](#source-directory-src)
- [App Directory (/src/app)](#app-directory-srcapp)
- [Components (/src/components)](#components-srccomponents)
- [Lib Directory (/src/lib)](#lib-directory-srclib)
- [Public Directory](#public-directory)
- [Naming Conventions](#naming-conventions)
- [File Organization Patterns](#file-organization-patterns)

---

## Directory Tree

```
sw-bun/
├── .next/                    # Next.js build output (auto-generated)
├── node_modules/             # Dependencies (auto-generated)
├── public/                   # Static assets
│   ├── images/              # Obrázky pro služby a galerie
│   ├── services/            # CSV data pro služby
│   ├── logo.svg             # Logo
│   └── swbeauty-procedury.csv  # Hlavní CSV ceník
├── src/                      # Source code
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── sluzby/         # Services pages
│   │   ├── kontakt/        # Contact page
│   │   ├── cenik/          # Price list page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/          # React komponenty
│   │   ├── animations/     # GSAP animation komponenty
│   │   ├── ui/            # shadcn/ui komponenty
│   │   └── *.tsx          # Feature komponenty
│   ├── data/               # Static data
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions & helpers
│   │   └── server/        # Server-only utilities
│   ├── styles/             # Global CSS
│   └── types/              # TypeScript type definitions
├── .env.local               # Environment variables (local)
├── .gitignore              # Git ignore rules
├── biome.json              # Biome config (linting/formatting)
├── components.json         # shadcn/ui config
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS config (pokud existuje)
└── tsconfig.json           # TypeScript configuration
```

---

## Root Level

Hlavní konfigurační soubory a složky v root directory.

### Konfigurační Soubory

| Soubor | Účel | Kdy Upravovat |
|--------|------|---------------|
| `package.json` | NPM dependencies, scripts | Při přidávání/odebírání balíčků |
| `tsconfig.json` | TypeScript compiler options | Při změně TS nastavení |
| `next.config.ts` | Next.js framework config | Při změně routing, headers, redirects |
| `biome.json` | Linting a formatting rules | Při změně code style |
| `components.json` | shadcn/ui config | Při přidávání shadcn komponent |
| `postcss.config.mjs` | PostCSS/Tailwind config | Při změně CSS processing |
| `.env.local` | Environment variables (local) | **Nikdy necommitujte!** |
| `.gitignore` | Git ignore patterns | Při přidávání souborů k ignorování |

### package.json

```json
{
  "name": "swbeauty-bun",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "biome lint ./src",
    "lint:fix": "biome lint --write ./src",
    "format": "biome format --write ./src",
    "check": "biome check --write ./src"
  }
}
```

**Key Scripts:**
- `dev` - Development server s Turbopack
- `build` - Production build s Turbopack
- `start` - Production server
- `lint` - Biome linting
- `format` - Code formatting

---

## Source Directory (/src)

Hlavní složka s veškerým source code.

```
src/
├── app/           # Next.js 15 App Router (pages & routing)
├── components/    # React komponenty
├── data/          # Static data a constants
├── hooks/         # Custom React hooks
├── lib/           # Utility funkce a helpers
├── styles/        # Global CSS soubory
├── types/         # TypeScript type definitions
└── middleware.ts  # Next.js middleware
```

### Organizační Princip

- **app/** - Pouze pages, layouts a route handlers
- **components/** - Všechny React komponenty
- **lib/** - Pure functions, utilities (žádné React komponenty)
- **data/** - Static data (FAQ, testimonials, atd.)
- **hooks/** - Custom React hooks
- **types/** - Shared TypeScript types

---

## App Directory (/src/app)

Next.js 15 App Router struktura s file-based routing.

```
app/
├── api/                      # API Routes
│   ├── booking/
│   │   └── route.ts         # POST /api/booking
│   ├── contact/
│   │   └── route.ts         # POST /api/contact
│   ├── newsletter/
│   │   └── route.ts         # POST /api/newsletter
│   ├── voucher/
│   │   └── route.ts         # POST /api/voucher
│   └── pricelist/
│       └── route.ts         # GET /api/pricelist
├── sluzby/                   # Services pages
│   ├── [kategorie]/         # Dynamic category route
│   │   ├── [slug]/          # Dynamic service detail
│   │   │   └── page.tsx
│   │   ├── _client.tsx      # Client-side logic
│   │   └── page.tsx         # Category page
│   ├── _client.tsx          # Services list client logic
│   └── page.tsx             # Services overview
├── kontakt/
│   └── page.tsx             # Contact page
├── cenik/
│   └── page.tsx             # Price list page
├── ochrana-osobnich-udaju/
│   └── page.tsx             # Privacy policy
├── obchodni-podminky/
│   └── page.tsx             # Terms & conditions
├── layout.tsx               # Root layout (HTML, head, body)
├── page.tsx                 # Homepage (/)
├── error.tsx                # Error boundary
├── robots.ts                # robots.txt generator
└── sitemap.ts               # sitemap.xml generator
```

### Routing Pattern

**Static Routes:**
```
/                 → app/page.tsx
/kontakt          → app/kontakt/page.tsx
/cenik            → app/cenik/page.tsx
/sluzby           → app/sluzby/page.tsx
```

**Dynamic Routes:**
```
/sluzby/kosmetika              → app/sluzby/[kategorie]/page.tsx
/sluzby/kosmetika/hydrafacial  → app/sluzby/[kategorie]/[slug]/page.tsx
```

### Server vs Client Components

**Server Components** (default):
- `layout.tsx` - Root layout
- `page.tsx` - Všechny pages (server-side)
- API routes

**Client Components** (`"use client"`):
- `_client.tsx` - Client-side logic separovaná do vlastních souborů
- Komponenty s interaktivitou (modals, forms)
- Komponenty používající hooks (useState, useEffect)

### API Routes Pattern

Všechny API routes následují strukturu:

```
app/api/<endpoint>/route.ts
```

Každý `route.ts` exportuje HTTP metody:

```typescript
// app/api/booking/route.ts
export async function POST(request: Request) {
  // Handle POST request
}
```

---

## Components (/src/components)

Všechny React komponenty organizované do logických skupin.

```
components/
├── animations/               # GSAP animation komponenty
│   ├── CharReveal.tsx       # Character-by-character reveal
│   ├── WordReveal.tsx       # Word-by-word reveal
│   ├── ScrollReveal.tsx     # Scroll-triggered animations
│   ├── ImageReveal.tsx      # Image reveal animations
│   ├── FadeIn.tsx           # Fade in animations
│   ├── HorizontalScroll.tsx # Horizontal scroll sections
│   ├── NumberCounter.tsx    # Animated number counter
│   ├── SmoothScrollProvider.tsx  # Lenis smooth scroll
│   ├── useGsapParallax.ts   # Parallax hook
│   └── useGsapReveal.ts     # Reveal hook
├── ui/                      # shadcn/ui base components
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   ├── popover.tsx
│   ├── calendar.tsx
│   ├── Container.tsx        # Layout container
│   └── Section.tsx          # Section wrapper
├── AboutUsSection.tsx       # O nás sekce
├── BookingForm.tsx          # Booking formulář
├── BookingModal.tsx         # Booking modal
├── CategoryHero.tsx         # Category hero section
├── CategoryMosaic.tsx       # Category image mosaic
├── ContactForm.tsx          # Contact formulář
├── ContactSection.tsx       # Contact section
├── FAQ.tsx                  # FAQ komponenta
├── FAQSection.tsx           # FAQ section
├── Footer.tsx               # Footer
├── GallerySection.tsx       # Gallery section
├── Hero.tsx                 # Homepage hero
├── HeroSection.tsx          # Hero section wrapper
├── HorizontalScrollSection.tsx  # Horizontal scroll
├── InstagramFeed.tsx        # Instagram feed
├── LoadingScreen.tsx        # Loading screen animation
├── ModalProvider.tsx        # Modal context provider
├── Navbar.tsx               # Navigation bar
├── NewsletterSection.tsx    # Newsletter section
├── OpenBookingButton.tsx    # Booking button
├── OpenVoucherButton.tsx    # Voucher button
├── PriceTable.tsx           # Price table
├── ServiceBookingButton.tsx # Service booking button
├── ServiceCard.tsx          # Service card
├── ServicesSection.tsx      # Services section
├── SubscribeForm.tsx        # Newsletter subscribe form
├── TestimonialsSection.tsx  # Testimonials section
├── VoucherForm.tsx          # Voucher formulář
├── VoucherModal.tsx         # Voucher modal
└── WhyUsSection.tsx         # Why Us section
```

### Component Naming Convention

| Pattern | Použití | Příklad |
|---------|---------|---------|
| `<Feature>Section.tsx` | Page sections | `AboutUsSection.tsx` |
| `<Feature>Modal.tsx` | Modals | `BookingModal.tsx` |
| `<Feature>Form.tsx` | Forms | `ContactForm.tsx` |
| `<Feature>Card.tsx` | Card components | `ServiceCard.tsx` |
| `<Feature>Button.tsx` | Button components | `OpenBookingButton.tsx` |
| `<Feature>Provider.tsx` | Context providers | `ModalProvider.tsx` |

### UI Components

Shadcn/ui komponenty v `components/ui/` jsou generované pomocí:

```bash
bunx shadcn add <component>
```

**Příklad:**
```bash
bunx shadcn add button    # Přidá ui/button.tsx
bunx shadcn add input     # Přidá ui/input.tsx
```

### Animation Components

Všechny GSAP animation komponenty jsou v `components/animations/`:

- **CharReveal** - Animace po znacích
- **WordReveal** - Animace po slovech
- **ScrollReveal** - Scroll-triggered reveals
- **ImageReveal** - Image reveals s clip-path
- **SmoothScrollProvider** - Lenis smooth scroll wrapper

---

## Lib Directory (/src/lib)

Utility funkce, helpers a server-side logic.

```
lib/
├── server/               # Server-only utilities
│   ├── csv.ts           # CSV file reading
│   └── images.ts        # Image processing
├── analytics.ts         # Analytics utilities
├── gsap.ts              # GSAP utilities
├── price.ts             # Price formatting
├── rateLimit.ts         # Rate limiting
├── sanitize.ts          # Input sanitization
├── services.ts          # Services data management
└── utils.ts             # General utilities (cn, etc.)
```

### Key Files

#### services.ts
```typescript
// src/lib/services.ts
export async function getAllServices(): Promise<Service[]>
export async function getServiceBySlug(slug: string): Promise<Service | null>
export async function getServicesByCategory(categoryId: string): Promise<Service[]>
export async function getServiceCategories(): Promise<ServiceCategory[]>
```

**Účel:** Centrální správa služeb, načítání z CSV, caching.

#### price.ts
```typescript
// src/lib/price.ts
export function formatPrice(price: number | string): string
```

**Účel:** Konzistentní formátování cen (1 000 Kč).

#### sanitize.ts
```typescript
// src/lib/sanitize.ts
export function sanitizeEmail(email: string): string
export function sanitizeHtml(input: string): string
export function sanitizePhone(phone: string): string
```

**Účel:** XSS ochrana, input sanitization.

#### rateLimit.ts
```typescript
// src/lib/rateLimit.ts
export function checkRateLimit(ip: string, limit: number, window: number)
export function getClientIp(request: Request): string
```

**Účel:** Rate limiting pro API endpointy.

---

## Public Directory

Static assets dostupné na root URL.

```
public/
├── images/                   # Obrázky pro služby
│   ├── service-kosmetika.jpg
│   ├── service-hifu.jpg
│   ├── gallery-1.jpg
│   └── ...
├── services/                 # CSV data
│   └── services.csv         # Hlavní CSV se službami
├── logo.svg                  # Logo
└── swbeauty-procedury.csv   # Legacy CSV ceník
```

### Přístup k Souborům

```typescript
// V komponentě
<Image src="/images/service-kosmetika.jpg" alt="Kosmetika" />

// CSV loading
const csvPath = `${process.cwd()}/public/services/services.csv`
```

### Image Naming Convention

- `service-<kategorie>.jpg` - Default obrázky pro kategorie
- `gallery-<number>.jpg` - Galerie obrázky
- Číslovací pattern: `01.jpg`, `02.jpg`, ...

---

## Naming Conventions

### Files

| Typ | Convention | Příklad |
|-----|-----------|---------|
| React komponenty | PascalCase | `BookingModal.tsx` |
| Utility funkce | camelCase | `formatPrice.ts` |
| API routes | kebab-case | `api/booking/route.ts` |
| Pages | kebab-case | `sluzby/[kategorie]/page.tsx` |
| Hooks | camelCase s `use` prefix | `useGSAP.ts` |
| Types | PascalCase | `Service`, `PriceItem` |
| Constants | SCREAMING_SNAKE_CASE | `DEFAULT_IMAGE` |

### Folders

| Typ | Convention | Příklad |
|-----|-----------|---------|
| Components | PascalCase (optional) | `animations/` |
| Pages | kebab-case | `sluzby/[kategorie]/` |
| API routes | kebab-case | `api/booking/` |
| Utilities | camelCase | `lib/server/` |

### TypeScript

```typescript
// Interfaces - PascalCase
interface Service {
  name: string
  price: string
}

// Types - PascalCase
type ServiceCategory = {
  id: string
  name: string
}

// Functions - camelCase
function formatPrice(price: number): string

// Constants - SCREAMING_SNAKE_CASE
const DEFAULT_IMAGE = '/images/default.jpg'

// Enums - PascalCase
enum ServiceType {
  Single = 'single',
  Package = 'package'
}
```

---

## File Organization Patterns

### Pattern 1: Feature Co-location

Příklad: Booking feature

```
components/
├── BookingModal.tsx      # Modal component
├── BookingForm.tsx       # Form logic
├── OpenBookingButton.tsx # Trigger button
└── ServiceBookingButton.tsx  # Service-specific button
```

### Pattern 2: Server/Client Separation

```
app/sluzby/
├── page.tsx        # Server component (data fetching)
└── _client.tsx     # Client component (interactivity)
```

**Proč?**
- `page.tsx` - Server-side rendering, SEO
- `_client.tsx` - Client-side interactivity, hooks

### Pattern 3: API Route Handlers

```
app/api/booking/
└── route.ts        # POST /api/booking handler
```

Každý `route.ts` může exportovat:
- `GET` - Read operations
- `POST` - Create operations
- `PUT/PATCH` - Update operations
- `DELETE` - Delete operations

### Pattern 4: Type Definitions

```
types/
└── index.ts        # Centrální export všech types
```

```typescript
// types/index.ts
export type Service = { ... }
export type PriceItem = { ... }
export type Testimonial = { ... }
```

Import:
```typescript
import type { Service, PriceItem } from '@/types'
```

---

## Path Aliases

Projekt používá TypeScript path aliases definované v `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Použití

```typescript
// ✅ Good - používat alias
import { getAllServices } from '@/lib/services'
import { Button } from '@/components/ui/button'
import type { Service } from '@/types'

// ❌ Bad - relativní cesty
import { getAllServices } from '../../lib/services'
import { Button } from '../../../components/ui/button'
```

---

## Best Practices

### 1. Component Organization

- **Jeden component = jeden soubor**
- **Related komponenty ve stejné složce**
- **Používat barrel exports pro skupiny**

### 2. Server vs Client

```typescript
// Server Component (default)
async function ServicesPage() {
  const services = await getAllServices()  // ✅ Server-side data fetching
  return <div>...</div>
}

// Client Component
'use client'
function BookingModal() {
  const [open, setOpen] = useState(false)  // ✅ Client-side state
  return <Modal>...</Modal>
}
```

### 3. Import Order

```typescript
// 1. External dependencies
import { useState } from 'react'
import { NextResponse } from 'next/server'

// 2. Internal aliases
import { getAllServices } from '@/lib/services'
import { Button } from '@/components/ui/button'

// 3. Types
import type { Service } from '@/types'

// 4. Styles (pokud existují)
import './styles.css'
```

### 4. File Naming

- **React komponenty**: `BookingModal.tsx` (PascalCase)
- **Utilities**: `formatPrice.ts` (camelCase)
- **Constants**: `constants.ts` (camelCase soubor, SCREAMING_SNAKE_CASE obsah)

---

## Summary

SW Beauty projekt používá:

- **Next.js 15 App Router** - File-based routing
- **Server Components** - Default pro pages
- **Client Components** - Pro interaktivitu (`_client.tsx` pattern)
- **Path Aliases** - `@/*` pro čisté importy
- **Feature Co-location** - Related files společně
- **Naming Conventions** - Konzistentní napříč projektem

---

**Další:** [API Routes →](../04-backend/api-routes.md)
