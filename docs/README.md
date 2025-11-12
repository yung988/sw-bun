# SW Beauty - Technická Dokumentace

> Komplexní technická dokumentace pro projekt SW Beauty - Moderní webová prezentace kosmetického salonu postavená na Next.js 15 a React 19.

## O Projektu

SW Beauty je prémiová webová aplikace pro kosmetický salon specializující se na pokročilé kosmetické služby a ošetření. Projekt je postaven s důrazem na výkon, moderní UX a luxusní design s jemnými GSAP animacemi.

## Technologický Stack

### Core Framework
- **Next.js 15.5.4** - React framework s App Router a Turbopack
- **React 19.1.0** - Nejnovější verze React knihovny
- **TypeScript 5** - Type-safe development
- **Bun** - Rychlý JavaScript runtime a package manager

### Styling & UI
- **Tailwind CSS 4.1.0** - Utility-first CSS framework
- **Radix UI** - Headless UI komponenty (Popover, Select, Slot)
- **shadcn/ui** - Re-usable komponenty postavené na Radix UI
- **Lucide React** - Moderní ikony

### Animace
- **GSAP 3.13.0** - Professional-grade animace
- **Lenis 1.3.11** - Smooth scroll efekty
- **Custom React Animation Components** - CharReveal, WordReveal, ScrollReveal

### Forms & Validation
- **React Hook Form 7.63.0** - Performantní form management
- **Zod 4.1.11** - Schema validation
- **@hookform/resolvers** - Integrace Zod s React Hook Form

### Backend & API
- **Resend 6.1.2** - Transactional email API
- **@react-email/components** - React email templates
- **PapaParse 5.5.3** - CSV parsing pro data služeb

### Data & Utilities
- **date-fns 4.1.0** - Moderní date utility library
- **clsx & tailwind-merge** - Class name management
- **class-variance-authority** - Variant based styling

### Analytics & Monitoring
- **@vercel/analytics** - Web analytics
- **@vercel/speed-insights** - Performance monitoring

### Development Tools
- **Biome 1.9.4** - Linting a formatting
- **Sharp 0.34.4** - Image processing

## Quick Start

```bash
# 1. Instalace dependencies
bun install

# 2. Nastavení environment variables
cp .env.example .env.local
# Vyplňte RESEND_API_KEY a další proměnné

# 3. Development server
bun run dev

# 4. Build pro production
bun run build

# 5. Start production server
bun run start
```

## Designové konvence (layout & typografie)

Pro konzistentní rozložení a textové styly napříč projektem používejte následující lehké UI komponenty:

- components/ui/Container – zajišťuje jednotný max-width a horizontální odsazení (px-6 / md:px-8 / lg:px-10).
- components/ui/Section – sjednocený vertikální spacing sekcí (py-24 md:py-28).
- components/SectionTitle – jednotná hierarchie nadpisů (eyebrow/title/subtitle) s jemnou serif kurzívou pro zvýraznění.

Příklad struktury sekce:

```tsx
<Section>
  <Container>
    <SectionTitle
      eyebrow="Proč přijít právě k nám"
      title={<>
        Co nás <em className="italic">odlišuje</em>
      </>}
      subtitle="Krátké vysvětlení sekce."
      center={false}
    />
    {/* obsah sekce */}
  </Container>
  
</Section>
```

Tento přístup udržuje konzistentní whitespace a typografii napříč stránkami v duchu referenčního vizuálu.

## Struktura Dokumentace

### [1. Getting Started](./01-getting-started/installation.md)
- Požadavky a prerekvizity
- Instalace a setup
- Environment variables
- Verifikace instalace
- První spuštění

### [2. Architecture](./02-architecture/folder-structure.md)
- Folder structure a organizace
- Next.js App Router architektura
- Component organization
- Data flow patterns
- Server vs Client components

### 4. Backend & API
- [API Routes](./04-backend/api-routes.md) - Kompletní API dokumentace
  - POST /api/booking - Rezervace ošetření
  - POST /api/contact - Kontaktní formulář
  - POST /api/newsletter - Newsletter subscription
  - POST /api/voucher - Objednávka dárkových poukazů
  - GET /api/pricelist - Export ceníku

### [5. Data Management](./05-data/services-data.md)
- Services datový systém
- CSV data struktura
- PriceItem interface
- Data access functions
- Jak přidat novou službu

## Klíčové Features

- **Server-Side Rendering (SSR)** - Optimální SEO a rychlost načítání
- **Dynamic Routing** - /sluzby/[kategorie]/[slug]
- **CSV-Based Content** - Snadná správa služeb přes CSV
- **Email Notifications** - Automatické notifikace přes Resend
- **Rate Limiting** - Ochrana API endpointů
- **Input Sanitization** - Bezpečnost proti XSS útokům
- **GSAP Animations** - Luxusní animace pro quiet-luxury design
- **Image Optimization** - Next.js Image component
- **Responsive Design** - Mobile-first přístup
- **Type Safety** - 100% TypeScript coverage

## Environment Variables

Projekt vyžaduje následující environment variables:

```bash
# Email Service (Resend)
RESEND_API_KEY=re_xxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxx
```

## Development Commands

```bash
# Development
bun run dev              # Start dev server s Turbopack
bun run dev --turbopack  # Explicitně s Turbopack

# Build & Production
bun run build            # Production build
bun run start            # Start production server

# Code Quality
bun run lint             # Lint check
bun run lint:fix         # Lint a oprava
bun run format           # Format code
bun run format:check     # Check formatting
bun run check            # Kompletní check a fix
bun run check:ci         # Check pro CI/CD

# Utilities
bun run favicon:gen      # Generovat favicon
```

## Project Conventions

### Naming Conventions
- **Komponenty**: PascalCase (`BookingModal.tsx`)
- **Utility funkce**: camelCase (`formatPrice.ts`)
- **Typy**: PascalCase (`Service`, `PriceItem`)
- **API routes**: kebab-case (`api/booking/route.ts`)
- **Pages**: kebab-case (`sluzby/[kategorie]/page.tsx`)

### File Organization
- **Client Components**: Začínají s `"use client"`
- **Server Components**: Default, žádná direktiva
- **Client-only logic**: `_client.tsx` suffix pro separaci
- **API Routes**: `route.ts` v app/api/ directory

### CSS & Styling
- **Tailwind First**: Používat Tailwind utilities
- **Custom CSS**: Pouze pro komplexní animace
- **CSS Modules**: Nepoužívat, preferovat Tailwind

## Performance

- **Lighthouse Score**: 95+ (Desktop), 90+ (Mobile)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Image Optimization**: Automatické přes Next.js Image
- **Code Splitting**: Automatické přes Next.js

## Browser Support

- Chrome (poslední 2 verze)
- Firefox (poslední 2 verze)
- Safari (poslední 2 verze)
- Edge (poslední 2 verze)

## Deployment

Projekt je optimalizovaný pro deployment na:
- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - S Next.js adapter
- **Self-hosted** - Docker nebo Node.js server

## Kontakt & Podpora

### Technické Dotazy
- Email: [tech@swbeauty.cz](mailto:tech@swbeauty.cz)
- GitHub Issues: [Otevřít issue](https://github.com/...)

### Business Kontakt
- Web: [swbeauty.cz](https://swbeauty.cz)
- Email: [info@swbeauty.cz](mailto:info@swbeauty.cz)
- Telefon: +420 773 577 899
- Adresa: U Cihelny 1326/2, 695 01 Hodonín

## License

© 2024 SW Beauty s.r.o. Všechna práva vyhrazena.

---

**Poslední aktualizace:** 6. listopadu 2024
**Verze dokumentace:** 1.0.0
**Next.js verze:** 15.5.4
