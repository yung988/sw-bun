# Routing Documentation

**SW Beauty Project - Next.js App Router Architecture**

Version: 1.0
Last Updated: November 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [Route Organization](#route-organization)
3. [Static Routes](#static-routes)
4. [Dynamic Routes](#dynamic-routes)
5. [API Routes](#api-routes)
6. [Metadata & SEO](#metadata--seo)
7. [Client-Side Navigation](#client-side-navigation)
8. [Page Transitions](#page-transitions)
9. [Error Handling](#error-handling)
10. [Best Practices](#best-practices)

---

## Introduction

SW Beauty používá **Next.js 14 App Router** s file-system based routing. Všechny routes jsou definovány strukturou složek v `src/app/`.

**Key Concepts:**
- **Server Components** (default) - renderují se na serveru
- **Client Components** (`'use client'`) - hydratují se na klientu
- **Static Generation** - pages jsou pre-renderované při buildu
- **Dynamic Routes** - parametrizované routes s `[param]`
- **API Routes** - server-side endpoints v `route.ts`

---

## Route Organization

### File Structure

```
src/app/
├── layout.tsx                          → Root layout (obaluje všechny stránky)
├── page.tsx                            → Homepage (/)
├── globals.css                         → Global styles
│
├── sluzby/                             → Services section
│   ├── page.tsx                        → /sluzby (all services)
│   ├── _client.tsx                     → Client-side components
│   └── [kategorie]/                    → Dynamic category routes
│       ├── page.tsx                    → /sluzby/[kategorie]
│       ├── _client.tsx                 → Category client components
│       └── [slug]/                     → Dynamic service detail
│           └── page.tsx                → /sluzby/[kategorie]/[slug]
│
├── cenik/                              → Price list
│   └── page.tsx                        → /cenik
│
├── kontakt/                            → Contact page
│   └── page.tsx                        → /kontakt
│
├── obchodni-podminky/                  → Terms & Conditions
│   └── page.tsx                        → /obchodni-podminky
│
├── ochrana-osobnich-udaju/             → Privacy Policy
│   └── page.tsx                        → /ochrana-osobnich-udaju
│
└── api/                                → API routes
    ├── booking/
    │   └── route.ts                    → POST /api/booking
    ├── voucher/
    │   └── route.ts                    → POST /api/voucher
    ├── contact/
    │   └── route.ts                    → POST /api/contact
    ├── newsletter/
    │   └── route.ts                    → POST /api/newsletter
    └── pricelist/
        └── route.ts                    → GET /api/pricelist
```

---

## Static Routes

### Homepage

**Route:** `/`
**File:** `src/app/page.tsx`
**Type:** Static (SSG)

```tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  )
}
```

**Metadata:**
```tsx
// In layout.tsx
export const metadata: Metadata = {
  title: 'SW Beauty | Profesionální kosmetické služby v Hodoníně',
  description: 'Objevte profesionální kosmetické služby v Hodoníně. HIFU, Endosphere, kosmetika a mnoho dalších ošetření s okamžitými výsledky.',
  // ...
}
```

---

### Price List

**Route:** `/cenik`
**File:** `src/app/cenik/page.tsx`
**Type:** Static (SSG)

```tsx
export const metadata: Metadata = {
  title: 'Ceník služeb | SW Beauty',
  description: 'Kompletní ceník všech kosmetických služeb SW Beauty. Transparentní ceny bez skrytých poplatků.',
}

export default async function PriceListPage() {
  const services = await getAllServices()
  const categories = await getServiceCategories()

  return (
    <main>
      <PriceTable services={services} categories={categories} />
    </main>
  )
}
```

---

### Contact

**Route:** `/kontakt`
**File:** `src/app/kontakt/page.tsx`
**Type:** Static (SSG)

```tsx
export const metadata: Metadata = {
  title: 'Kontakt | SW Beauty',
  description: 'Kontaktujte nás pro rezervaci termínu nebo dotazy. Najdete nás v Hodoníně.',
}

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
      <ContactInfo />
      <Map />
    </main>
  )
}
```

---

### Legal Pages

**Routes:**
- `/obchodni-podminky` - Terms & Conditions
- `/ochrana-osobnich-udaju` - Privacy Policy (GDPR)

**Type:** Static (SSG)

```tsx
// obchodni-podminky/page.tsx
export const metadata: Metadata = {
  title: 'Obchodní podmínky | SW Beauty',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <main className="prose max-w-4xl mx-auto py-24">
      <h1>Obchodní podmínky</h1>
      {/* Content */}
    </main>
  )
}
```

---

## Dynamic Routes

### Services Overview

**Route:** `/sluzby`
**File:** `src/app/sluzby/page.tsx`
**Type:** Static (SSG)

```tsx
export const metadata: Metadata = {
  title: 'Služby | SW Beauty Hodonín',
  description: 'Kompletní přehled profesionálních kosmetických služeb...',
  alternates: { canonical: 'https://swbeauty.cz/sluzby' },
}

export default async function ServicesPage() {
  const [categories, allServices] = await Promise.all([
    getCategories(),
    getAllServices()
  ])

  return (
    <ServicesClient>
      <main>
        <SectionTitle />
        <ServiceSearch services={allServices} />
        <CategoryGrid categories={categories} />
      </main>
    </ServicesClient>
  )
}
```

---

### Category Page (Dynamic)

**Route:** `/sluzby/[kategorie]`
**File:** `src/app/sluzby/[kategorie]/page.tsx`
**Type:** Static (SSG with dynamic params)

**generateStaticParams:**
```tsx
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((kategorie) => ({ kategorie }))
}

// Generates routes:
// /sluzby/kosmetika
// /sluzby/hifu-tvar
// /sluzby/endosphere
// etc.
```

**Dynamic Metadata:**
```tsx
export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { kategorie } = await params
  const categoryName = await getCategoryName(kategorie)

  return {
    title: `${categoryName} | SW Beauty Hodonín`,
    description: `Objevte naše ${categoryName.toLowerCase()} – profesionální ošetření s viditelnými výsledky v Hodoníně.`,
  }
}
```

**Component:**
```tsx
type Props = { params: Promise<{ kategorie: string }> }

export default async function CategoryPage({ params }: Props) {
  const { kategorie } = await params
  const services = await getServicesByCategory(kategorie)

  if (services.length === 0) notFound()

  const subcategories = await getSubcategoriesByCategory(kategorie)

  return (
    <CategoryClient>
      <main>
        <Breadcrumb />
        <CategoryHeader />
        <SubcategoryGrid subcategories={subcategories} />
      </main>
    </CategoryClient>
  )
}
```

---

### Service Detail (Dynamic)

**Route:** `/sluzby/[kategorie]/[slug]`
**File:** `src/app/sluzby/[kategorie]/[slug]/page.tsx`
**Type:** Static (SSG with dynamic params)

**generateStaticParams:**
```tsx
export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({
    kategorie: service.categoryId,
    slug: service.slug,
  }))
}

// Generates routes like:
// /sluzby/hifu-tvar/hifu-tvar-lifting-obliceje-a-krku
// /sluzby/kosmetika/kosmetika-hydrafacial
// etc.
```

**Dynamic Metadata:**
```tsx
export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return { title: 'Služba nenalezena' }
  }

  return {
    title: `${service.name} | SW Beauty`,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.shortDescription,
      images: [{ url: service.image }],
    },
  }
}
```

**Component:**
```tsx
type Props = {
  params: Promise<{ kategorie: string; slug: string }>
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  return (
    <main>
      <ServiceViewTracker {...service} />
      <ServiceDetail service={service} />
      <BookingCard service={service} />
    </main>
  )
}
```

---

## API Routes

### POST /api/booking

**File:** `src/app/api/booking/route.ts`

```tsx
export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, 5, 60 * 60 * 1000)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Validation & sanitization
    const body = await request.json()
    // ...

    // Send emails
    await resend.emails.send({ /* owner email */ })
    await resend.emails.send({ /* customer email */ })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
```

### Other API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/voucher` | POST | Voucher purchase requests |
| `/api/contact` | POST | Contact form submissions |
| `/api/newsletter` | POST | Newsletter subscriptions |
| `/api/pricelist` | GET | Dynamic price list data (CSV) |

**See Also:** [API Routes Documentation](../04-backend/api-routes.md)

---

## Metadata & SEO

### Static Metadata

**Root Layout (`app/layout.tsx`):**
```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://swbeauty.cz'),
  title: 'SW Beauty | Profesionální kosmetické služby v Hodoníně',
  description: 'Objevte profesionální kosmetické služby v Hodoníně...',
  keywords: ['kosmetika', 'HIFU', 'Endosphere', 'Hodonín'],
  authors: [{ name: 'SW Beauty' }],
  openGraph: {
    title: 'SW Beauty | Profesionální kosmetické služby',
    description: 'Profesionální kosmetické služby v Hodoníně s okamžitými výsledky',
    url: 'https://swbeauty.cz',
    siteName: 'SW Beauty',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SW Beauty salon',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty | Profesionální kosmetické služby',
    description: 'Profesionální kosmetické služby v Hodoníně',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### Dynamic Metadata

**Function-based metadata:**
```tsx
export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  // Fetch data
  const data = await fetchData(params)

  // Generate metadata
  return {
    title: `${data.title} | SW Beauty`,
    description: data.description,
    // ...
  }
}
```

### JSON-LD Structured Data

**Root Layout:**
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'SW Beauty',
  description: 'Profesionální kosmetické služby v Hodoníně',
  url: 'https://swbeauty.cz',
  telephone: '+420773577899',
  email: 'info@swbeauty.cz',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'U Cihelny 1326/2',
    addressLocality: 'Hodonín',
    postalCode: '695 01',
    addressCountry: 'CZ',
  },
  openingHoursSpecification: [/* ... */],
  priceRange: '500Kč - 5000Kč',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '500',
  },
}

return (
  <html>
    <head>
      <script
        type="application/ld+json"
        suppressHydrationWarning
      >
        {JSON.stringify(jsonLd)}
      </script>
    </head>
    {/* ... */}
  </html>
)
```

---

## Client-Side Navigation

### Next.js Link Component

```tsx
import Link from 'next/link'

// Basic link
<Link href="/sluzby">Služby</Link>

// With prefetching (default)
<Link href="/sluzby/hifu-tvar" prefetch={true}>
  HIFU
</Link>

// Without prefetching (for less important links)
<Link href="/kontakt" prefetch={false}>
  Kontakt
</Link>

// External link (opens in new tab)
<Link
  href="https://facebook.com/swbeauty"
  target="_blank"
  rel="noopener noreferrer"
>
  Facebook
</Link>
```

### usePathname Hook

**Active Link Detection:**
```tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLink({ href, children }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={isActive ? 'text-slate-900 font-medium' : 'text-slate-600'}
    >
      {children}
    </Link>
  )
}
```

**Usage in Navbar:**
```tsx
<nav>
  <NavLink href="/">Domů</NavLink>
  <NavLink href="/sluzby">Služby</NavLink>
  <NavLink href="/cenik">Ceník</NavLink>
  <NavLink href="/kontakt">Kontakt</NavLink>
</nav>
```

### Programmatic Navigation

```tsx
'use client'

import { useRouter } from 'next/navigation'

export function MyComponent() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/sluzby/hifu-tvar')
    // or
    router.replace('/sluzby/hifu-tvar') // no history entry
  }

  return <button onClick={handleClick}>Navigate</button>
}
```

---

## Page Transitions

### Lenis Smooth Scroll

**Global smooth scrolling:**
```tsx
// app/layout.tsx
import LenisScroll from '@/components/LenisScroll'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LenisScroll />
        {children}
      </body>
    </html>
  )
}
```

### Scroll Restoration

**Automatic scroll to top on navigation:**
```tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
```

### Page Transitions (Optional)

**GSAP Page Transitions:**
```tsx
'use client'

import { gsap } from '@/lib/gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
```

---

## Error Handling

### Not Found (404)

**Custom 404 Page:**
```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light">404</h1>
        <p className="text-xl text-slate-600 mt-4">
          Stránka nenalezena
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-slate-900 text-white rounded-full"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
    </main>
  )
}
```

**Trigger 404 in page:**
```tsx
import { notFound } from 'next/navigation'

export default async function ServicePage({ params }: Props) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound() // Throws 404
  }

  return <ServiceDetail service={service} />
}
```

### Error Boundaries

**Custom Error Page:**
```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light">Něco se pokazilo</h1>
        <p className="text-xl text-slate-600 mt-4">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="mt-8 px-6 py-3 bg-slate-900 text-white rounded-full"
        >
          Zkusit znovu
        </button>
      </div>
    </main>
  )
}
```

---

## Best Practices

### 1. Use Proper Route Organization

```
✅ Good
app/
  sluzby/
    page.tsx
    [kategorie]/
      page.tsx

❌ Bad
app/
  sluzby.tsx
  sluzby-kategorie.tsx
```

---

### 2. Leverage Static Generation

```tsx
// ✅ Good - static generation
export async function generateStaticParams() {
  return await getCategories()
}

// ❌ Bad - runtime generation
export const dynamic = 'force-dynamic'
```

---

### 3. Optimize Metadata

```tsx
// ✅ Good - specific metadata
export const metadata = {
  title: 'HIFU Lifting | SW Beauty',
  description: 'Neinvazivní HIFU lifting pro zpevnění pokožky...',
}

// ❌ Bad - generic metadata
export const metadata = {
  title: 'SW Beauty',
  description: 'Kosmetika',
}
```

---

### 4. Use Loading States

```tsx
// app/sluzby/loading.tsx
export default function Loading() {
  return <div>Načítání...</div>
}
```

---

### 5. Implement Proper Error Handling

```tsx
// Always handle notFound
if (!service) {
  notFound()
}

// Validate params
const { kategorie } = await params
if (!kategorie || typeof kategorie !== 'string') {
  notFound()
}
```

---

### 6. Prefetch Strategically

```tsx
// Prefetch important links
<Link href="/sluzby" prefetch={true}>Služby</Link>

// Don't prefetch everything
<Link href="/obchodni-podminky" prefetch={false}>T&C</Link>
```

---

### 7. Use Proper Link Types

```tsx
// Internal navigation (SPA routing)
<Link href="/sluzby">Služby</Link>

// External link (new tab)
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  Facebook
</a>

// Anchor link (same page)
<a href="#kontakt">Kontakt</a>
```

---

## Route Summary

| Route | Type | Generation | Params | Purpose |
|-------|------|------------|--------|---------|
| `/` | Static | Build | - | Homepage |
| `/sluzby` | Static | Build | - | Services overview |
| `/sluzby/[kategorie]` | Static | Build | kategorie | Category page |
| `/sluzby/[kategorie]/[slug]` | Static | Build | kategorie, slug | Service detail |
| `/cenik` | Static | Build | - | Price list |
| `/kontakt` | Static | Build | - | Contact |
| `/obchodni-podminky` | Static | Build | - | Terms |
| `/ochrana-osobnich-udaju` | Static | Build | - | Privacy |
| `/api/*` | Dynamic | Runtime | - | API endpoints |

---

**Related Documentation:**
- [Components Overview](./components-overview.md)
- [Services Catalog](../07-features/services-catalog.md)
- [SEO Strategy](../06-seo/metadata-strategy.md)
- [API Routes](../04-backend/api-routes.md)

---

**Last Updated:** November 2025
**Maintainer:** SW Beauty Development Team
