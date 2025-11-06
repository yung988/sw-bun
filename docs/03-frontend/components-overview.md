# Components Overview

**SW Beauty Project - Component Architecture**

Version: 1.0
Last Updated: November 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [Component Hierarchy](#component-hierarchy)
3. [Component Categories](#component-categories)
   - [Layout Components](#layout-components)
   - [Page Sections](#page-sections)
   - [Forms](#forms)
   - [Modals](#modals)
   - [Cards](#cards)
   - [Buttons & CTAs](#buttons--ctas)
   - [Animation Components](#animation-components)
   - [UI Primitives](#ui-primitives)
   - [Utility Components](#utility-components)
4. [Import Paths](#import-paths)
5. [Component Tree](#component-tree)
6. [Cross-References](#cross-references)

---

## Introduction

SW Beauty projekt obsahuje **75+ React komponent** organizovaných do logických kategorií. Všechny komponenty jsou napsané v **TypeScript** s použitím **Next.js 14 App Router** a **Tailwind CSS** pro stylování.

Projekt využívá moderní React patterns:
- **Server Components** (default) pro optimalizaci výkonu
- **Client Components** (`'use client'`) pro interaktivitu a animace
- **Composition over inheritance** pro flexibilní strukturu
- **Type-safe props** s TypeScript interfaces
- **Responsive design** s mobile-first přístupem

---

## Component Hierarchy

```
RootLayout (app/layout.tsx)
├── IntroProvider (intro state management)
│   ├── LoadingScreen (initial loader)
│   ├── LenisScroll (smooth scroll provider)
│   ├── ScrollProgress (progress indicator)
│   └── ModalProvider (modal state management)
│       ├── BrandProvider (brand assets context)
│       │   ├── Navbar (global navigation)
│       │   ├── MainContent (page content wrapper)
│       │   │   └── {children} (page-specific content)
│       │   └── Footer (global footer)
│       ├── BookingModal (booking dialog)
│       └── VoucherModal (voucher purchase dialog)
└── Analytics & SpeedInsights (Vercel monitoring)
```

---

## Component Categories

### Layout Components

Základní strukturální komponenty pro layout stránky.

| Component | Location | Description | Type |
|-----------|----------|-------------|------|
| **Container** | `components/ui/Container.tsx` | Max-width wrapper pro obsah (1250px) | Server |
| **Section** | `components/ui/Section.tsx` | Sekce s konzistentním spacingem | Server |
| **Navbar** | `components/Navbar.tsx` | Hlavní navigace s mobilním menu | Client |
| **Footer** | `components/Footer.tsx` | Patička s kontakty a odkazy | Server |
| **MainContent** | `components/MainContent.tsx` | Wrapper pro page content s fade-in | Client |
| **Hero** | `components/Hero.tsx` | Generic hero section template | Server |
| **HeroSection** | `components/HeroSection.tsx` | Homepage hero s video/image | Client |
| **CategoryHero** | `components/CategoryHero.tsx` | Hero pro kategorii služeb | Server |

**Usage Example:**
```tsx
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export default function Page() {
  return (
    <Section>
      <Container>
        <h1>Content</h1>
      </Container>
    </Section>
  )
}
```

---

### Page Sections

Velké sekce používané na homepage a dalších stránkách.

| Component | Location | Description | Animations |
|-----------|----------|-------------|------------|
| **AboutUsSection** | `components/AboutUsSection.tsx` | O nás sekce s příběhem | GSAP reveal + parallax |
| **ServicesSection** | `components/ServicesSection.tsx` | Přehled hlavních služeb | GSAP reveal |
| **GallerySection** | `components/GallerySection.tsx` | Fotogalerie s mozaikou | GSAP reveal + parallax |
| **TestimonialsSection** | `components/TestimonialsSection.tsx` | Recenze zákazníků | GSAP reveal |
| **FAQSection** | `components/FAQSection.tsx` | Časté dotazy (accordion) | GSAP reveal |
| **ContactSection** | `components/ContactSection.tsx` | Kontaktní formulář + info | GSAP reveal |
| **NewsletterSection** | `components/NewsletterSection.tsx` | Newsletter signup | GSAP reveal |
| **WhyUsSection** | `components/WhyUsSection.tsx` | Proč si vybrat nás | GSAP reveal |
| **ResultsSection** | `components/ResultsSection.tsx` | Výsledky před/po | GSAP reveal |
| **VoucherCTASection** | `components/VoucherCTASection.tsx` | Dárkové poukazy CTA | GSAP reveal |
| **HorizontalScrollSection** | `components/HorizontalScrollSection.tsx` | Horizontální scroll showcase | GSAP pin + scroll |
| **HorizontalServicesSection** | `components/HorizontalServicesSection.tsx` | Služby v horizontal scroll | GSAP pin + scroll |

**Key Pattern:**
Všechny page sections používají:
- `data-reveal` attribute pro scroll animations
- `data-parallax` pro parallax efekty
- Responsive grid layouts
- Semantic HTML struktura

---

### Forms

Formulářové komponenty s validací a API integrací.

| Component | Location | API Endpoint | Validation |
|-----------|----------|--------------|------------|
| **BookingForm** | `components/BookingForm.tsx` | `/api/booking` | Zod schema |
| **ContactForm** | `components/ContactForm.tsx` | `/api/contact` | Zod schema |
| **VoucherForm** | `components/VoucherForm.tsx` | `/api/voucher` | Zod schema |
| **SubscribeForm** | `components/SubscribeForm.tsx` | `/api/newsletter` | Zod schema |

**Form Features:**
- Client-side validation s TypeScript types
- Server-side validation s Zod schemas
- Rate limiting (5 requests/hour per IP)
- Email notifications (Resend)
- Sanitization všech inputs
- Error handling s user feedback
- Loading states

**Example:**
```tsx
// BookingForm automatically handles:
// - Field validation
// - API submission
// - Email notifications (owner + customer)
// - Error states
// - Success feedback
```

---

### Modals

Centralizované modální dialogy s GSAP animacemi.

| Component | Location | Trigger Components | Animation |
|-----------|----------|-------------------|-----------|
| **BookingModal** | `components/BookingModal.tsx` | OpenBookingButton, ServiceBookingButton | GSAP scale + fade |
| **VoucherModal** | `components/VoucherModal.tsx` | OpenVoucherButton | GSAP scale + fade |
| **Modal** | `components/Modal.tsx` | Generic modal wrapper | GSAP scale + fade |

**Modal Management:**
```tsx
// ModalProvider context (components/ModalProvider.tsx)
import { useModals } from '@/components/ModalProvider'

function MyComponent() {
  const { openBooking, openVoucher } = useModals()

  return (
    <button onClick={() => openBooking({
      name: 'HIFU Lifting',
      price: '2500 Kč'
    })}>
      Rezervovat
    </button>
  )
}
```

**Modal Features:**
- Centrální state management přes React Context
- GSAP enter/exit animations
- Click-outside-to-close
- ESC key support
- Backdrop blur effect
- Service preselection support

---

### Cards

Karty pro zobrazení služeb, features, testimonials.

| Component | Location | Usage | Props |
|-----------|----------|-------|-------|
| **ServiceCard** | `components/ServiceCard.tsx` | Seznam služeb | service, onClick |
| **FeatureCard** | `components/FeatureCard.tsx` | Features/benefits | icon, title, description |
| **TestimonialCard** | `components/TestimonialCard.tsx` | Recenze | name, text, rating, image |
| **WhyCard** | `components/WhyCard.tsx` | Důvody výběru | number, title, description |
| **HighlightCard** | `components/HighlightCard.tsx` | Zvýrazněné info | title, description, icon |
| **ContactInfoCard** | `components/ContactInfoCard.tsx` | Kontaktní info | type, value, icon |

**Card Design Pattern:**
```tsx
// Všechny karty používají konzistentní design:
// - Rounded corners (rounded-[1.5rem] nebo rounded-[2rem])
// - Border (border-slate-200)
// - Hover effects (hover:-translate-y-0.5, hover:border-slate-900)
// - Responsive padding
// - data-reveal attribute pro animace
```

---

### Buttons & CTAs

Call-to-action buttons pro konverzi.

| Component | Location | Action | Styling |
|-----------|----------|--------|---------|
| **OpenBookingButton** | `components/OpenBookingButton.tsx` | Otevře BookingModal | Customizable className |
| **ServiceBookingButton** | `components/ServiceBookingButton.tsx` | Rezervace s preselected service | Customizable className |
| **OpenVoucherButton** | `components/OpenVoucherButton.tsx` | Otevře VoucherModal | Customizable className |
| **Button** | `components/ui/button.tsx` | Generic button (shadcn/ui) | Variants: default, outline, ghost |

**Button Pattern:**
```tsx
// OpenBookingButton - používá useModals hook
<OpenBookingButton className="rounded-full bg-slate-900 px-6 py-3">
  Konzultace zdarma
</OpenBookingButton>

// ServiceBookingButton - s předvybranou službou
<ServiceBookingButton
  service={{ name: 'HIFU Lifting', price: '2500 Kč' }}
  className="..."
>
  Rezervovat
</ServiceBookingButton>
```

---

### Animation Components

GSAP-based animační komponenty pro scroll-triggered efekty.

| Component | Location | Effect | Use Case |
|-----------|----------|--------|----------|
| **CharReveal** | `components/animations/CharReveal.tsx` | Character-by-character reveal | Headlines, důležitý text |
| **WordReveal** | `components/animations/WordReveal.tsx` | Word-by-word reveal | Delší nadpisy |
| **ScrollReveal** | `components/animations/ScrollReveal.tsx` | Multi-direction reveal | Universal scroll reveal |
| **ImageReveal** | `components/animations/ImageReveal.tsx` | Curtain wipe reveal | Obrázky, hero images |
| **HorizontalScroll** | `components/animations/HorizontalScroll.tsx` | Horizontal scroll on vertical | Timelines, showcases |
| **NumberCounter** | `components/animations/NumberCounter.tsx` | Animated number counting | Stats, metrics |
| **PinSection** | `components/animations/PinSection.tsx` | Pin while scrolling | Sticky sections |
| **SplitReveal** | `components/animations/SplitReveal.tsx` | Center split reveal | Dramatic entrances |
| **FadeIn** | `components/animations/FadeIn.tsx` | Simple fade-in | Subtle reveals |
| **NumberedSection** | `components/animations/NumberedSection.tsx` | Numbered step reveal | Multi-step content |
| **SmoothScrollProvider** | `components/animations/SmoothScrollProvider.tsx` | Lenis smooth scroll | Global provider |

**Custom Hooks:**
```tsx
// useGsapReveal - scroll-triggered reveal
import { useGsapReveal } from '@/components/animations/useGsapReveal'

function MyComponent() {
  const containerRef = useRef<HTMLElement>(null)
  useGsapReveal(containerRef, '[data-reveal]')

  return (
    <section ref={containerRef}>
      <div data-reveal>Animated content</div>
    </section>
  )
}

// useGsapParallax - parallax effect
import { useGsapParallax } from '@/components/animations/useGsapParallax'

function MyComponent() {
  const containerRef = useRef<HTMLElement>(null)
  useGsapParallax(containerRef, '[data-parallax]')

  return (
    <section ref={containerRef}>
      <img data-parallax src="..." />
    </section>
  )
}
```

**See Also:** [animations-system.md](./animations-system.md) for detailed animation documentation.

---

### UI Primitives

Základní UI komponenty (shadcn/ui based).

| Component | Location | Description | Variants |
|-----------|----------|-------------|----------|
| **Button** | `components/ui/button.tsx` | Button component | default, outline, ghost, link |
| **Input** | `components/ui/input.tsx` | Text input | - |
| **Textarea** | `components/ui/textarea.tsx` | Multi-line input | - |
| **Select** | `components/ui/select.tsx` | Dropdown select | - |
| **Calendar** | `components/ui/calendar.tsx` | Date picker | - |
| **Popover** | `components/ui/popover.tsx` | Popover container | - |

**UI Primitives jsou postaveny na:**
- [shadcn/ui](https://ui.shadcn.com/) components
- [Radix UI](https://www.radix-ui.com/) primitives
- Tailwind CSS styling
- Accessibility-first approach

---

### Utility Components

Pomocné komponenty pro různé účely.

| Component | Location | Purpose | Notes |
|-----------|----------|---------|-------|
| **BrandProvider** | `components/BrandProvider.tsx` | Context pro brand assets (logo) | Server component |
| **IntroProvider** | `components/IntroProvider.tsx` | Loading screen state | Client component |
| **ModalProvider** | `components/ModalProvider.tsx` | Modal state management | Client component |
| **LenisScroll** | `components/LenisScroll.tsx` | Smooth scroll setup | Client component |
| **ScrollProgress** | `components/ScrollProgress.tsx` | Scroll progress indicator | Client component |
| **LoadingScreen** | `components/LoadingScreen.tsx` | Initial page loader | Client component |
| **PageTransition** | `components/PageTransition.tsx` | Page transition animations | Client component |
| **AnimatedLogo** | `components/AnimatedLogo.tsx` | Animated logo component | Client component |
| **TrackedLink** | `components/TrackedLink.tsx` | Link s event tracking | Client component |
| **ServiceViewTracker** | `components/ServiceViewTracker.tsx` | Service view analytics | Client component |
| **SectionTitle** | `components/SectionTitle.tsx` | Konzistentní sekce title | Server component |
| **Carousel** | `components/Carousel.tsx` | Image carousel | Client component |
| **BeforeAfterSlider** | `components/BeforeAfterSlider.tsx` | Before/after slider | Client component |
| **CategoryMosaic** | `components/CategoryMosaic.tsx` | Image mosaic grid | Server component |
| **ImageGallery** | `components/ImageGallery.tsx` | Responsive image gallery | Server component |
| **ParallaxImage** | `components/ParallaxImage.tsx` | Image with parallax | Client component |
| **PriceTable** | `components/PriceTable.tsx` | Price list table | Server component |
| **RatingSummary** | `components/RatingSummary.tsx` | Rating stars display | Server component |
| **SubcategoryTOC** | `components/SubcategoryTOC.tsx` | Table of contents | Client component |
| **ServiceSearch** | `components/ServiceSearch.tsx` | Live search input | Client component |
| **FAQ** | `components/FAQ.tsx` | FAQ accordion item | Client component |
| **FadeInSection** | `components/FadeInSection.tsx` | Simple fade-in wrapper | Client component |

---

## Import Paths

Projekt používá **TypeScript path aliases** pro čistší importy:

```tsx
// ❌ Špatně (relative imports)
import { Button } from '../../../components/ui/button'

// ✅ Správně (absolute imports s aliasem)
import { Button } from '@/components/ui/button'
import { getAllServices } from '@/lib/services'
import { gsap } from '@/lib/gsap'
```

**Configured in `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Component Tree

### Homepage Component Structure

```
page.tsx (/)
├── HeroSection
│   ├── CharReveal (headline)
│   ├── WordReveal (subtitle)
│   └── OpenBookingButton
├── AboutUsSection
│   ├── ScrollReveal (containers)
│   ├── ImageReveal (photos)
│   └── ParallaxImage
├── ServicesSection
│   ├── SectionTitle
│   └── ServiceCard[] (grid)
│       └── ServiceBookingButton
├── HorizontalScrollSection
│   └── HorizontalScroll
│       └── ServiceCard[]
├── GallerySection
│   ├── ImageReveal[]
│   └── ParallaxImage[]
├── ResultsSection
│   ├── BeforeAfterSlider[]
│   └── NumberCounter (stats)
├── TestimonialsSection
│   ├── TestimonialCard[]
│   └── RatingSummary
├── WhyUsSection
│   └── WhyCard[]
├── FAQSection
│   └── FAQ[] (accordion items)
├── VoucherCTASection
│   └── OpenVoucherButton
├── NewsletterSection
│   └── SubscribeForm
└── ContactSection
    ├── ContactForm
    └── ContactInfoCard[]
```

### Services Pages Structure

```
app/sluzby/page.tsx
├── SectionTitle
├── ServiceSearch (client component)
└── Category Cards (grid)
    └── TrackedLink → /sluzby/[kategorie]

app/sluzby/[kategorie]/page.tsx
├── Breadcrumb navigation
├── SectionTitle
├── SubcategoryTOC (desktop sidebar)
└── Subcategory Sections[]
    ├── ImageGallery (mosaic)
    └── ServiceCard[] (grid)
        └── TrackedLink → /sluzby/[kategorie]/[slug]

app/sluzby/[kategorie]/[slug]/page.tsx
├── Breadcrumb navigation
├── Service Hero
│   ├── Service details
│   └── ServiceBookingButton
├── ImageGallery (service images)
├── Benefits list
├── Related services
│   └── ServiceCard[]
└── FAQ (service-specific)
```

---

## Cross-References

**Related Documentation:**

- **Animation System:** [animations-system.md](./animations-system.md) - Kompletní GSAP animace
- **Booking System:** [../07-features/booking-system.md](../07-features/booking-system.md) - Rezervační flow
- **Services Catalog:** [../07-features/services-catalog.md](../07-features/services-catalog.md) - Služby a routing
- **Routing:** [routing.md](./routing.md) - Next.js App Router struktura
- **API Routes:** [../04-backend/api-routes.md](../04-backend/api-routes.md) - Backend endpoints

---

## Best Practices

### Component Organization

1. **Keep components focused** - každá komponenta má jednu zodpovědnost
2. **Use TypeScript** - všechny props jsou typované
3. **Server by default** - použij client component jen když je nutný
4. **Composition pattern** - skládej komponenty místo velkých monolitů
5. **Consistent naming** - PascalCase pro komponenty, camelCase pro funkce

### Performance

1. **Server Components** pro statický obsah
2. **Client Components** jen pro interaktivitu
3. **Lazy loading** pro velké komponenty
4. **Image optimization** přes next/image
5. **Code splitting** automatický díky Next.js

### Accessibility

1. **Semantic HTML** - používej správné HTML elementy
2. **ARIA labels** pro screen readers
3. **Keyboard navigation** support
4. **Reduced motion** respektování user preference
5. **Focus management** v modálech

---

**Last Updated:** November 2025
**Maintainer:** SW Beauty Development Team
