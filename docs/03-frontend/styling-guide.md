# Styling Guide

> Kompletní průvodce stylingem a design systemem SW Beauty projektu

## Table of Contents

- [Technology Stack](#technology-stack)
- [Design System](#design-system)
- [Tailwind Configuration](#tailwind-configuration)
- [CSS Variables](#css-variables)
- [Component Styling Patterns](#component-styling-patterns)
- [Utility-First Approach](#utility-first-approach)
- [Responsive Design](#responsive-design)
- [Animations & Effects](#animations--effects)
- [Global Styles](#global-styles)
- [Best Practices](#best-practices)

---

## Technology Stack

### Tailwind CSS 4.1.0

Projekt používá **Tailwind CSS 4.1.0** - nejnovější verzi s CSS-first konfigurací.

**Klíčové změny v Tailwind 4:**
- `@import "tailwindcss"` místo direktiv `@tailwind`
- `@theme` direktiva pro definici proměnných
- `@custom-variant` pro custom varianty
- Nativní CSS variables
- PostCSS plugin: `@tailwindcss/postcss`

**Instalace:**
```bash
bun add -D tailwindcss@4.1.0 @tailwindcss/postcss
```

**PostCSS Config:**
```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

## Design System

### Colors

Projekt používá **monochromatické barevné schéma** - černo-bílo-šedé s quiet luxury estetikou.

#### Paleta Slate (Grayscale)

```css
/* globals.css - @theme direktiva */
--color-slate-50: #fbfbfb;    /* Velmi světlá šedá */
--color-slate-100: #f5f5f5;   /* Pozadí */
--color-slate-200: #e5e5e5;   /* Borders, dividers */
--color-slate-300: #d4d4d4;
--color-slate-400: #a3a3a3;
--color-slate-500: #737373;   /* Text secondary */
--color-slate-600: #525252;
--color-slate-700: #404040;
--color-slate-800: #4c4c4c;   /* Text tmavší */
--color-slate-900: #000000;   /* Primární text, CTA */
```

**Použití:**
```tsx
<div className="bg-slate-50 text-slate-900">
  <p className="text-slate-600">Popis textu</p>
</div>
```

#### Speciální Barvy

```css
--color-black: #000000;       /* Pure black */
--color-white: #ffffff;       /* Pure white */
--color-milk: #faf9f6;        /* Okare-inspired mléčně bílá */
```

**Milk White** - používá se pro pozadí s teplým odstínem:
```tsx
<div className="bg-milk">Teplé pozadí</div>
```

#### Sémantické Barvy (OKLCH)

Projekt používá **OKLCH** color space pro lepší barevnou přesnost.

```css
:root {
  --background: oklch(1 0 0);              /* Bílá */
  --foreground: oklch(0.145 0 0);          /* Černá */
  --primary: oklch(0.205 0 0);             /* Tmavě šedá */
  --primary-foreground: oklch(0.985 0 0);  /* Světlá */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);                /* Focus ring */
  /* ... další */
}
```

**Použití:**
```tsx
<div className="bg-background text-foreground border border-border">
  Content
</div>
```

---

### Typography

#### Font Stack

Projekt používá **Inter** jako primární font a **Instrument Serif** pro italic elementy.

```css
:root {
  --font-sans: var(--font-inter);        /* Inter variable font */
  --font-display: var(--font-inter);
  --font-serif: var(--font-instrument-serif);  /* Instrument Serif */
}
```

**Loading fontů:**
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = localFont({
  src: '../fonts/InstrumentSerif-Italic.woff2',
  variable: '--font-instrument-serif',
  display: 'swap',
})

<body className={`${inter.variable} ${instrumentSerif.variable} font-sans`}>
```

#### Heading Styles

Definované v `globals.css`:

```css
h1 {
  @apply text-4xl md:text-5xl lg:text-6xl font-light tracking-tight;
}
h2 {
  @apply text-3xl md:text-4xl font-light tracking-tight;
}
h3 {
  @apply text-xl font-medium;
}
h4 {
  @apply text-lg font-medium;
}
h5, h6 {
  @apply text-base font-medium;
}
```

**Italic Pattern:**
```css
em, .italic, em.italic, .italic em, h1 em, h2 em, h3 em {
  @apply font-serif italic;
}
```

**Použití:**
```tsx
<h1>
  Cítit se <em>krásně</em>
</h1>
// "krásně" bude v Instrument Serif italic
```

#### Body Text

```css
body {
  @apply bg-white text-black font-sans text-base leading-7 antialiased;
}
```

- Base font size: `16px` (1rem)
- Line height: `1.75` (leading-7)
- Font smoothing: `antialiased`

---

### Spacing

Projekt používá **4px grid systém** Tailwindu s custom 90px spacingem.

```css
--spacing-90: 90px;
```

**Použití:**
```tsx
<div className="space-y-90">  {/* 90px vertical spacing */}
  <section>...</section>
  <section>...</section>
</div>
```

**Běžné spacing hodnoty:**
```tsx
<div className="p-6">     {/* 24px */}
<div className="py-24">   {/* 96px vertical */}
<div className="mb-32">   {/* 128px bottom margin */}
<div className="gap-20">  {/* 80px gap */}
```

---

### Shadows

Okare-inspired soft shadows:

```css
--shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-elevated: 0 10px 24px rgba(0, 0, 0, 0.12);
```

**Tailwind shadows:**
```tsx
<div className="shadow-sm">      {/* Jemný stín */}
<div className="shadow-lg">      {/* Větší stín */}
<div className="shadow-2xl">     {/* Masivní stín - pro karty, modály */}
```

**Custom shadow (glassmorphism):**
```tsx
<div
  style={{
    boxShadow: '0 12px 40px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.6)'
  }}
>
```

---

### Border Radius

```css
--radius-xl: 2.5rem;   /* 40px */
--radius-lg: 1.75rem;  /* 28px */
--radius: 0.625rem;    /* 10px */
```

**Použití:**
```tsx
<div className="rounded-2xl">  {/* 16px - nejčastější pro karty */}
<div className="rounded-3xl">  {/* 24px - pro velké sekce */}
<div className="rounded-full"> {/* Pills, buttony */}
```

---

### Container

```css
--container-max-width: 1250px;
```

**Container komponenta:**
```tsx
// src/components/ui/Container.tsx
<div className="mx-auto max-w-[1250px] px-6">
  {children}
</div>
```

**Breakpoints:**
```tsx
px-4       // Mobile (16px)
sm:px-6    // Small+ (24px)
lg:px-8    // Large+ (32px)
```

---

## Tailwind Configuration

### @theme Direktiva

Vše je definováno v `globals.css` pomocí `@theme` direktivy (Tailwind 4 pattern):

```css
@theme {
  /* Colors */
  --color-slate-50: #fbfbfb;
  /* ... */

  /* Spacing */
  --spacing-90: 90px;

  /* Shadows */
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.06);

  /* Container */
  --container-max-width: 1250px;
}
```

### Custom Variants

```css
@custom-variant dark (&:is(.dark *));
```

**Použití dark mode:**
```tsx
<div className="bg-white dark:bg-slate-900">
  {/* Bílé pozadí v light, černé v dark */}
</div>
```

---

## CSS Variables

### Inline Theme Variables

Kromě `@theme`, projekt používá i `:root` CSS variables pro runtime manipulaci:

```css
:root {
  --font-sans: var(--font-inter);
  --radius-xl: 2.5rem;
  --radius-lg: 1.75rem;
  --radius: 0.625rem;

  /* OKLCH colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}
```

**Použití v komponentách:**
```tsx
<div style={{ borderRadius: 'var(--radius-lg)' }}>
```

---

## Component Styling Patterns

### Glassmorphism Effect

Nejčastěji používaný efekt v projektu (Navbar, BookingModal, VoucherModal):

```tsx
<div className="
  backdrop-blur-3xl
  bg-white/25
  border border-white/40
  shadow-2xl
">
  Obsah s glass efektem
</div>
```

**Pokročilý glass (s gradientem):**
```tsx
<div
  className="backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/30"
  style={{
    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
    boxShadow: '0 12px 40px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.6)',
  }}
>
```

**Vrstvy (Navbar pattern):**
```tsx
<div className="relative">
  {/* Glass background */}
  <div className="backdrop-blur-3xl bg-white/40 rounded-full border border-black/10" />

  {/* Vrchní glass vrstvy */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/5 pointer-events-none" />
  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />

  {/* Content */}
  <div className="relative z-10">
    Content
  </div>
</div>
```

---

### Card Pattern

Standardní karta komponenta:

```tsx
<div className="
  rounded-2xl
  border border-slate-200
  bg-white
  p-8
  shadow-sm
  hover:shadow-2xl
  transition-all
  duration-300
">
  <h3 className="text-xl font-semibold text-slate-900 mb-4">
    Nadpis
  </h3>
  <p className="text-slate-600 leading-relaxed">
    Popis
  </p>
</div>
```

---

### Button Patterns

**Primary CTA:**
```tsx
<button className="
  rounded-full
  bg-slate-900
  px-8 py-4
  text-sm font-medium text-white
  transition-all duration-300
  hover:bg-slate-800
  hover:shadow-lg
">
  Call to Action
</button>
```

**Outline:**
```tsx
<button className="
  rounded-full
  border border-slate-200
  px-6 py-3
  text-sm text-slate-900
  hover:border-slate-900
  hover:bg-slate-50
  transition-all
">
  Secondary Action
</button>
```

**Glass Button:**
```tsx
<button className="
  backdrop-blur-xl
  bg-white/25
  border border-white/50
  text-white
  rounded-2xl
  px-6 py-4
  hover:bg-white/35
  transition-all
">
  Glass Button
</button>
```

---

### Input Field Pattern

```tsx
<input
  type="text"
  className="
    w-full
    px-5 py-4
    rounded-2xl
    border border-slate-200
    bg-white
    text-slate-900
    placeholder-slate-400
    transition-all
    focus:border-slate-900
    focus:outline-none
    focus:ring-2
    focus:ring-slate-900/10
  "
  placeholder="Jméno a příjmení"
/>
```

**Glass Input (v modálech):**
```tsx
<input className="
  w-full px-5 py-4
  bg-white/20
  backdrop-blur-xl
  border border-white/40
  rounded-2xl
  text-white
  placeholder-white/70
  focus:outline-none
  focus:border-white/60
  focus:bg-white/25
  shadow-lg
" />
```

---

### Hero Section Pattern

```tsx
<section className="relative min-h-screen overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image src="..." fill className="object-cover" />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

  {/* Content */}
  <div className="relative z-10 flex items-center min-h-screen px-6">
    <Container>
      <h1 className="text-6xl font-light text-white mb-6">
        Hero Headline
      </h1>
      <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
        Popis
      </p>
    </Container>
  </div>
</section>
```

---

## Utility-First Approach

### Spacing Utilities

```tsx
// Padding
<div className="p-8">        {/* 32px all sides */}
<div className="px-6 py-24"> {/* 24px horizontal, 96px vertical */}

// Margin
<div className="mb-12">      {/* 48px bottom */}
<div className="mt-32">      {/* 128px top */}

// Gap (pro flex/grid)
<div className="flex gap-8"> {/* 32px gap */}
<div className="space-y-12"> {/* 48px vertical spacing mezi dětmi */}
```

### Text Utilities

```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
  Responsive heading
</h1>

<p className="text-sm text-slate-600 leading-relaxed">
  Small text
</p>

<p className="text-base md:text-lg text-slate-700 leading-7">
  Body text
</p>
```

### Layout Utilities

```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Centering
<div className="flex items-center justify-center min-h-screen">

// Absolute positioning
<div className="absolute inset-0">  {/* top-0 right-0 bottom-0 left-0 */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
```

---

## Responsive Design

### Breakpoints

Tailwind default breakpoints:

```
sm: 640px   // Small devices
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large
2xl: 1536px // 2X Extra large
```

### Mobile-First Approach

```tsx
<div className="
  text-2xl       {/* Mobile: 24px */}
  md:text-4xl    {/* Tablet+: 36px */}
  lg:text-6xl    {/* Desktop+: 60px */}
">
  Responsive Text
</div>
```

### Common Responsive Patterns

**Hide on mobile, show on desktop:**
```tsx
<div className="hidden lg:block">
  Desktop only
</div>
```

**Show on mobile, hide on desktop:**
```tsx
<div className="lg:hidden">
  Mobile only
</div>
```

**Responsive grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 column mobile, 2 tablet, 4 desktop */}
</div>
```

**Responsive padding:**
```tsx
<div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
  Content
</div>
```

---

## Animations & Effects

### Tailwind Transitions

```tsx
// Duration
<div className="transition-all duration-300">  {/* 300ms */}
<div className="transition-colors duration-500"> {/* Only colors */}

// Easing
<div className="transition ease-in-out">
<div className="transition ease-out">

// Hover
<button className="hover:bg-slate-900 hover:shadow-lg transition-all">
```

### Transform Utilities

```tsx
// Scale
<div className="hover:scale-105 transition-transform">

// Translate
<div className="hover:-translate-y-1 transition-transform">

// Rotate
<div className="hover:rotate-6 transition-transform">
```

### GSAP Animations

Pro složitější animace použít GSAP (viz [Component Catalog](/docs/06-components/component-catalog.md)):

```tsx
import gsap from 'gsap'

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.animate', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
  }, ref)

  return () => ctx.revert()
}, [])
```

---

### Custom Animations (globals.css)

```css
@keyframes fade {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes loader-spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: loader-spin 1s linear infinite;
}
```

**Tailwind animate utilities:**
```tsx
<div className="animate-bounce">  {/* Built-in bounce */}
<div className="animate-pulse">   {/* Built-in pulse */}
<div className="animate-spin">    {/* Built-in spin */}
```

---

## Global Styles

`src/app/globals.css` obsahuje:

```css
/* stylelint-disable at-rule-no-unknown */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  /* Design tokens */
}

:root {
  /* CSS variables */
}

@layer base {
  html {
    @apply scroll-smooth;
  }
  body {
    @apply bg-white text-black font-sans text-base leading-7 antialiased;
  }

  /* Typography */
  h1 { @apply text-4xl md:text-5xl lg:text-6xl font-light tracking-tight; }
  /* ... */

  /* Accessibility: Focus states */
  *:focus-visible {
    @apply outline outline-2 outline-offset-2 outline-slate-900 ring-0;
  }
}

@layer utilities {
  .scrollbar-hide {
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* Dark mode */
.dark {
  --background: oklch(0.145 0 0);
  /* ... */
}
```

---

## Best Practices

### 1. Využívat `cn()` Utility

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  className  // Props override
)}>
```

### 2. Extract Opakující se Styly do Komponent

Místo:
```tsx
// ❌ Opakující se napříč projektem
<button className="rounded-full bg-slate-900 px-8 py-4 text-white hover:bg-slate-800 transition-all">
```

Použít:
```tsx
// ✅ Button komponenta
<Button variant="primary" size="lg">Click</Button>
```

### 3. Konzistentní Spacing

```tsx
// ✅ Používat spacing scale
<div className="mb-6">     // 24px
<div className="mb-12">    // 48px
<div className="mb-24">    // 96px

// ❌ Vyhýbat se arbitrary values
<div className="mb-[37px]">
```

### 4. Responsive Design

```tsx
// ✅ Mobile-first
<div className="text-2xl md:text-4xl lg:text-6xl">

// ❌ Desktop-first
<div className="text-6xl lg:text-4xl md:text-2xl">
```

### 5. Performance - Lazy Load Heavy Components

```tsx
const GallerySection = dynamic(() => import('@/components/GallerySection'), {
  loading: () => <div>Loading...</div>
})
```

### 6. Accessibility

```tsx
// Focus states
<button className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900">

// Screen reader only
<span className="sr-only">Detaily</span>

// ARIA labels
<button aria-label="Zavřít modal">
  <X />
</button>
```

### 7. Dark Mode Připravenost

I když projekt momentálně nepoužívá dark mode, styly jsou připravené:

```tsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
```

### 8. Glassmorphism Layers

Pro správnou hloubku:

```tsx
<div className="relative">
  {/* Base glass */}
  <div className="backdrop-blur-3xl bg-white/40" />

  {/* Top highlight */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5 pointer-events-none" />

  {/* Bottom glow */}
  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />

  {/* Content */}
  <div className="relative z-10">...</div>
</div>
```

---

## Troubleshooting

### Tailwind Třídy se Neaplikují

1. **Zkontrolovat PostCSS config:** `@tailwindcss/postcss` musí být v `postcss.config.mjs`
2. **Purge:** Ujistit se, že soubor je v content path (v Tailwind 4 automatické)
3. **Reload dev server:** `bun run dev`

### Dark Mode Nefunguje

Zkontrolovat, že:
- `@custom-variant dark (&:is(.dark *))` je v `globals.css`
- Používáte `dark:` prefix

### Custom Fonts se Nenačítají

```tsx
// ✅ Přidat variable do body
<body className={`${inter.variable} ${instrumentSerif.variable} font-sans`}>
```

---

## Závěr

SW Beauty používá moderní Tailwind CSS 4 s quiet luxury designem:
- **Monochromatická paleta** (černá, bílá, šedá)
- **Glassmorphism efekty** pro premium feel
- **OKLCH color space** pro přesné barvy
- **Mobile-first responsive design**
- **GSAP pro pokročilé animace**

**Související dokumentace:**
- [Component Catalog](/docs/06-components/component-catalog.md)
- [Architecture Overview](/docs/02-architecture/overview.md)
