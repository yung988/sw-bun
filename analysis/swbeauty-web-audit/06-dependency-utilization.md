# Plán využití nainstalovaných závislostí

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Přehled nepoužitých závislostí

| Závislost | Verze | Velikost | Účel | Status |
|-----------|-------|----------|------|--------|
| **framer-motion** | 12.23.22 | ~30 KB | Animace a transitions | ⚠️ NEPOUŽITO |
| **next-themes** | 0.4.6 | ~2 KB | Dark/Light mode | ⚠️ NEPOUŽITO |
| **papaparse** | 5.5.3 | ~15 KB | CSV parsing | ⚠️ NEPOUŽITO |

**Celkem:** ~47 KB nepoužitého kódu v bundle

---

## 2. Framer Motion - Implementační plán

### 2.1 Co je Framer Motion?
Nejpopulárnější animační knihovna pro React s deklarativním API.

### 2.2 Kde použít animace

#### A) Fade-in animace při scrollu
**Umístění:** Všechny sekce na homepage

**Implementace:**
```typescript
// src/components/FadeIn.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

type FadeInProps = {
  children: React.ReactNode
  delay?: number
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
```

**Použití:**
```typescript
// app/page.tsx
import FadeIn from '@/components/FadeIn'

export default function Home() {
  return (
    <main>
      <FadeIn>
        <section id="highlights">
          {/* Obsah sekce */}
        </section>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <section id="why">
          {/* Obsah sekce */}
        </section>
      </FadeIn>
    </main>
  )
}
```

**Odhad času:** 2 hodiny  
**Dopad:** Výrazně lepší UX, profesionálnější vzhled

---

#### B) Hover animace na kartách
**Umístění:** ProductCard, BlogCard, TestimonialCard

**Implementace:**
```typescript
// src/components/ProductCard.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  image: string
  title: string
  price: number
  category: string
  href: string
}

export default function ProductCard({ image, title, price, category, href }: ProductCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-2xl border border-faint bg-white shadow-sm"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover" 
            />
          </motion.div>
        </div>
        
        <div className="p-6">
          <span className="text-xs uppercase tracking-wider text-slate-500">
            {category}
          </span>
          <h3 className="mt-2 text-xl font-medium text-slate-900">{title}</h3>
          <p className="mt-4 text-2xl font-light text-slate-900">
            {price.toLocaleString('cs-CZ')} Kč
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
```

**Odhad času:** 1 hodina  
**Dopad:** Interaktivnější UI, lepší feedback

---

#### C) Stagger animace pro seznamy
**Umístění:** FAQ, Testimonials, Services grid

**Implementace:**
```typescript
// src/components/StaggerContainer.tsx
'use client'
import { motion } from 'framer-motion'

type StaggerContainerProps = {
  children: React.ReactNode
  className?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Použití:**
```typescript
// app/page.tsx
<StaggerContainer className="grid gap-8 md:grid-cols-3">
  {blogPosts.map((post) => (
    <BlogCard key={post.title} {...post} />
  ))}
</StaggerContainer>
```

**Odhad času:** 1.5 hodiny  
**Dopad:** Elegantní animace při načítání obsahu

---

#### D) Modal/Dialog animace
**Umístění:** Budoucí modaly (např. galerie obrázků)

**Implementace:**
```typescript
// src/components/Modal.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Odhad času:** 1 hodina  
**Dopad:** Připraveno pro budoucí funkce

---

#### E) Page transitions
**Umístění:** Mezi stránkami

**Implementace:**
```typescript
// src/components/PageTransition.tsx
'use client'
import { motion } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

**Použití:**
```typescript
// app/layout.tsx
import PageTransition from '@/components/PageTransition'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScroll />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
```

**Odhad času:** 30 minut  
**Dopad:** Plynulé přechody mezi stránkami

---

### 2.3 Framer Motion - Celkový plán

| Funkce | Priorita | Čas | Dopad |
|--------|----------|-----|-------|
| Fade-in při scrollu | 🔥 Vysoká | 2h | Vysoký |
| Hover animace | 🔥 Vysoká | 1h | Střední |
| Stagger animace | 🟡 Střední | 1.5h | Střední |
| Modal animace | 🟢 Nízká | 1h | Nízký |
| Page transitions | 🟢 Nízká | 30min | Nízký |

**Celkem:** ~6 hodin  
**Doporučení:** Začít s fade-in a hover animacemi

---

## 3. Next-themes - Dark Mode

### 3.1 Co je next-themes?
Nejlepší knihovna pro dark/light mode v Next.js s automatickou synchronizací.

### 3.2 Implementace

#### A) Setup ThemeProvider
```typescript
// src/components/ThemeProvider.tsx
'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

```typescript
// app/layout.tsx
import ThemeProvider from '@/components/ThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

#### B) Theme Toggle komponenta
```typescript
// src/components/ThemeToggle.tsx
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}
```

---

#### C) Přidat do Navbar
```typescript
// src/components/Navbar.tsx
import ThemeToggle from '@/components/ThemeToggle'

export default function Navbar() {
  return (
    <header>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/">Logo</Link>
        <nav>...</nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://instagram.com">IG</a>
        </div>
      </div>
    </header>
  )
}
```

---

#### D) Dark mode styly v Tailwind
```typescript
// tailwind.config.ts
export default {
  darkMode: 'class', // Důležité!
  theme: {
    extend: {
      colors: {
        sand: "#f8f6f2",
        graphite: "#0f172a",
      },
    },
  },
}
```

```css
/* globals.css */
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0f172a;
}

.dark {
  --background: #0f172a;
  --foreground: #f8f6f2;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

---

#### E) Použití dark mode v komponentách
```typescript
// Příklad: Navbar s dark mode
<header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
  <nav className="text-slate-600 dark:text-slate-300">
    ...
  </nav>
</header>

// Příklad: Card s dark mode
<div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
  <h3 className="text-slate-900 dark:text-white">Nadpis</h3>
  <p className="text-slate-600 dark:text-slate-400">Text</p>
</div>
```

---

### 3.3 Dark Mode - Celkový plán

| Úkol | Priorita | Čas | Dopad |
|------|----------|-----|-------|
| Setup ThemeProvider | 🔥 Vysoká | 30min | - |
| Theme Toggle komponenta | 🔥 Vysoká | 30min | Vysoký |
| Dark mode styly - Navbar | 🔥 Vysoká | 30min | Vysoký |
| Dark mode styly - Homepage | 🟡 Střední | 2h | Vysoký |
| Dark mode styly - Ostatní stránky | 🟡 Střední | 2h | Střední |
| Testování a ladění | 🟡 Střední | 1h | - |

**Celkem:** ~6.5 hodin  
**Doporučení:** Implementovat postupně, začít s Navbar a Homepage

---

## 4. Papaparse - CSV Parsing

### 4.1 Co je papaparse?
Nejlepší CSV parser pro JavaScript s robustním error handlingem.

### 4.2 Proč použít místo custom parseru?

**Výhody papaparse:**
- ✅ Robustní error handling
- ✅ Automatická detekce delimiteru
- ✅ Podpora různých encodingů
- ✅ Streaming pro velké soubory
- ✅ TypeScript typy
- ✅ Validace dat

**Nevýhody custom parseru:**
- ⚠️ Žádný error handling
- ⚠️ Může selhat na edge cases
- ⚠️ Těžší údržba

### 4.3 Implementace

#### A) Refaktorovat API endpoint
```typescript
// src/app/api/pricelist/route.ts
import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import Papa from "papaparse"

export type PriceItem = {
  CategoryId: string
  CategoryName: string
  PackageName: string
  Price: string
  Sessions: string
  Description: string
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "pricelist.csv")
    const csvContent = await fs.readFile(filePath, "utf-8")
    
    const result = Papa.parse<PriceItem>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
    })
    
    // Error handling
    if (result.errors.length > 0) {
      console.error("CSV parsing errors:", result.errors)
      return NextResponse.json(
        { error: "CSV parsing failed", details: result.errors },
        { status: 500 }
      )
    }
    
    // Validace dat
    const validItems = result.data.filter((item) => {
      return item.CategoryId || item.CategoryName || item.PackageName
    })
    
    return NextResponse.json(validItems)
  } catch (error) {
    console.error("Failed to load pricelist:", error)
    return NextResponse.json(
      { error: "Failed to load pricelist" },
      { status: 500 }
    )
  }
}
```

---

#### B) Přidat TypeScript typy
```typescript
// src/types/index.ts
export type PriceItem = {
  CategoryId: string
  CategoryName: string
  PackageName: string
  Price: string
  Sessions: string
  Description: string
}

export type PricelistResponse = PriceItem[]

export type PricelistError = {
  error: string
  details?: Papa.ParseError[]
}
```

---

#### C) Použití v komponentách
```typescript
// app/cenik/page.tsx
'use client'
import { useState, useEffect } from 'react'
import type { PriceItem, PricelistError } from '@/types'

export default function CenikPage() {
  const [items, setItems] = useState<PriceItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data: PriceItem[] | PricelistError) => {
        if ('error' in data) {
          setError(data.error)
        } else {
          setItems(data)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Načítání...</div>
  if (error) return <div>Chyba: {error}</div>

  return (
    <main>
      {/* Render items */}
    </main>
  )
}
```

---

### 4.4 Papaparse - Celkový plán

| Úkol | Priorita | Čas | Dopad |
|------|----------|-----|-------|
| Refaktorovat API endpoint | 🟡 Střední | 1h | Střední |
| Přidat TypeScript typy | 🟡 Střední | 30min | Střední |
| Přidat error handling | 🟡 Střední | 30min | Střední |
| Testování | 🟢 Nízká | 30min | - |

**Celkem:** ~2.5 hodiny  
**Doporučení:** Implementovat, pokud plánujete složitější CSV nebo více dat

---

## 5. Celkový implementační plán

### 5.1 Fáze 1: Quick Wins (3-4 hodiny)
```
✅ Framer Motion - Fade-in animace (2h)
✅ Framer Motion - Hover efekty (1h)
✅ Next-themes - Setup + Toggle (1h)
```

**Výsledek:** Výrazně lepší UX s minimálním úsilím

---

### 5.2 Fáze 2: Dark Mode (6-7 hodin)
```
✅ Dark mode styly - Navbar (30min)
✅ Dark mode styly - Homepage (2h)
✅ Dark mode styly - Služby (1.5h)
✅ Dark mode styly - Blog (1h)
✅ Dark mode styly - Ceník (1h)
✅ Testování a ladění (1h)
```

**Výsledek:** Kompletní dark mode

---

### 5.3 Fáze 3: Pokročilé animace (4-5 hodin)
```
✅ Stagger animace (1.5h)
✅ Page transitions (30min)
✅ Modal animace (1h)
✅ Scroll-triggered animace (1.5h)
✅ Testování (30min)
```

**Výsledek:** Profesionální animace na celém webu

---

### 5.4 Fáze 4: Papaparse (2-3 hodiny)
```
✅ Refaktorovat API (1h)
✅ Přidat typy a error handling (1h)
✅ Testování (30min)
```

**Výsledek:** Robustnější CSV parsing

---

## 6. Prioritizace

### 6.1 Doporučené pořadí

1. **Framer Motion - Základní animace** (3h)
   - Nejvyšší dopad na UX
   - Relativně snadné
   - Okamžitě viditelné

2. **Next-themes - Dark Mode** (7h)
   - Moderní feature
   - Uživatelé to oceňují
   - Střední náročnost

3. **Framer Motion - Pokročilé** (4h)
   - Vylepšení nad rámec základu
   - Nice-to-have

4. **Papaparse** (2.5h)
   - Nejnižší priorita
   - Current parser funguje
   - Implementovat jen pokud plánujete složitější data

---

### 6.2 Minimální implementace (3 hodiny)

Pokud máte omezený čas, implementujte pouze:

```
✅ Framer Motion - Fade-in (2h)
✅ Framer Motion - Hover (1h)
```

**Výsledek:** 80% benefitu za 20% času

---

### 6.3 Optimální implementace (10 hodin)

Pro nejlepší výsledek:

```
✅ Framer Motion - Základní (3h)
✅ Next-themes - Setup + Navbar (1h)
✅ Dark mode - Homepage (2h)
✅ Dark mode - Ostatní stránky (3h)
✅ Testování (1h)
```

**Výsledek:** Moderní, animovaný web s dark mode

---

## 7. Závěr

### 7.1 Shrnutí

| Závislost | Priorita | Čas | ROI |
|-----------|----------|-----|-----|
| **Framer Motion** | 🔥 Vysoká | 3-7h | Vysoký |
| **Next-themes** | 🟡 Střední | 7h | Střední |
| **Papaparse** | 🟢 Nízká | 2.5h | Nízký |

### 7.2 Doporučení

**Určitě implementovat:**
- ✅ Framer Motion základní animace (3h)
- ✅ Next-themes dark mode (7h)

**Volitelné:**
- 🤔 Framer Motion pokročilé (4h)
- 🤔 Papaparse refaktoring (2.5h)

**Celkový odhad:** 10-16.5 hodin

### 7.3 Očekávaný výsledek

Po implementaci bude web:
- ✨ Animovaný a interaktivní
- 🌙 S dark mode podporou
- 🚀 Profesionálnější vzhled
- 💯 Lepší UX

**Zvýšení kvality:** 6/10 → 9/10