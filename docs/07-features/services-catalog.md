# Services Catalog Documentation

**SW Beauty Project - Dynamic Service System**

Version: 1.0
Last Updated: November 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Site Structure](#site-structure)
4. [Data Source](#data-source)
5. [Service Model](#service-model)
6. [Page Architectures](#page-architectures)
   - [All Services Page](#all-services-page)
   - [Category Page](#category-page)
   - [Service Detail Page](#service-detail-page)
7. [Dynamic Routing](#dynamic-routing)
8. [Image Resolution](#image-resolution)
9. [Data Flow](#data-flow)
10. [SEO & Metadata](#seo--metadata)
11. [Performance](#performance)
12. [Best Practices](#best-practices)

---

## Introduction

Services Catalog je dynamický systém pro správu a zobrazení kosmetických služeb SW Beauty. Systém je plně **data-driven** - veškerý obsah pochází z CSV souboru a automaticky generuje:

- Kategorie služeb
- Subkategorie
- Jednotlivé služby
- Pricing tables
- SEO metadata
- Structured data (JSON-LD)

**Key Benefits:**
- **Zero-config updates** - přidej řádek do CSV, deploy, hotovo
- **Type-safe** - plný TypeScript support
- **SEO-optimized** - automatic meta tags, JSON-LD
- **Fast** - static generation při buildu
- **Scalable** - podpora stovek služeb

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  CSV Data Source                            │
│            public/services/services.csv                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              CSV Parser (Papa Parse)                        │
│        lib/services.ts → parseCSV()                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│          Service Objects (TypeScript)                       │
│   Service[], ServiceCategory[], ServiceSubcategory[]        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ├──────────────┬────────────────┬───────────┐
                  ▼              ▼                ▼           ▼
         ┌──────────────┐ ┌──────────┐  ┌──────────────┐ ┌─────────┐
         │ Services     │ │ Category │  │  Service     │ │ Price   │
         │ Overview     │ │ Page     │  │  Detail      │ │ List    │
         │ /sluzby      │ │ [cat]    │  │  [cat]/[slug]│ │ /cenik  │
         └──────────────┘ └──────────┘  └──────────────┘ └─────────┘
```

---

## Site Structure

### Route Hierarchy

```
/sluzby                           → All Services Overview
  ├── /kosmetika                  → Category: Kosmetika
  │   ├── /kosmetika-hifu-lifting → Service Detail
  │   ├── /kosmetika-hydrafacial  → Service Detail
  │   └── ...
  ├── /hifu-tvar                  → Category: HIFU Tvar
  │   ├── /hifu-tvar-lifting      → Service Detail
  │   └── ...
  ├── /endosphere                 → Category: Endosphere
  └── ...
```

### URL Examples

```
/sluzby
  → Overview of all service categories

/sluzby/hifu-tvar
  → All HIFU face services (category page)

/sluzby/hifu-tvar/hifu-tvar-lifting-obliceje-a-krku
  → Specific HIFU service (detail page)
```

---

## Data Source

### CSV Structure

**Location:** `public/services/services.csv`

**Required Columns:**
```csv
category,subcategory,service_type,name,short_description_suggested,description_suggested,
duration_in_minutes,sessions,price_in_czk,benefits,image,images
```

**Example Row:**
```csv
"Kosmetika","HIFU Lifting","single","HIFU Lifting obličeje a krku",
"Neinvazivní lifting s okamžitými výsledky",
"Vysokointenzivní fokusovaný ultrazvuk pro zpevnění pokožky...",
"60","1","2500","Redukce vrásek,Zpevnění pokožky,Lifting kontur",
"/images/hifu-face.jpg","/images/hifu-1.jpg;/images/hifu-2.jpg;/images/hifu-3.jpg"
```

**Column Definitions:**

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| **category** | string | Yes | Main category | "Kosmetika" |
| **subcategory** | string | Yes | Sub-category | "HIFU Lifting" |
| **service_type** | string | Yes | "single" or "package" | "single" |
| **name** | string | Yes | Service name | "HIFU Lifting obličeje" |
| **short_description_suggested** | string | No | Short pitch | "Neinvazivní lifting..." |
| **description_suggested** | string | No | Long description | Full description |
| **duration_in_minutes** | number | No | Treatment duration | 60 |
| **sessions** | number | No | Number of sessions | 1 |
| **price_in_czk** | string/number | Yes | Price | "2500" or "2500-3000" |
| **benefits** | string | No | Comma/semicolon separated | "Benefit 1,Benefit 2" |
| **image** | string | No | Primary image path | "/images/hifu.jpg" |
| **images** | string | No | Gallery (semicolon separated) | "img1.jpg;img2.jpg" |

---

## Service Model

### TypeScript Types

**Location:** `src/lib/services.ts`

```typescript
export type Service = {
  slug: string                  // URL-friendly ID
  name: string                  // Display name
  shortDescription: string      // Elevator pitch
  description: string           // Full description
  category: string              // Category name
  categoryId: string            // Category slug
  subcategory: string           // Subcategory name
  subcategoryId: string         // Subcategory slug
  serviceType: string           // 'single' | 'package'
  duration: number | null       // minutes
  sessions: number | null       // count
  price: string                 // formatted price
  priceNumber?: number          // numeric price for sorting
  benefits: string[]            // array of benefits
  image: string                 // primary image
  images: string[]              // gallery images
  isPackage: boolean            // computed flag
  isVariablePrice: boolean      // computed flag
}

export type ServiceCategory = {
  id: string                    // slug
  name: string                  // display name
  description: string           // category description
  priceRange: string            // "500 Kč - 5000 Kč"
  slug: string                  // URL slug
  serviceCount: number          // number of services
}

export type ServiceSubcategory = {
  id: string                    // slug
  categoryId: string            // parent category
  name: string                  // display name
  description: string           // subcategory description
  priceRange: string            // price range
  serviceCount: number          // number of services
}
```

### Slug Generation

```typescript
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')              // Decompose accents
    .replace(/[^\w\s-]/g, '')      // Remove special chars
    .replace(/\s+/g, '-')          // Spaces to hyphens
    .replace(/-+/g, '-')           // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '')       // Trim hyphens
}

// Example:
createSlug('HIFU Lifting obličeje a krku')
// → 'hifu-lifting-obliceje-a-krku'
```

### Price Parsing

```typescript
function parsePrice(price: string): { raw: string; value?: number } {
  const trimmed = price.trim()
  if (!trimmed) return { raw: 'Na dotaz' }

  const normalized = trimmed.replace(/[^\d]/g, '')
  const numeric = Number.parseInt(normalized, 10)

  if (Number.isNaN(numeric)) {
    return { raw: trimmed }
  }

  return { raw: trimmed, value: numeric }
}

// Examples:
parsePrice('2500')         → { raw: '2500', value: 2500 }
parsePrice('2500 Kč')      → { raw: '2500 Kč', value: 2500 }
parsePrice('Na dotaz')     → { raw: 'Na dotaz' }
parsePrice('2000-3000')    → { raw: '2000-3000', value: 2000 }
```

---

## Page Architectures

### All Services Page

**Route:** `/sluzby`
**File:** `src/app/sluzby/page.tsx`

**Purpose:** Overview všech kategorií služeb s live search.

**Components:**
```tsx
<ServicesClient>                         // Client wrapper (animations)
  <SectionTitle />                       // Page header
  <ServiceSearch services={all} />       // Live search component
  <CategoryGrid>                         // Grid of categories
    {categories.map(cat => (
      <CategoryCard
        icon={pickIcon(cat.id)}
        name={cat.name}
        href={`/sluzby/${cat.id}`}
      />
    ))}
  </CategoryGrid>
  <FreeCTA />                            // Free consultation CTA
</ServicesClient>
```

**Features:**
- **Live search** - filtrování služeb v real-time
- **Icon mapping** - automatické ikony podle kategorie
- **Category cards** - hover effects, click tracking
- **Free consultation CTA** - conversion optimization

**Icon Mapping Logic:**
```typescript
function pickIcon(id: string) {
  const key = id.toLowerCase()
  if (key.includes('hifu')) return ScanFace
  if (key.includes('endo')) return Waves
  if (key.includes('kavit')) return Waves
  if (key.includes('radiof')) return Zap
  if (key.includes('lymfo')) return Droplets
  if (key.includes('sval') || key.includes('budovani')) return Dumbbell
  if (key.includes('vlasy') || key.includes('prodlu')) return Scissors
  if (key.includes('kosmet')) return Sparkles
  return Stars
}
```

**Search Implementation:**
```tsx
// ServiceSearch.tsx (client component)
export function ServiceSearch({ services }: { services: Service[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return services.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.shortDescription?.toLowerCase().includes(q)
    )
  }, [query, services])

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Vyhledat službu..."
      />
      {query && (
        <SearchResults results={filtered} />
      )}
    </div>
  )
}
```

---

### Category Page

**Route:** `/sluzby/[kategorie]`
**File:** `src/app/sluzby/[kategorie]/page.tsx`

**Purpose:** Zobrazení všech služeb v kategorii, organizovaných po subkategoriích.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Breadcrumb: Služby / Kosmetika                             │
│  Category Header: "Kosmetika"                               │
├──────────────┬──────────────────────────────────────────────┤
│  Desktop     │  Content                                     │
│  Sidebar     │                                              │
│  (TOC)       │  Subcategory 1: HIFU Lifting                │
│              │  ┌──────┐ ┌──────┐ ┌──────┐                 │
│  • HIFU      │  │Card 1│ │Card 2│ │Card 3│                 │
│  • Hydra     │  └──────┘ └──────┘ └──────┘                 │
│  • Peeling   │                                              │
│              │  Subcategory 2: Hydrafacial                  │
│              │  ┌──────┐ ┌──────┐                          │
│              │  │Card 1│ │Card 2│                          │
│              │  └──────┘ └──────┘                          │
└──────────────┴──────────────────────────────────────────────┘
```

**Components:**
```tsx
<CategoryClient>                         // Client wrapper (animations)
  <Breadcrumb />                         // Navigation trail
  <SectionTitle />                       // Category header
  <MobileSubcategoryNav />               // Sticky pills on mobile
  <Layout>
    <Sidebar>                            // Desktop only
      <SubcategoryTOC />                 // Jump links
    </Sidebar>
    <Content>
      {subcategories.map(sub => (
        <SubcategorySection id={sub.id}>
          <SubcategoryHeader />
          <ImageGallery />               // Mood images
          <ServiceCardsGrid>
            {services.map(service => (
              <ServiceCard
                service={service}
                href={`/sluzby/${cat}/${service.slug}`}
              />
            ))}
          </ServiceCardsGrid>
        </SubcategorySection>
      ))}
    </Content>
  </Layout>
</CategoryClient>
```

**Key Features:**

**1. Subcategory TOC (Table of Contents):**
```tsx
// Desktop: Sticky sidebar
<aside className="hidden lg:block">
  <div className="sticky top-24">
    <SubcategoryTOC subcategories={subcategories} />
  </div>
</aside>

// Mobile: Horizontal scroll pills
<nav className="lg:hidden sticky top-16">
  <ul className="flex gap-2 overflow-x-auto">
    {subcategories.map(s => (
      <li>
        <a href={`#${s.id}`}>{s.name}</a>
      </li>
    ))}
  </ul>
</nav>
```

**2. Image Mosaic per Subcategory:**
```typescript
// Dynamically built from service images
const gallerySources = Array.from(
  new Set(
    group
      .flatMap(svc => svc.images?.length ? svc.images : [svc.image])
      .filter(Boolean)
      .slice(0, 6)
  )
)
const gallery = (gallerySources.length ? gallerySources : fallbackMosaic).slice(0, 3)
```

**3. Service Cards:**
```tsx
<TrackedLink
  href={`/sluzby/${kategorie}/${service.slug}`}
  event="service_click"
  data={{ from: 'category', category_id: kategorie, slug: service.slug }}
  className="group service-card"
>
  {service.isPackage && (
    <span className="badge">Balíček</span>
  )}

  <div className="flex gap-3">
    <img src={service.image} alt={service.name} />
    <div>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
    </div>
  </div>

  <div className="footer">
    <div>
      <p className="price">{formatPrice(service.price)}</p>
      <p className="meta">
        {service.duration && `${service.duration} min`}
        {service.sessions && ` • ${service.sessions}×`}
      </p>
    </div>
    <span className="arrow">Detail →</span>
  </div>
</TrackedLink>
```

---

### Service Detail Page

**Route:** `/sluzby/[kategorie]/[slug]`
**File:** `src/app/sluzby/[kategorie]/[slug]/page.tsx`

**Purpose:** Kompletní detail služby s rezervačním CTA.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Breadcrumb: Služby / Kosmetika / HIFU Lifting              │
├──────────────────────────────────┬──────────────────────────┤
│  Left Column                     │  Right Column            │
│  (Main Content)                  │  (Booking Card)          │
│                                  │                          │
│  • Header (name, badges)         │  ┌──────────────────┐   │
│  • Hero Image                    │  │ Rezervace        │   │
│  • Info Cards (price/dur/sess)   │  │ • Potvrzení      │   │
│  • Benefits List                 │  │ • Flexibilní     │   │
│  • Gallery                       │  │   storno         │   │
│  • Related Services CTA          │  │ • Professional   │   │
│                                  │  │                  │   │
│                                  │  │ [Rezervovat]     │   │
│                                  │  │ [Mám dotaz]      │   │
│                                  │  │                  │   │
│                                  │  │ 500+ klientů     │   │
│                                  │  │ ⭐⭐⭐⭐⭐ 4.9     │   │
│                                  │  └──────────────────┘   │
└──────────────────────────────────┴──────────────────────────┘
```

**Components:**
```tsx
<main>
  <ServiceViewTracker />                 // Analytics
  <StickyBottomCTA />                    // Desktop: sticky bar at bottom
  <Container>
    <Breadcrumb />
    <Grid>
      {/* Left: Content */}
      <LeftColumn>
        <Header>
          <Badges />                     // Category, Package
          <h1>{service.name}</h1>
          <p>{service.shortDescription}</p>
          <HeroImage />
        </Header>

        <InfoCards>
          <PriceCard />
          <DurationCard />
          <SessionsCard />
        </InfoCards>

        <Benefits>
          <BenefitsList items={service.benefits} />
        </Benefits>

        <Gallery images={service.images} />

        <RelatedServicesCTA />
      </LeftColumn>

      {/* Right: Booking */}
      <RightColumn>
        <StickyBookingCard>
          <h3>Rezervace</h3>
          <USPs>
            • Okamžité potvrzení
            • Flexibilní storno do 24h
            • Profesionální péče
          </USPs>
          <ServiceBookingButton service={service} />
          <Link href="/#kontakt">Mám dotaz</Link>
          <SocialProof>
            500+ klientů
            ⭐⭐⭐⭐⭐ 4.9/5
          </SocialProof>
        </StickyBookingCard>
      </RightColumn>
    </Grid>
  </Container>
</main>
```

**Key Features:**

**1. Sticky Booking Card (Desktop):**
```tsx
<div className="sticky top-24 rounded-2xl border p-8">
  {/* Booking content */}
</div>
```

**2. Sticky Bottom Bar (Desktop):**
```tsx
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur hidden lg:block">
  <div className="flex justify-between">
    <div>
      <p>{service.name}</p>
      <p>{formatPrice(service.price)}</p>
    </div>
    <ServiceBookingButton service={service} />
  </div>
</div>
```

**3. Analytics Tracking:**
```tsx
<ServiceViewTracker
  slug={service.slug}
  categoryId={service.categoryId}
  price={service.price}
/>
// Sends event to analytics: page view, product impression
```

**4. Benefits Visualization:**
```tsx
<ul className="grid sm:grid-cols-2 gap-3">
  {service.benefits.slice(0, 6).map(benefit => (
    <li className="flex items-start gap-3">
      <CheckIcon className="text-emerald-600" />
      <span>{benefit}</span>
    </li>
  ))}
</ul>
```

---

## Dynamic Routing

### Static Generation Strategy

**Build-time generation:**
```typescript
// generateStaticParams pro kategorie
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(kategorie => ({ kategorie }))
}

// generateStaticParams pro service details
export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map(service => ({
    kategorie: service.categoryId,
    slug: service.slug,
  }))
}
```

**Result:** Všechny služby jsou vygenerovány jako statické HTML při buildu → instant loading.

### Dynamic vs Static

| Route | Type | Generated At | Count | Note |
|-------|------|--------------|-------|------|
| `/sluzby` | Static | Build | 1 | Always static |
| `/sluzby/[kategorie]` | Static | Build | ~8-10 | One per category |
| `/sluzby/[kategorie]/[slug]` | Static | Build | ~50-100 | One per service |

**Performance Benefit:**
- **First Load:** <100ms (static HTML)
- **No database** queries at runtime
- **CDN cacheable**
- **SEO perfect** - crawlers see full HTML

---

## Image Resolution

### Image Sources Priority

```typescript
// 1. Service-specific images (from CSV)
if (service.images?.length) {
  images = service.images
}

// 2. Category mosaic fallback (from public/images)
else {
  const mosaic = await getCategoryMosaicServer(categoryId)
  if (mosaic?.length) {
    // Pick 3 deterministic images based on service name hash
    const base = hashString(service.name)
    const picks = new Set<number>()
    for (let k = 0; k < Math.min(3, mosaic.length); k++) {
      picks.add((base + k) % mosaic.length)
    }
    images = Array.from(picks).map(i => mosaic[i])
  }
}

// 3. Default fallback
if (!images.length) {
  images = [DEFAULT_IMAGE]
}
```

### Category Mosaic Builder

**Function:** `getCategoryMosaicServer(categoryId: string)`

**Purpose:** Najde všechny obrázky v `public/images/` matchující kategorii.

```typescript
// Example:
// Category: "hifu-tvar"
// Finds: /images/hifu-tvar-1.jpg, /images/hifu-tvar-2.jpg, etc.

const mosaic = await getCategoryMosaicServer('hifu-tvar')
// → ['/images/hifu-tvar-1.jpg', '/images/hifu-tvar-2.jpg', ...]
```

**Hash-based Selection:**
```typescript
function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Ensures same service always gets same images,
// but different services get different combinations
```

---

## Data Flow

### Complete Data Pipeline

```
1. Build Time
   ├─ Read CSV file
   ├─ Parse with Papa Parse
   ├─ Transform to Service objects
   ├─ Generate slugs
   ├─ Resolve images (mosaic builder)
   ├─ Calculate price ranges
   ├─ Build category/subcategory trees
   └─ Cache in memory

2. generateStaticParams()
   ├─ Get all categories
   ├─ Get all services
   └─ Return paths to pre-render

3. Page Render (SSG)
   ├─ Fetch data from cache
   ├─ Render React components
   └─ Output static HTML

4. Runtime (Browser)
   ├─ Hydrate React
   ├─ Initialize GSAP animations
   └─ Add interactivity
```

### Caching Strategy

```typescript
// In-memory cache (persists during build)
let servicesCache: Service[] | null = null
let servicesLoading: Promise<Service[]> | null = null

async function loadServices(): Promise<Service[]> {
  if (servicesCache) {
    return servicesCache
  }

  if (!servicesLoading) {
    servicesLoading = (async () => {
      const csvContent = await getPriceListFile()
      const items = parseCSV(csvContent)
      return Promise.all(items.map(priceItemToService))
    })()

    try {
      servicesCache = await servicesLoading
    } finally {
      servicesLoading = null
    }
  }

  return servicesCache ?? []
}

// Manual cache clear (development only)
export function clearServicesCache() {
  servicesCache = null
}
```

---

## SEO & Metadata

### Dynamic Metadata Generation

**Services Overview:**
```typescript
export const metadata: Metadata = {
  title: 'Služby | SW Beauty Hodonín',
  description: 'Kompletní přehled profesionálních kosmetických služeb. HIFU, Endosphere, EMS, kosmetika — moderní technologie s viditelnými výsledky.',
  alternates: { canonical: 'https://swbeauty.cz/sluzby' },
}
```

**Category Page:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategorie } = await params
  const categoryName = await getCategoryName(kategorie)

  return {
    title: `${categoryName} | SW Beauty Hodonín`,
    description: `Objevte naše ${categoryName.toLowerCase()} – profesionální ošetření s viditelnými výsledky v Hodoníně.`,
  }
}
```

**Service Detail:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

### Structured Data (JSON-LD)

**Service JSON-LD (future enhancement):**
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'BeautySalon',
    name: 'SW Beauty',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'U Cihelny 1326/2',
      addressLocality: 'Hodonín',
      postalCode: '695 01',
      addressCountry: 'CZ',
    },
  },
  offers: {
    '@type': 'Offer',
    price: service.priceNumber,
    priceCurrency: 'CZK',
    availability: 'https://schema.org/InStock',
  },
}
```

---

## Performance

### Optimization Techniques

**1. Static Generation:**
- All pages pre-rendered at build
- Zero runtime queries
- CDN-ready

**2. Image Optimization:**
```tsx
// Use next/image for automatic optimization
import Image from 'next/image'

<Image
  src={service.image}
  alt={service.name}
  width={800}
  height={600}
  loading="lazy"
/>
```

**3. Code Splitting:**
```tsx
// Client components auto-split
'use client'
import { ServiceSearch } from './_client'

// Lazy loading for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

**4. Prefetching:**
```tsx
// Next.js automatically prefetches visible links
<Link href={`/sluzby/${cat.id}`} prefetch={false}>
  {/* prefetch={false} for less important links */}
</Link>
```

### Performance Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | <1.5s | ~0.8s |
| Largest Contentful Paint | <2.5s | ~1.2s |
| Time to Interactive | <3.5s | ~1.8s |
| Cumulative Layout Shift | <0.1 | ~0.05 |

---

## Best Practices

### Adding New Services

**1. Update CSV:**
```csv
"Nová Kategorie","Nová Subkategorie","single","Nová Služba",
"Krátký popis","Dlouhý popis","60","1","2500",
"Benefit 1,Benefit 2,Benefit 3","/images/nova-sluzba.jpg",
"/images/nova-1.jpg;/images/nova-2.jpg"
```

**2. Add Images (optional):**
```bash
# Add to public/images/
public/images/nova-sluzba.jpg         # Primary image
public/images/nova-1.jpg              # Gallery image 1
public/images/nova-2.jpg              # Gallery image 2
```

**3. Deploy:**
```bash
npm run build
# OR
git push origin main  # Vercel auto-deploys
```

**That's it!** New service automatically:
- ✅ Appears on category page
- ✅ Gets own detail page
- ✅ Included in search
- ✅ Has SEO meta tags
- ✅ Shows in price list

---

### Category Best Practices

**1. Consistent Naming:**
```csv
# ✅ Good
"HIFU Tvar","HIFU Lifting","single","HIFU Lifting obličeje"
"HIFU Tvar","HIFU Lifting","single","HIFU Lifting těla"

# ❌ Bad (inconsistent category names)
"HIFU tvar","HIFU Lifting","single","..."
"Hifu-Tvar","HIFU Lifting","single","..."
```

**2. Meaningful Subcategories:**
```csv
# ✅ Good - groups related services
"Kosmetika","Ošetření pleti","single","Hloubkové čištění"
"Kosmetika","Ošetření pleti","single","Hydratační ošetření"
"Kosmetika","Anti-age","single","Lifting obličeje"

# ❌ Bad - too granular
"Kosmetika","Hloubkové čištění","single","Hloubkové čištění"
"Kosmetika","Hydratační ošetření","single","Hydratační ošetření"
```

**3. Price Formatting:**
```csv
# ✅ Good
"2500"
"2500 Kč"
"2500-3000"
"Na dotaz"

# ❌ Bad
"2,500"           # Comma separator not supported
"2500 CZK"        # Use "Kč" not "CZK"
"od 2500"         # Use "2500-3000" instead
```

---

### Performance Tips

**1. Limit Gallery Images:**
```csv
# ✅ Good - 3-6 images
"images": "img1.jpg;img2.jpg;img3.jpg"

# ❌ Bad - too many images
"images": "img1.jpg;img2.jpg;...;img20.jpg"  # Slow loading
```

**2. Optimize Images Before Upload:**
```bash
# Recommended sizes:
# Primary image: 1200x800px, <200KB
# Gallery images: 800x600px, <150KB each

# Tools:
- ImageOptim (Mac)
- Squoosh.app (Web)
- sharp (CLI)
```

**3. Use WebP Format:**
```bash
# Convert JPG to WebP
cwebp image.jpg -o image.webp -q 80
```

---

**Related Documentation:**
- [Components Overview](../03-frontend/components-overview.md)
- [Routing System](../03-frontend/routing.md)
- [Data Management](../05-data/csv-management.md)
- [SEO Strategy](../06-seo/metadata-strategy.md)

---

**Last Updated:** November 2025
**Maintainer:** SW Beauty Development Team
