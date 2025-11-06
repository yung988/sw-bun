# Tech Stack Documentation

> Detailní dokumentace všech technologií použitých v SW Beauty projektu

## Table of Contents

- [Frontend Framework](#frontend-framework)
- [Styling](#styling)
- [Animations](#animations)
- [UI Libraries](#ui-libraries)
- [Forms & Validation](#forms--validation)
- [Backend & API](#backend--api)
- [Build Tools](#build-tools)
- [Code Quality](#code-quality)
- [Analytics](#analytics)
- [Why These Choices](#why-these-choices)

---

## Frontend Framework

### Next.js 15.5.4

**Co to je:** React framework s hybrid rendering (SSR, SSG, ISR)

**Proč je použit:**
- App Router s React Server Components
- File-based routing
- API Routes (serverless functions)
- Image optimization
- Font optimization
- Best-in-class performance

**Jak se používá:**
```bash
bun run dev         # Development server
bun run build       # Production build
bun run start       # Production server
```

**Konfigurace:** `next.config.ts`
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // ...
    ],
  },
}
```

**Alternativy:** Remix, Gatsby, Vite + React Router
**Proč Next.js:** Industry standard, Vercel optimalizace, nejlepší DX

---

### React 19.1.0

**Co to je:** UI library pro interaktivní komponenty

**Proč je použit:**
- Component-based architecture
- Server Components (nová feature v React 19)
- Hooks API
- Virtual DOM performance
- Ekosystém (největší v JavaScriptu)

**Klíčové hooks v projektu:**
- `useState` - lokální state
- `useEffect` - side effects
- `useLayoutEffect` - DOM measurements před paintem
- `useRef` - DOM refs pro GSAP
- `useContext` - global state (Providers)
- `useCallback`, `useMemo` - optimalizace

**Alternativy:** Vue, Svelte, Solid
**Proč React:** Největší ekosystém, Next.js integrace

---

### TypeScript 5.x

**Co to je:** JavaScript s typovým systémem

**Proč je použit:**
- Type safety (prevence runtime errors)
- IntelliSense/autocomplete
- Refactoring confidence
- Lepší documentation (types = docs)

**Konfigurace:** `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2023", "DOM"],
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Type-safe patterns v projektu:**
```typescript
// Strict typing
type Service = {
  slug: string
  name: string
  price: string
  duration: number | null
  // ...
}

// Zod runtime validation
const schema = z.object({
  email: z.string().email(),
})
```

---

## Styling

### Tailwind CSS 4.1.0

**Co to je:** Utility-first CSS framework

**Proč je použit:**
- Rapid development (žádné CSS soubory)
- Konzistentní design system
- Automatic purging (malé bundle sizes)
- Responsive utilities
- Dark mode support
- Customizable

**Konfigurace:** `globals.css` (Tailwind 4 pattern)
```css
@import "tailwindcss";

@theme {
  --color-slate-50: #fbfbfb;
  --spacing-90: 90px;
  /* ... */
}
```

**PostCSS plugin:** `@tailwindcss/postcss@4.1.0`

**Příklad použití:**
```tsx
<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-2xl transition-all">
```

**Alternativy:** styled-components, CSS Modules, Vanilla CSS
**Proč Tailwind:** Fastest development, konzistentní design, small bundle

---

### PostCSS 8.4.49

**Co to je:** CSS transformace engine

**Proč je použit:**
- Tailwind requires PostCSS
- Autoprefixer (vendor prefixes)
- Nesting, imports

**Konfigurace:** `postcss.config.mjs`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

## Animations

### GSAP 3.13.0

**Co to je:** GreenSock Animation Platform - profesionální JavaScript animační knihovna

**Proč je použit:**
- Best-in-class performance (hardware accelerated)
- ScrollTrigger plugin (scroll animations)
- Timeline sequencing
- Cross-browser compatibility
- Quiet luxury feel vyžaduje precizní animace

**Plugins použité:**
- ScrollTrigger - scroll-based animations
- CustomEase - custom easing curves

**Použití:**
```tsx
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.animate', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate',
        start: 'top 80%'
      }
    })
  }, ref)

  return () => ctx.revert()  // Cleanup!
}, [])
```

**Alternativy:** Framer Motion, anime.js, Web Animations API
**Proč GSAP:** Industry standard pro high-end animace, nejlepší performance

---

### Lenis 1.3.11

**Co to je:** Smooth scroll library

**Proč je použit:**
- Buttery smooth scrolling
- Integrace s GSAP ScrollTrigger
- Momentum scrolling
- Premium feel

**Použití:**
```tsx
// components/LenisScroll.tsx
'use client'
import Lenis from 'lenis'

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  })

  gsap.ticker.add((time) => lenis.raf(time * 1000))
}, [])
```

**Alternativy:** Locomotive Scroll, native CSS scroll-behavior
**Proč Lenis:** Modern, lightweight, GSAP integrace

---

## UI Libraries

### Radix UI

**Co to je:** Unstyled, accessible UI primitives

**Packages použité:**
- `@radix-ui/react-popover@1.1.15` - Popovers
- `@radix-ui/react-select@2.2.6` - Select dropdowns
- `@radix-ui/react-slot@1.2.3` - Composition pattern

**Proč je použit:**
- Accessibility out-of-the-box (WAI-ARIA)
- Unstyled (můžeme stylovat Tailwindem)
- Headless components
- Keyboard navigation

**Použití:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select onValueChange={onChange}>
  <SelectTrigger>
    <SelectValue placeholder="Vyberte..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Možnost 1</SelectItem>
  </SelectContent>
</Select>
```

**Alternativy:** Headless UI, Reach UI, React Aria
**Proč Radix:** Nejlepší accessibility, shadcn/ui pattern

---

### Lucide React 0.545.0

**Co to je:** SVG icon library (fork Feather Icons)

**Proč je použit:**
- Tree-shakeable (import only used icons)
- Konzistentní design
- Customizable (size, color, stroke)

**Použití:**
```tsx
import { Menu, X, Phone, Heart } from 'lucide-react'

<Phone size={20} className="text-white" />
<X className="h-5 w-5" />
```

**Alternativy:** React Icons, Heroicons, Font Awesome
**Proč Lucide:** Modern, lightweight, tree-shakeable

---

## Forms & Validation

### React Hook Form 7.63.0

**Co to je:** Performantní form library

**Proč je použit:**
- Minimal re-renders
- Built-in validation
- Easy integration with Zod
- Great DX (developer experience)

**Použití:**
```tsx
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema)
})

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  {errors.email && <p>{errors.email.message}</p>}
</form>
```

**Alternativy:** Formik, Final Form
**Proč RHF:** Best performance, Zod integrace

---

### Zod 4.1.11

**Co to je:** TypeScript-first schema validation

**Proč je použit:**
- Type inference (schema → TypeScript types)
- Runtime validation
- Composable schemas
- Error messages

**Použití:**
```typescript
import { z } from 'zod'

const bookingSchema = z.object({
  email: z.string().email('Zadejte platný email'),
  phone: z.string().regex(/^(\+420)?[0-9]{9}$/, 'České telefonní číslo'),
  date: z.string().min(1, 'Vyberte datum'),
})

type BookingFormData = z.infer<typeof bookingSchema>  // Auto-typed!
```

**Alternativy:** Yup, Joi, Ajv
**Proč Zod:** TypeScript-first, type inference

---

### @hookform/resolvers 5.2.2

**Co to je:** Adaptéry pro RHF + validace (Zod, Yup, atd.)

**Proč je použit:**
- Propojuje React Hook Form + Zod
- Type-safe

**Použití:**
```tsx
import { zodResolver } from '@hookform/resolvers/zod'

const { ... } = useForm({
  resolver: zodResolver(bookingSchema)
})
```

---

## Backend & API

### Resend 6.1.2

**Co to je:** Developer-first email API

**Proč je použit:**
- React Email komponenty
- Great deliverability
- Simple API
- Generous free tier (100 emails/day)

**Použití:**
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'SW Beauty <info@swbeauty.cz>',
  to: 'customer@email.cz',
  subject: 'Potvrzení rezervace',
  react: <BookingConfirmationEmail />
})
```

**Alternativy:** SendGrid, Mailgun, Nodemailer
**Proč Resend:** React Email, DX, modern API

---

### @react-email/components 0.5.5

**Co to je:** React komponenty pro email templates

**Proč je použit:**
- Write emails as React komponenty
- Responsive by default
- Cross-client compatibility

**Použití:**
```tsx
import { Html, Head, Body, Container, Text } from '@react-email/components'

export default function BookingEmail({ name }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>Děkujeme, {name}!</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

---

### Papaparse 5.5.3

**Co to je:** CSV parser pro JavaScript

**Proč je použit:**
- Parse CSV do JSON
- Handle special characters, quotes
- Stream large files

**Použití:**
```typescript
import Papa from 'papaparse'

const parsed = Papa.parse<Record<string, string>>(csvText, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: false
})

const items: PriceItem[] = parsed.data.map(row => ({
  category: row.Category,
  name: row.Name,
  // ...
}))
```

**Alternativy:** csv-parse, d3-dsv
**Proč Papaparse:** Simple API, robust

---

## Build Tools

### Bun 1.x

**Co to je:** JavaScript runtime & package manager (Rust-based)

**Proč je použit:**
- Fastest package manager (3-10× rychlejší než npm)
- Drop-in Node.js replacement
- Built-in TypeScript support
- Fast script execution

**Commands:**
```bash
bun install                  # Install dependencies
bun add gsap                 # Add package
bun add -D @types/node       # Add dev dependency
bun run dev                  # Run script
bun run build                # Build
```

**Alternativy:** npm, yarn, pnpm
**Proč Bun:** Fastest, modern, great DX

---

### Turbopack

**Co to je:** Rust-based bundler (next-gen Webpack)

**Proč je použit:**
- Faster builds než Webpack
- Incremental compilation
- Fast HMR (Hot Module Replacement)
- Next.js default v budoucnosti

**Použití:**
```bash
next dev --turbopack     # Dev with Turbopack
next build --turbopack   # Build with Turbopack
```

**Alternativy:** Webpack, Vite, esbuild
**Proč Turbopack:** Next.js integrace, fastest

---

### Sharp 0.34.4

**Co to je:** High-performance image processing (C-based)

**Proč je použit:**
- Next.js Image optimization vyžaduje Sharp
- Resize, convert images
- WebP, AVIF generation

**Alternativy:** Pillow (Python), ImageMagick
**Proč Sharp:** Next.js requirement, fastest

---

## Code Quality

### Biome 1.9.4

**Co to je:** Fast linter & formatter (Rust-based)

**Proč je použit:**
- 10-20× rychlejší než ESLint + Prettier
- Single tool (linting + formatting)
- Compatible s ESLint/Prettier configs
- TypeScript-first

**Konfigurace:** `biome.json`
```json
{
  "formatter": {
    "indentWidth": 2,
    "lineWidth": 120,
    "lineEnding": "lf"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

**Commands:**
```bash
bun run lint            # Lint only
bun run lint:fix        # Lint + autofix
bun run format          # Format only
bun run check           # Lint + format + autofix
bun run check:ci        # CI check (no autofix)
```

**Alternativy:** ESLint + Prettier
**Proč Biome:** Fastest, single tool, modern

---

## Analytics

### Vercel Analytics 1.5.0

**Co to je:** Web analytics (privacy-friendly)

**Proč je použit:**
- Zero-config s Vercel
- Privacy-friendly (GDPR compliant)
- Real User Monitoring (RUM)
- Free tier

**Použití:**
```tsx
import { Analytics } from '@vercel/analytics/react'

<Analytics />  // V root layoutu
```

**Alternativy:** Google Analytics, Plausible, Fathom
**Proč Vercel Analytics:** Zero-config, privacy-friendly

---

### Vercel Speed Insights 1.2.0

**Co to je:** Core Web Vitals tracking

**Proč je použit:**
- Track LCP, FID, CLS
- Real user data
- Vercel integration

**Použití:**
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

<SpeedInsights />
```

---

## Utility Libraries

### clsx 2.1.1

**Co to je:** Tiny utility pro classNames

**Proč je použit:**
- Conditional classes
- Lightweight (228 bytes)

**Použití:**
```tsx
import clsx from 'clsx'

<div className={clsx(
  'base-class',
  isActive && 'active',
  error && 'error'
)} />
```

---

### tailwind-merge 3.3.1

**Co to je:** Merge Tailwind classes correctly

**Proč je použit:**
- Prevent conflicting utilities
- Override patterns

**Použití:**
```tsx
import { twMerge } from 'tailwind-merge'

twMerge('px-2 py-1', 'px-4')  // → 'py-1 px-4' (px-2 removed)
```

**V projektu: `cn()` utility:**
```typescript
// lib/utils.ts
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

### class-variance-authority 0.7.1

**Co to je:** Type-safe variant patterns

**Proč je použit:**
- Button variants (outline, primary, etc.)
- Type-safe props
- Composable styles

**Použití:**
```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'base classes',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'border bg-transparent'
      },
      size: {
        sm: 'px-3 py-1',
        lg: 'px-6 py-3'
      }
    }
  }
)

type ButtonProps = VariantProps<typeof buttonVariants>
```

---

### date-fns 4.1.0

**Co to je:** Modern date utility library

**Proč je použit:**
- Date formatting
- Date manipulation
- Czech locale support

**Použití:**
```tsx
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'

format(new Date(), 'PPP', { locale: cs })
// → "6. listopadu 2025"
```

**Alternativy:** Moment.js, Day.js, Luxon
**Proč date-fns:** Modular, tree-shakeable, TypeScript

---

## Why These Choices

### Performance-First

- **GSAP** - hardware accelerated animace
- **Bun** - fastest package manager
- **Turbopack** - fastest bundler
- **Biome** - fastest linter
- **Sharp** - fastest image processing

### Developer Experience

- **TypeScript** - type safety
- **Tailwind** - rapid styling
- **React Hook Form + Zod** - easy forms
- **Radix UI** - accessible primitives
- **Next.js** - zero-config

### Modern Stack

- **Next.js 15** - latest features (Server Components)
- **React 19** - latest React
- **Tailwind 4** - CSS-first future
- **Bun** - modern runtime

### Vercel Ecosystem

- **Next.js** - Vercel's framework
- **Vercel Analytics** - built-in
- **Vercel deployment** - zero-config

---

## Version Management

Vždy používat přesné verze (lockfile):

```json
// package.json
{
  "dependencies": {
    "next": "15.5.4",      // Přesná verze
    "react": "19.1.0"
  }
}
```

**Lockfile:** `bun.lock` (COMMIT to git!)

**Updates:**
```bash
bun update                    # Update all
bun update next               # Update specific
bun outdated                  # Check outdated
```

---

## Závěr

SW Beauty tech stack je moderní, performantní a developer-friendly:

**Klíčové technologie:**
1. Next.js 15 + React 19 (framework)
2. TypeScript (type safety)
3. Tailwind CSS 4 (styling)
4. GSAP + Lenis (animace)
5. Bun (runtime & package manager)
6. Biome (linting & formatting)
7. Resend (email)
8. Radix UI (accessible components)
9. React Hook Form + Zod (forms)

**Filozofie:**
- Performance first
- Type safety
- Modern tools
- Great DX

**Související dokumentace:**
- [Architecture Overview](/docs/02-architecture/overview.md)
- [Component Catalog](/docs/06-components/component-catalog.md)
