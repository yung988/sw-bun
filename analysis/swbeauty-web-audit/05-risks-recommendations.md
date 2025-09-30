# Rizika a doporučení

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Identifikovaná rizika

### 1.1 Kritická rizika 🔴

#### R1: Chybějící SEO metadata
**Popis:** Žádná stránka nemá title, description ani Open Graph tags

**Dopad:**
- Nízká viditelnost ve vyhledávačích
- Špatné zobrazení při sdílení na sociálních sítích
- Ztráta potenciálních klientů

**Pravděpodobnost:** 100% (již se děje)

**Řešení:**
```typescript
// Přidat do každé page.tsx
export const metadata = {
  title: 'SW Beauty - Profesionální kosmetický salon',
  description: '...',
  openGraph: { ... }
}
```

**Priorita:** ⚡ OKAMŽITÁ

---

#### R2: Nepoužité závislosti v bundle
**Popis:** 43% production závislostí není použito (framer-motion, next-themes, papaparse)

**Dopad:**
- Větší bundle size (~47 KB navíc)
- Pomalejší načítání stránky
- Zbytečné náklady na bandwidth

**Pravděpodobnost:** 100% (již se děje)

**Řešení:**
```bash
bun remove framer-motion next-themes papaparse
```

**Priorita:** 🔥 VYSOKÁ

---

#### R3: Hardcoded data v komponentách
**Popis:** Homepage má 457 řádků s hardcoded daty (testimonials, FAQ, blog posts)

**Dopad:**
- Těžká údržba
- Riziko chyb při editaci
- Nemožnost delegovat editaci obsahu

**Pravděpodobnost:** 80% (problémy při budoucích změnách)

**Řešení:**
```typescript
// Přesunout data do samostatných souborů
src/data/
  ├── testimonials.ts
  ├── faqs.ts
  ├── services.ts
  └── blog-posts.ts
```

**Priorita:** 🔥 VYSOKÁ

---

### 1.2 Střední rizika 🟡

#### R4: Duplicitní TypeScript typy
**Popis:** `PriceItem` typ je definován 3x v různých souborech

**Dopad:**
- Riziko nekonzistence
- Těžší refaktoring
- Možné runtime chyby

**Pravděpodobnost:** 60%

**Řešení:**
```typescript
// Vytvořit src/types/index.ts
export type PriceItem = {
  CategoryId: string;
  CategoryName: string;
  PackageName: string;
  Price: string;
  Sessions: string;
  Description: string;
}
```

**Priorita:** 🟡 STŘEDNÍ

---

#### R5: Mailto formuláře bez validace
**Popis:** Formuláře používají pouze mailto: protokol

**Dopad:**
- Uživatelé bez email klienta nemohou odeslat
- Žádné potvrzení o odeslání
- Možný spam (bez CAPTCHA)
- Ztráta leadů

**Pravděpodobnost:** 40% (někteří uživatelé nemohou odeslat)

**Poznámka:** Backend nebude implementován (nezaplaceno klientkou)

**Alternativní řešení:**
1. **Formspree** (zdarma do 50 zpráv/měsíc)
2. **Netlify Forms** (pokud deploy na Netlify)
3. **Google Forms** (embed)
4. **Tally.so** (moderní, zdarma)

**Priorita:** 🟡 STŘEDNÍ

---

#### R6: Chybí robots.txt a sitemap.xml
**Popis:** Žádný robots.txt ani sitemap pro vyhledávače

**Dopad:**
- Horší indexace stránek
- Vyhledávače neví, co indexovat
- Ztráta SEO potenciálu

**Pravděpodobnost:** 100% (již se děje)

**Řešení:**
```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://swbeauty.cz/sitemap.xml',
  }
}

// app/sitemap.ts
export default function sitemap() {
  return [
    { url: 'https://swbeauty.cz', lastModified: new Date() },
    { url: 'https://swbeauty.cz/cenik', lastModified: new Date() },
    // ...
  ]
}
```

**Priorita:** 🟡 STŘEDNÍ

---

#### R7: Neoptimalizované obrázky
**Popis:** Originální obrázky mohou být velké (není ověřeno)

**Dopad:**
- Pomalé načítání stránky
- Vysoká spotřeba dat
- Horší Core Web Vitals

**Pravděpodobnost:** 50%

**Řešení:**
1. Zkontrolovat velikost obrázků v `/public/images/`
2. Optimalizovat pomocí ImageOptim, Squoosh nebo TinyPNG
3. Použít WebP formát kde je to možné

**Priorita:** 🟡 STŘEDNÍ

---

### 1.3 Nízká rizika 🟢

#### R8: Nepoužité proměnné v kódu
**Popis:** `heroHighlights` a `trustedFaces` jsou deklarovány, ale nepoužity

**Dopad:**
- Zbytečný kód v bundle
- Matoucí pro vývojáře

**Pravděpodobnost:** 100% (již se děje)

**Řešení:**
```typescript
// Odstranit nebo použít
const heroHighlights = [...]; // ODSTRANIT
const trustedFaces = [...];   // ODSTRANIT
```

**Priorita:** 🟢 NÍZKÁ

---

#### R9: Chybí error boundaries
**Popis:** Žádné error boundaries pro zachycení runtime chyb

**Dopad:**
- Celá aplikace spadne při chybě
- Špatná UX
- Ztráta uživatelů

**Pravděpodobnost:** 20%

**Řešení:**
```typescript
// app/error.tsx
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Něco se pokazilo!</h2>
      <button onClick={reset}>Zkusit znovu</button>
    </div>
  )
}
```

**Priorita:** 🟢 NÍZKÁ

---

#### R10: Chybí loading states
**Popis:** Žádné loading skeletons při načítání dat

**Dopad:**
- Uživatel neví, že se něco děje
- Horší UX
- Možné CLS (layout shift)

**Pravděpodobnost:** 30%

**Řešení:**
```typescript
// app/cenik/loading.tsx
export default function Loading() {
  return <div>Načítání ceníku...</div>
}
```

**Priorita:** 🟢 NÍZKÁ

---

## 2. Technický dluh

### 2.1 Aktuální technický dluh

| Položka | Závažnost | Úsilí | Dopad |
|---------|-----------|-------|-------|
| Chybějící SEO metadata | 🔴 Kritická | 2h | Vysoký |
| Nepoužité závislosti | 🔴 Kritická | 15min | Střední |
| Hardcoded data | 🔴 Kritická | 4h | Vysoký |
| Duplicitní typy | 🟡 Střední | 1h | Střední |
| Mailto formuláře | 🟡 Střední | 2h | Střední |
| Chybí robots.txt | 🟡 Střední | 30min | Střední |
| Neoptimalizované obrázky | 🟡 Střední | 2h | Střední |
| Nepoužité proměnné | 🟢 Nízká | 5min | Nízký |
| Chybí error boundaries | 🟢 Nízká | 1h | Nízký |
| Chybí loading states | 🟢 Nízká | 2h | Nízký |

**Celkový odhad:** ~15 hodin práce

---

### 2.2 Prioritizace

#### Sprint 1 (Kritické - 6.5h)
1. ✅ Přidat SEO metadata (2h)
2. ✅ Odstranit nepoužité závislosti (15min)
3. ✅ Refaktorovat hardcoded data (4h)
4. ✅ Vytvořit robots.txt a sitemap (30min)

#### Sprint 2 (Důležité - 5h)
1. ✅ Vytvořit sdílené typy (1h)
2. ✅ Implementovat alternativu k mailto (2h)
3. ✅ Optimalizovat obrázky (2h)

#### Sprint 3 (Nice-to-have - 3.5h)
1. ✅ Odstranit nepoužité proměnné (5min)
2. ✅ Přidat error boundaries (1h)
3. ✅ Přidat loading states (2h)
4. ✅ Přidat animace (30min)

---

## 3. Bezpečnostní rizika

### 3.1 Aktuální stav
**✅ Dobré:**
- Žádné citlivé API klíče v kódu
- Žádné SQL injection rizika (není databáze)
- Žádné XSS rizika (React escapuje automaticky)
- HTTPS (předpokládáno při deployi)

**⚠️ Potenciální problémy:**
- Mailto formuláře bez CAPTCHA (spam risk)
- Žádná rate limiting na API endpoint
- Chybí Content Security Policy

### 3.2 Doporučení

#### CSP Headers
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

#### Rate Limiting pro API
```typescript
// Middleware pro /api/pricelist
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { success } = await rateLimit(ip)
  
  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }
  
  // ... zbytek kódu
}
```

**Priorita:** 🟢 NÍZKÁ (není kritické pro statický web)

---

## 4. Performance rizika

### 4.1 Potenciální bottlenecky

#### B1: Velké obrázky
**Riziko:** Hero obrázky mohou být 2-5 MB

**Řešení:**
```bash
# Optimalizovat všechny obrázky
find public/images -name "*.jpg" -exec jpegoptim --max=85 {} \;
find public/images -name "*.png" -exec optipng {} \;
```

#### B2: Nepoužité CSS
**Riziko:** Tailwind může generovat velký CSS soubor

**Řešení:**
- Tailwind automaticky purguje nepoužité třídy ✅
- Zkontrolovat výsledný CSS size po buildu

#### B3: JavaScript bundle
**Riziko:** Framer Motion přidává ~30 KB (nepoužito)

**Řešení:**
- Odstranit nepoužité závislosti ✅

---

## 5. Udržovatelnost

### 5.1 Aktuální stav

**✅ Dobré:**
- TypeScript (type safety)
- Komponenty jsou modulární
- Čistá struktura složek
- ESLint konfigurace

**⚠️ Problémy:**
- Chybí dokumentace komponent
- Chybí testy
- Hardcoded data
- Duplicitní kód

### 5.2 Doporučení

#### Dokumentace
```typescript
/**
 * Carousel component for displaying scrollable content
 * 
 * @param children - React nodes to display in carousel
 * @param auto - Enable auto-scroll (default: false)
 * @param autoSpeed - Scroll speed in px/s (default: 30)
 * @param showArrows - Show navigation arrows (default: true)
 * 
 * @example
 * <Carousel auto autoSpeed={40}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Carousel>
 */
export default function Carousel({ ... }) { ... }
```

#### Testy (volitelné)
```typescript
// __tests__/Carousel.test.tsx
import { render, screen } from '@testing-library/react'
import Carousel from '@/components/Carousel'

describe('Carousel', () => {
  it('renders children', () => {
    render(
      <Carousel>
        <div>Item 1</div>
      </Carousel>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})
```

**Priorita:** 🟢 NÍZKÁ (nice-to-have)

---

## 6. Doporučení pro deployment

### 6.1 Hosting platformy

#### Vercel (Doporučeno ⭐)
**Výhody:**
- Nativní Next.js podpora
- Automatický deploy z Git
- Edge functions
- Image optimization
- Analytics zdarma

**Nevýhody:**
- Omezený free tier

**Cena:** Zdarma pro malé projekty

---

#### Netlify
**Výhody:**
- Netlify Forms (alternativa k backendu)
- Automatický deploy
- Edge functions
- Dobrý free tier

**Nevýhody:**
- Horší Next.js podpora než Vercel

**Cena:** Zdarma pro malé projekty

---

#### Cloudflare Pages
**Výhody:**
- Velmi rychlý (CDN)
- Neomezený bandwidth
- Zdarma

**Nevýhody:**
- Složitější konfigurace Next.js

**Cena:** Zdarma

---

### 6.2 Pre-deployment checklist

```markdown
## Před nasazením

### Kritické
- [ ] Přidat SEO metadata na všechny stránky
- [ ] Vytvořit robots.txt a sitemap.xml
- [ ] Odstranit nepoužité závislosti
- [ ] Optimalizovat obrázky
- [ ] Nastavit environment variables (pokud jsou)
- [ ] Otestovat build (`bun run build`)

### Důležité
- [ ] Přidat Google Analytics (pokud požadováno)
- [ ] Nastavit custom doménu
- [ ] Nastavit SSL certifikát
- [ ] Otestovat na mobilních zařízeních
- [ ] Otestovat všechny formuláře

### Nice-to-have
- [ ] Přidat favicon
- [ ] Přidat 404 stránku
- [ ] Přidat loading states
- [ ] Přidat error boundaries
```

---

## 7. Monitoring a analytics

### 7.1 Doporučené nástroje

#### Google Analytics 4 (Zdarma)
```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### Plausible Analytics (Alternativa)
- Privacy-friendly
- Jednodušší než GA4
- Placené ($9/měsíc)

#### Vercel Analytics (Pokud deploy na Vercel)
- Automaticky zahrnuté
- Core Web Vitals
- Real User Monitoring

---

## 8. Akční plán

### 8.1 Okamžitá akce (do 1 týdne)

1. **SEO metadata** (2h)
   ```bash
   # Přidat metadata do všech page.tsx souborů
   - app/page.tsx
   - app/cenik/page.tsx
   - app/sluzby/*/page.tsx
   - app/blog/*/page.tsx
   ```

2. **Odstranit nepoužité závislosti** (15min)
   ```bash
   bun remove framer-motion next-themes papaparse
   ```

3. **Robots.txt a sitemap** (30min)
   ```bash
   # Vytvořit app/robots.ts a app/sitemap.ts
   ```

4. **Odstranit nepoužité proměnné** (5min)
   ```typescript
   // Odstranit heroHighlights a trustedFaces z page.tsx
   ```

**Celkem:** ~3 hodiny

---

### 8.2 Krátkodobé (do 1 měsíce)

1. **Refaktorovat hardcoded data** (4h)
   ```bash
   # Vytvořit src/data/ složku
   # Přesunout data z page.tsx
   ```

2. **Vytvořit sdílené typy** (1h)
   ```bash
   # Vytvořit src/types/index.ts
   ```

3. **Optimalizovat obrázky** (2h)
   ```bash
   # Zkomprimovat všechny obrázky
   ```

4. **Implementovat Formspree** (2h)
   ```bash
   # Nahradit mailto formuláře
   ```

**Celkem:** ~9 hodin

---

### 8.3 Dlouhodobé (do 3 měsíců)

1. **Přidat animace** (4h)
   - Fade-in efekty
   - Scroll animations
   - Hover efekty

2. **Přidat více blog článků** (8h)
   - 5-10 nových článků
   - SEO optimalizace

3. **Implementovat dark mode** (3h)
   - Přidat next-themes zpět
   - Vytvořit dark theme

4. **Přidat testy** (8h)
   - Unit testy pro komponenty
   - E2E testy pro kritické flows

**Celkem:** ~23 hodin

---

## 9. Závěr

### 9.1 Shrnutí rizik

| Kategorie | Počet | Kritická | Střední | Nízká |
|-----------|-------|----------|---------|-------|
| Technická | 10 | 3 | 4 | 3 |
| Bezpečnostní | 3 | 0 | 1 | 2 |
| Performance | 3 | 0 | 2 | 1 |

**Celkem:** 16 identifikovaných rizik

### 9.2 Prioritní akce

1. ⚡ **SEO metadata** - Kritické pro viditelnost
2. ⚡ **Odstranit nepoužité závislosti** - Snadné, okamžitý benefit
3. 🔥 **Refaktorovat hardcoded data** - Důležité pro údržbu
4. 🔥 **Robots.txt a sitemap** - Důležité pro SEO

### 9.3 Celkové hodnocení

**Aktuální stav:** 6/10
- Solidní technický základ
- Hlavní problémy jsou v SEO a údržbě
- Žádná kritická bezpečnostní rizika

**Po implementaci doporučení:** 9/10
- Výborné SEO
- Snadná údržba
- Optimální performance

**Odhad úsilí:** ~35 hodin celkem (všechna doporučení)
**Minimální úsilí:** ~3 hodiny (kritická rizika)