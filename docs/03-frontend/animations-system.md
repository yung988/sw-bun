# Animation System Documentation

**SW Beauty Project - GSAP Animation Architecture**

Version: 1.0
Last Updated: November 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [GSAP Configuration](#gsap-configuration)
3. [Custom Hooks](#custom-hooks)
   - [useGsapReveal](#usegsapreveal)
   - [useGsapParallax](#usegsapparallax)
4. [Animation Components](#animation-components)
   - [CharReveal](#charreveal)
   - [WordReveal](#wordreveal)
   - [ScrollReveal](#scrollreveal)
   - [ImageReveal](#imagereveal)
   - [HorizontalScroll](#horizontalscroll)
   - [NumberCounter](#numbercounter)
   - [PinSection](#pinsection)
   - [SplitReveal](#splitreveal)
   - [FadeIn](#fadein)
5. [Lenis Smooth Scroll](#lenis-smooth-scroll)
6. [Animation Patterns](#animation-patterns)
7. [Performance Best Practices](#performance-best-practices)
8. [Responsive Animations](#responsive-animations)
9. [Testing Animations](#testing-animations)
10. [Quiet Luxury Feel](#quiet-luxury-feel)

---

## Introduction

SW Beauty projekt využívá **GSAP (GreenSock Animation Platform)** pro vytvoření luxusního, smooth animačního systému. Všechny animace jsou navrženy s ohledem na:

- **Quiet luxury aesthetic** - jemné, sofistikované pohyby
- **Performance** - optimalizované pro 60 FPS
- **Accessibility** - respektování `prefers-reduced-motion`
- **Progressive enhancement** - funguje i bez JavaScriptu
- **Responsive** - přizpůsobení různým velikostem obrazovek

**Filozofie animací:**
> "Animace by měly být cítit, ne vidět. Jemné, rychlé, elegantní."

---

## GSAP Configuration

### Setup (`lib/gsap.ts`)

```typescript
'use client'

import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, Flip)
}

export { gsap, ScrollTrigger, CustomEase, Flip }

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export function createGsapContext<T extends Element>(
  ref: React.RefObject<T>,
  fn: () => void
) {
  return gsap.context(fn, ref)
}
```

**Registered Plugins:**
- **ScrollTrigger** - scroll-based animations
- **CustomEase** - custom easing curves
- **Flip** - state-based layout animations

**Helper Functions:**
- `prefersReducedMotion()` - detekce user preference
- `createGsapContext()` - context scoping pro cleanup

---

## Custom Hooks

### useGsapReveal

Scroll-triggered reveal animace s jemným stagger efektem.

**Location:** `src/components/animations/useGsapReveal.ts`

**Signature:**
```typescript
useGsapReveal(
  containerRef: RefObject<HTMLElement>,
  selector?: string // default: '[data-reveal]'
)
```

**Implementation:**
```typescript
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type RefObject, useLayoutEffect } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapReveal(
  containerRef: RefObject<HTMLElement>,
  selector = '[data-reveal]'
) {
  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    // Respektuje "reduced motion"
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector)
      gsap.set(items, { autoAlpha: 0, y: 24 })

      items.forEach((el, i) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.05 * (i % 6), // Jemný místní "stagger"
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [containerRef, selector])
}
```

**Usage Example:**
```tsx
'use client'
import { useRef } from 'react'
import { useGsapReveal } from '@/components/animations/useGsapReveal'

export default function MySection() {
  const containerRef = useRef<HTMLElement>(null)
  useGsapReveal(containerRef)

  return (
    <section ref={containerRef}>
      <div data-reveal>Tento element se animuje</div>
      <div data-reveal>A tento také</div>
      <div data-reveal>S jemným stagger efektem</div>
    </section>
  )
}
```

**Animation Properties:**
- **Initial state:** `opacity: 0`, `y: 24px`
- **Duration:** 800ms
- **Easing:** `power2.out` (smooth deceleration)
- **Stagger:** 50ms per každých 6 elementů
- **Trigger:** when top reaches 85% viewport
- **Once:** true (plays once, doesn't reverse)

**Why `autoAlpha` instead of `opacity`?**
`autoAlpha` je GSAP helper, který kombinuje `opacity` a `visibility` - automaticky nastaví `visibility: hidden` když je opacity 0, což zlepšuje accessibility.

---

### useGsapParallax

Jemný parallax efekt pro obrázky a pozadí.

**Location:** `src/components/animations/useGsapParallax.ts`

**Signature:**
```typescript
useGsapParallax(
  containerRef: RefObject<HTMLElement>,
  selector?: string // default: '[data-parallax]'
)
```

**Implementation:**
```typescript
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type RefObject, useLayoutEffect } from 'react'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export function useGsapParallax(
  containerRef: RefObject<HTMLElement>,
  selector = '[data-parallax]'
) {
  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    const ctx = gsap.context(() => {
      for (const el of gsap.utils.toArray<HTMLElement>(selector)) {
        gsap.fromTo(
          el,
          { yPercent: -3 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      }
    }, root)

    return () => ctx.revert()
  }, [containerRef, selector])
}
```

**Usage Example:**
```tsx
'use client'
import { useRef } from 'react'
import { useGsapParallax } from '@/components/animations/useGsapParallax'

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null)
  useGsapParallax(containerRef)

  return (
    <section ref={containerRef}>
      <img data-parallax src="/photo.jpg" alt="Gallery" />
    </section>
  )
}
```

**Animation Properties:**
- **Movement:** -3% to 0% (subtilní pohyb)
- **Easing:** `none` (linear pro smooth scroll-sync)
- **Scrub:** 0.6 (smooth lag za scrollem)
- **Trigger range:** from bottom entering to top leaving viewport

**Why only -3%?**
Pro "quiet luxury" feel používáme velmi jemný parallax. Větší hodnoty by působily příliš dramaticky.

---

## Animation Components

### CharReveal

Character-by-character reveal animace pro headlines.

**Location:** `src/components/animations/CharReveal.tsx`

**Props:**
```typescript
type CharRevealProps = {
  children: string
  delay?: number      // default: 0
  stagger?: number    // default: 0.02
  className?: string
}
```

**Code:**
```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CharReveal({
  children,
  delay = 0,
  stagger = 0.02,
  className = ''
}: CharRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      if (ref.current) {
        ref.current.style.opacity = '1'
      }
      return
    }

    const element = ref.current
    const chars = element.querySelectorAll('.char')

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [delay, stagger])

  // Split text into characters, preserving spaces
  const chars = children.split('').map((char, index) => {
    const key = char === ' ' ? `space-${index}` : `char-${char}-${index}`
    return (
      <span key={key} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    )
  })

  return (
    <div ref={ref} className={className}>
      {chars}
    </div>
  )
}
```

**Usage:**
```tsx
import CharReveal from '@/components/animations/CharReveal'

<CharReveal className="text-6xl font-light">
  Luxusní péče
</CharReveal>
```

**Best For:**
- Hero headlines
- Important statements
- Short, impactful text (< 30 characters)

**Performance Note:**
Pro dlouhý text (>50 znaků) použij raději `WordReveal` - méně DOM elementů = lepší výkon.

---

### WordReveal

Word-by-word reveal pro delší nadpisy.

**Location:** `src/components/animations/WordReveal.tsx`

**Props:**
```typescript
type WordRevealProps = {
  children: string
  delay?: number      // default: 0
  stagger?: number    // default: 0.05
  className?: string
}
```

**Implementation Highlights:**
```tsx
// Split text into words
const words = children.split(' ')

return (
  <div ref={ref} className={className}>
    {words.map((word, index) => (
      <span key={`word-${index}-${word}`} className="word inline-block mr-[0.25em]">
        {word}
      </span>
    ))}
  </div>
)
```

**Animation:**
```typescript
gsap.from(words, {
  opacity: 0,
  y: 20,
  duration: 0.6,
  delay,
  stagger,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: element,
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
})
```

**Usage:**
```tsx
<WordReveal className="text-4xl" stagger={0.08}>
  Objevte profesionální kosmetické služby v Hodoníně
</WordReveal>
```

**Best For:**
- Subtitles
- Section headings
- Longer text (30-100 characters)

---

### ScrollReveal

Multi-direction scroll reveal s různými efekty.

**Location:** `src/components/animations/ScrollReveal.tsx`

**Props:**
```typescript
type ScrollRevealProps = {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
}
```

**Direction Effects:**
```typescript
const getAnimationProps = () => {
  switch (direction) {
    case 'up':
      return { y: 80, opacity: 0 }
    case 'down':
      return { y: -80, opacity: 0 }
    case 'left':
      return { x: 80, opacity: 0 }
    case 'right':
      return { x: -80, opacity: 0 }
    case 'scale':
      return { scale: 0.8, opacity: 0 }
    case 'rotate':
      return { rotateX: -45, rotateY: 15, opacity: 0, transformPerspective: 1000 }
    default:
      return { y: 80, opacity: 0 }
  }
}
```

**Usage:**
```tsx
<ScrollReveal direction="scale" duration={1.2}>
  <img src="/photo.jpg" alt="..." />
</ScrollReveal>

<ScrollReveal direction="left" delay={0.2}>
  <div>Content slides from left</div>
</ScrollReveal>
```

**Best For:**
- Image reveals
- Card entrances
- Section transitions

---

### ImageReveal

Curtain/wipe reveal efekt pro dramatické image reveals.

**Location:** `src/components/animations/ImageReveal.tsx`

**Props:**
```typescript
type ImageRevealProps = {
  children: ReactNode
  direction?: 'left' | 'right' | 'top' | 'bottom'
  duration?: number    // default: 1.2
  delay?: number       // default: 0
  className?: string
}
```

**Animation Technique:**
```tsx
// Timeline:
// 1. Curtain wipes across (clip-path animation)
// 2. Image scales from 1.1 to 1.0 (parallax effect)

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
})

// Curtain reveal
tl.from(curtain, {
  clipPath: 'inset(0 100% 0 0)', // starts fully hidden
  duration,
  delay,
  ease: 'power3.inOut',
})

// Image scale effect (runs in parallel)
tl.from(image, {
  scale: 1.1,
  duration,
  ease: 'power2.out',
}, '<') // '<' means start at same time as previous
```

**Usage:**
```tsx
<ImageReveal direction="right" duration={1.5}>
  <img src="/hero.jpg" alt="Hero" />
</ImageReveal>
```

**Best For:**
- Hero images
- Gallery photos
- Dramatic section entrances

**Visual Effect:**
Tmavá clona (curtain) se posune přes obrázek a odhalí ho, zatímco obrázek se lehce přiblíží (scale 1.1 → 1.0) pro pocit hloubky.

---

### HorizontalScroll

Horizontální scrollování při vertikálním scrollu - perfektní pro timelines a showcases.

**Location:** `src/components/animations/HorizontalScroll.tsx`

**Props:**
```typescript
type HorizontalScrollProps = {
  children: ReactNode
  speed?: number        // default: 1 (vyšší = delší scroll)
  className?: string
}
```

**Implementation:**
```tsx
const ctx = gsap.context(() => {
  const scrollWidth = scroller.scrollWidth - container.offsetWidth

  gsap.to(scroller, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollWidth * speed}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
}, containerRef)
```

**Usage:**
```tsx
<HorizontalScroll speed={1.5}>
  <div className="flex gap-8">
    <ServiceCard />
    <ServiceCard />
    <ServiceCard />
    <ServiceCard />
  </div>
</HorizontalScroll>
```

**Key Features:**
- **Pin:** Section sticks while scrolling
- **Scrub:** Smooth 1:1 sync with scroll
- **Responsive:** Recalculates on resize
- **Speed control:** Adjust scroll distance

**Best For:**
- Service showcases
- Timelines
- Before/after comparisons
- Portfolio displays

---

### NumberCounter

Animated number counting on scroll - perfektní pro stats.

**Location:** `src/components/animations/NumberCounter.tsx`

**Props:**
```typescript
type NumberCounterProps = {
  number: number
  prefix?: string       // e.g., "$"
  suffix?: string       // e.g., "+"
  duration?: number     // default: 2
  className?: string
}
```

**Animation:**
```typescript
const counter = { value: 0 }

gsap.to(counter, {
  value: number,
  duration,
  ease: 'power2.out',
  onUpdate: () => {
    setDisplayNumber(Math.round(counter.value))
  },
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
})
```

**Usage:**
```tsx
<NumberCounter number={500} suffix="+" className="text-5xl font-light" />
// Displays: 00 → 01 → 02 → ... → 500+

<NumberCounter number={15} prefix="0" className="text-3xl" />
// Displays: 00 → 01 → ... → 015
```

**Best For:**
- Statistics sections
- Customer counts
- Years of experience
- Numbered steps

**Note:** Numbers jsou padded s leading zeros pro konzistentní vizuál.

---

### PinSection

Pin section během scrollování pro sticky effects.

**Location:** `src/components/animations/PinSection.tsx`

**Props:**
```typescript
type PinSectionProps = {
  children: ReactNode
  duration?: number     // duration in viewport heights (default: 1)
  className?: string
}
```

**Usage:**
```tsx
<PinSection duration={2}>
  <div>
    <h2>This section pins for 2 viewport heights</h2>
    <p>While user scrolls...</p>
  </div>
</PinSection>
```

**Best For:**
- Storytelling sections
- Multi-step reveals
- Combined with other animations

---

### SplitReveal

Dramatický center split reveal effect.

**Location:** `src/components/animations/SplitReveal.tsx`

**Props:**
```typescript
type SplitRevealProps = {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
}
```

**Effect:**
Dvě tmavé clony se rozjedou od středu a odhalí obsah, který se současně scale-up a fade-in.

**Usage:**
```tsx
<SplitReveal direction="horizontal">
  <img src="/dramatic-photo.jpg" alt="Reveal" />
</SplitReveal>
```

**Best For:**
- Hero sections
- Chapter transitions
- High-impact reveals

**Warning:** Velmi dramatický efekt - používat šetrně!

---

## Lenis Smooth Scroll

**Location:** `src/components/LenisScroll.tsx`

SW Beauty používá **Lenis** pro buttery-smooth scrollování.

**Setup:**
```tsx
'use client'

import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
```

**Integration with GSAP:**
```typescript
// GSAP automaticky synchronizuje s Lenis
// ScrollTrigger detekuje Lenis a používá jeho scroll events
```

**Configuration:**
- **Duration:** 1.2s - smooth ale ne pomalé
- **Easing:** Custom easing curve pro luxury feel
- **Smooth touch:** Vypnuto (mobile nativní scroll je lepší)
- **Touch multiplier:** 2x (rychlejší na touch devices)

---

## Animation Patterns

### 1. Staggered Grid Reveal

**Pattern:**
```tsx
'use client'
import { useRef } from 'react'
import { useGsapReveal } from '@/components/animations/useGsapReveal'

export default function Grid() {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapReveal(containerRef)

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6">
      <div data-reveal>Card 1</div>
      <div data-reveal>Card 2</div>
      <div data-reveal>Card 3</div>
      <div data-reveal>Card 4</div>
      <div data-reveal>Card 5</div>
      <div data-reveal>Card 6</div>
    </div>
  )
}
```

**Result:** Karty se objeví postupně s 50ms staggerem (modulo 6).

---

### 2. Hero Sequence

**Pattern:**
```tsx
<section className="hero">
  <CharReveal delay={0.2} className="text-6xl">
    Luxusní péče
  </CharReveal>

  <WordReveal delay={0.8} stagger={0.06} className="text-2xl">
    Pro vaši krásu a pohodu
  </WordReveal>

  <ScrollReveal direction="scale" delay={1.4}>
    <OpenBookingButton />
  </ScrollReveal>
</section>
```

**Result:** Koordinovaná sekvence - headline → subtitle → CTA.

---

### 3. Image Gallery with Parallax

**Pattern:**
```tsx
'use client'
import { useRef } from 'react'
import { useGsapReveal } from '@/components/animations/useGsapReveal'
import { useGsapParallax } from '@/components/animations/useGsapParallax'

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapReveal(containerRef)
  useGsapParallax(containerRef)

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4">
      <div data-reveal>
        <img data-parallax src="/1.jpg" />
      </div>
      <div data-reveal>
        <img data-parallax src="/2.jpg" />
      </div>
    </div>
  )
}
```

**Result:** Obrázky se reveal-ují a mají jemný parallax.

---

## Performance Best Practices

### 1. Use `will-change` Sparingly

```css
/* ❌ Špatně - performance hit */
.animated {
  will-change: transform, opacity;
}

/* ✅ Správně - GSAP nastaví automaticky */
/* Nenastavuj manuálně */
```

GSAP automaticky přidá `will-change` během animace a odstraní po dokončení.

---

### 2. Prefer Transform over Top/Left

```typescript
// ❌ Špatně - trigguje layout reflow
gsap.to(element, { left: 100 })

// ✅ Správně - GPU-accelerated
gsap.to(element, { x: 100 })
```

---

### 3. Use `autoAlpha` instead of `opacity`

```typescript
// ❌ Dobré
gsap.to(element, { opacity: 0 })

// ✅ Lepší - nastaví i visibility
gsap.to(element, { autoAlpha: 0 })
```

---

### 4. Cleanup with Context

```tsx
// ✅ Správně - GSAP context pro cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations
  }, ref)

  return () => ctx.revert() // Cleanup!
}, [])
```

---

### 5. Limit Concurrent Animations

```tsx
// ❌ Špatně - příliš mnoho animací najednou
<div>
  {items.map(item => (
    <CharReveal key={item.id}>{item.longText}</CharReveal>
  ))}
</div>

// ✅ Správně - použij WordReveal nebo useGsapReveal
<div ref={containerRef}>
  {items.map(item => (
    <div key={item.id} data-reveal>{item.text}</div>
  ))}
</div>
```

---

## Responsive Animations

### Mobile Adjustments

```tsx
useEffect(() => {
  const isMobile = window.innerWidth < 768

  const ctx = gsap.context(() => {
    gsap.from(element, {
      y: isMobile ? 40 : 80,  // Menší pohyb na mobile
      duration: isMobile ? 0.6 : 0.8,  // Rychlejší na mobile
      // ...
    })
  }, ref)

  return () => ctx.revert()
}, [])
```

---

### Disable Complex Animations on Mobile

```tsx
useEffect(() => {
  const isMobile = window.innerWidth < 768
  if (isMobile) return // Skip complex animation

  // Desktop-only animation
  const ctx = gsap.context(() => {
    // ...
  }, ref)

  return () => ctx.revert()
}, [])
```

---

## Testing Animations

### 1. Reduced Motion Testing

```bash
# Chrome DevTools
# Settings → Rendering → Emulate CSS media feature prefers-reduced-motion
```

**Expected behavior:** Animace by se neměly spustit.

---

### 2. Performance Testing

```typescript
// Measure FPS during animation
const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  stats.begin()
  // animation code
  stats.end()
  requestAnimationFrame(animate)
}
```

**Target:** Udržet 60 FPS (16.67ms per frame).

---

### 3. ScrollTrigger Markers

```typescript
// Development only!
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    markers: true, // Shows visual debugging markers
  }
})
```

---

## Quiet Luxury Feel

### Animation Principles

**1. Subtle Movement**
```typescript
// ❌ Příliš dramatické
gsap.from(element, { y: 200, opacity: 0 })

// ✅ Jemné, sofistikované
gsap.from(element, { y: 24, opacity: 0 })
```

**2. Smooth Easing**
```typescript
// Preferované easing curves:
- 'power2.out'     // Smooth deceleration
- 'power3.out'     // Softer deceleration
- 'power2.inOut'   // Balanced
- 'none'           // Linear (pro scroll-sync)

// Vyvarovat se:
- 'bounce'         // Příliš hravé
- 'elastic'        // Příliš cartoonish
- 'back'           // Může být OK pro malé scale efekty
```

**3. Appropriate Duration**
```typescript
// Timing sweet spots:
- Quick reveals: 0.4-0.6s
- Standard: 0.8-1.0s
- Slow, dramatic: 1.2-1.5s
- Never > 2s (pocit pomalosti)
```

**4. Minimal Stagger**
```typescript
// ✅ Jemný stagger
stagger: 0.05 // 50ms

// ❌ Příliš zřetelný
stagger: 0.2  // 200ms
```

**5. Once is Enough**
```typescript
scrollTrigger: {
  once: true, // ✅ Play once
  // Vyvarovat se opakování - může být rušivé
}
```

---

## Common Patterns by Section Type

### Hero Section
```tsx
<CharReveal delay={0.2}>Headline</CharReveal>
<WordReveal delay={0.8}>Subtitle</WordReveal>
<ScrollReveal direction="scale" delay={1.4}>
  <Button />
</ScrollReveal>
```

### Content Grid
```tsx
const ref = useRef(null)
useGsapReveal(ref)

<div ref={ref}>
  <div data-reveal>Item</div>
  <div data-reveal>Item</div>
</div>
```

### Image Gallery
```tsx
const ref = useRef(null)
useGsapReveal(ref)
useGsapParallax(ref)

<div ref={ref}>
  <img data-reveal data-parallax src="..." />
</div>
```

### Stats Section
```tsx
<NumberCounter number={500} suffix="+" />
<NumberCounter number={15} prefix="0" />
```

---

**Related Documentation:**
- [Components Overview](./components-overview.md)
- [Performance Optimization](../02-architecture/performance.md)
- [Accessibility Guidelines](../02-architecture/accessibility.md)

---

**Last Updated:** November 2025
**Maintainer:** SW Beauty Development Team
