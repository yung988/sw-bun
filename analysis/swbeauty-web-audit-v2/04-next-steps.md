# Doporučené další kroky - SW Beauty V2

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Okamžité akce (0-2 hodiny)

### 1.1 Opravit metadata warningy
**Úkol:** Přidat správné typy pro metadata exporty

**Kroky:**
```typescript
// V každém page.tsx přidat:
import { Metadata } from 'next'

export const metadata: Metadata = {
  // stávající metadata
}
```

**Soubory k úpravě:**
- src/app/page.tsx
- src/app/blog/*/page.tsx (3 soubory)
- src/app/sluzby/*/page.tsx (5 souborů)
- src/app/cenik/page.tsx

**Čas:** 30 minut
**Dopad:** Vyřeší warningy v konzoli

---

### 1.2 Odstranit nepouzitý import
**Úkol:** Odstranit nepouzitý `Slide` import v homepage

**Kroky:**
```typescript
// src/app/page.tsx
// Odstranit řádek:
import { Slide } from '@/components/HeroCarousel'
```

**Čas:** 5 minut
**Dopad:** Čistší kód

---

## 2. Krátkodobé cíle (1 týden)

### 2.1 Implementovat backend pro formuláře (8 hodin)
**Priorita:** KRITICKÁ - business impact

**Možnosti:**

#### Varianta A: Formspree (doporučeno)
```bash
bun add @formspree/react
```

**Výhody:**
- Rychlá implementace (2 hodiny)
- Email notifikace
- Spam protection
- Žádný vlastní backend

**Implementace:**
```typescript
// src/components/ContactForm.tsx
import { useForm } from '@formspree/react'

export default function ContactForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID")

  if (state.succeeded) {
    return <p>Děkujeme za zprávu!</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* formulář fields */}
    </form>
  )
}
```

#### Varianta B: Netlify Forms (1 hodina)
- Pokud deploy na Netlify
- Automatická detekce formulářů
- Email notifikace zdarma

#### Varianta C: Custom Next.js API (8 hodin)
- Plná kontrola
- Email sending (nodemailer)
- Database storage (SQLite/PostgreSQL)

**Doporučení:** Začít s Formspree pro rychlé řešení

---

### 2.2 Přidat error boundaries (1 hodina)
**Priorita:** VYSOKÁ - crash prevention

**Implementace:**
```typescript
// src/components/ErrorBoundary.tsx
'use client'
import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Něco se pokazilo
          </h2>
          <p className="text-slate-600 mb-4">
            Omlouváme se za nepříjemnosti. Zkuste stránku obnovit.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Obnovit stránku
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Použití v layout.tsx:**
```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <LoadingScreen />
            <SmoothScroll />
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

---

### 2.3 Optimalizovat obrázky (2 hodiny)
**Priorita:** STŘEDNÍ - performance

**Nástroje:**
1. **ImageOptim** (macOS) - drag & drop komprese
2. **TinyPNG** - webová komprese
3. **Squoosh** - Google komprese tool

**Obrázky k optimalizaci:**
- Všechny v `/public/images/` (kromě SVG)
- Hero obrázky
- Service obrázky
- Team fotky

**Očekávaný výsledek:**
- 30-50% redukce file size
- Lepší Core Web Vitals
- Rychlejší loading

---

### 2.4 Přidat loading states pro API volání (1 hodina)
**Priorita:** STŘEDNÍ - UX improvement

**Implementace:**
```typescript
// src/components/LoadingSpinner.tsx
export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 ${sizeClasses[size]}`} />
    </div>
  )
}

// Použití v ceník stránce
const [loading, setLoading] = useState(true)
const [prices, setPrices] = useState<PriceItem[]>([])

useEffect(() => {
  fetchPrices()
}, [])

const fetchPrices = async () => {
  try {
    setLoading(true)
    const response = await fetch('/api/pricelist')
    const data = await response.json()
    setPrices(data)
  } catch (error) {
    console.error('Failed to fetch prices:', error)
  } finally {
    setLoading(false)
  }
}

return (
  <div>
    {loading ? (
      <LoadingSpinner />
    ) : (
      <PriceGrid prices={prices} />
    )}
  </div>
)
```

---

## 3. Střednědobé cíle (1 měsíc)

### 3.1 Implementovat Google Analytics (30 minut)
**Priorita:** STŘEDNÍ - data tracking

**Implementace:**
```typescript
// src/components/GoogleAnalytics.tsx
'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  useEffect(() => {
    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    // Track page views
    const handleRouteChange = () => {
      gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }

    // Listen for route changes (Next.js App Router)
    const observer = new MutationObserver(handleRouteChange)
    observer.observe(document.querySelector('title')!, { childList: true })

    return () => {
      document.head.removeChild(script1)
      observer.disconnect()
    }
  }, [GA_MEASUREMENT_ID])

  return null
}
```

**Použití v layout.tsx:**
```typescript
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-XXXXXXXXXX" />
      </head>
      <body>
        {/* zbytek layoutu */}
      </body>
    </html>
  )
}
```

**Alternativa:** Plausible Analytics pro privacy-friendly tracking

---

### 3.2 Vytvořit legal stránky (2 hodiny)
**Priorita:** NÍZKÁ - profesionalismus

**Stránky k vytvoření:**
1. **Obchodní podmínky** (`/obchodni-podminky`)
2. **Ochrana osobních údajů** (`/ochrana-osobnich-udaju`)
3. **Cookies** (`/cookies`)

**Obsah:**
- Kopírovat ze šablony nebo právníka
- Přidat do sitemap.xml
- Opravit footer links

---

### 3.3 Přidat kontaktní stránku (2 hodiny)
**Priorita:** STŘEDNÍ - lepší kontakt

**Funkce:**
- Kontaktní formulář
- Mapa (Google Maps embed)
- Kontaktní informace
- Otevírací hodiny

---

## 4. Dlouhodobé cíle (3 měsíce)

### 4.1 Implementovat CMS pro blog (8 hodin)
**Priorita:** NÍZKÁ - content management

**Možnosti:**

#### Varianta A: Markdown + MDX (doporučeno)
```typescript
// src/app/blog/[slug]/page.tsx
import { getBlogPosts, getBlogPost } from '@/lib/blog'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

#### Varianta B: Sanity CMS (8 hodin)
- Headless CMS
- Rich text editor
- Image management

#### Varianta C: Strapi (12 hodin)
- Self-hosted CMS
- Database included
- REST/GraphQL API

**Doporučení:** Začít s Markdown pro jednoduchost

---

### 4.2 Online booking systém (24 hodin)
**Priorita:** VYSOKÁ - business feature

**Funkce:**
- Kalendář s volnými termíny
- Rezervační formulář
- Email notifikace
- Správa rezervací

**Technologie:**
- **Calendly** embed (4 hodiny)
- **Custom systém** s databází (24 hodin)
- **Tally.so** formuláře (2 hodiny)

---

### 4.3 Email marketing integrace (4 hodiny)
**Priorita:** STŘEDNÍ - customer retention

**Možnosti:**
1. **Mailchimp** - newsletter signup
2. **ConvertKit** - creator focused
3. **Sendinblue** - affordable

**Implementace:**
- Přidat do SubscribeForm
- Welcome email série
- Newsletter šablony

---

### 4.4 Performance optimalizace (4 hodiny)
**Priorita:** STŘEDNÍ - Core Web Vitals

**Úkoly:**
1. **Image lazy loading** - již implementováno
2. **Font optimization** - display: swap
3. **Bundle analysis** - webpack-bundle-analyzer
4. **CDN setup** - pokud potřeba

---

## 5. Monitoring a údržba

### 5.1 Průběžné úkoly
1. **Aktualizovat závislosti** - měsíčně
2. **Monitorovat performance** - Google PageSpeed Insights
3. **SEO audit** - každé 3 měsíce
4. **Accessibility test** - WAVE tool

### 5.2 Error monitoring
1. **Sentry** pro error tracking (2 hodiny)
2. **LogRocket** pro session replay (4 hodiny)
3. **Custom logging** do konzole

---

## 6. Budget a prioritizace

### 6.1 Časový odhad
| Úkol | Čas | Priorita | Business impact |
|------|-----|----------|-----------------|
| Opravit metadata warningy | 30 min | Nízká | Žádný |
| Formuláře backend | 8 hodin | Kritická | Vysoký |
| Error boundaries | 1 hodina | Vysoká | Střední |
| Optimalizovat obrázky | 2 hodiny | Střední | Střední |
| Loading states | 1 hodina | Střední | Střední |
| Google Analytics | 30 min | Střední | Střední |
| Legal stránky | 2 hodiny | Nízká | Nízký |
| CMS pro blog | 8 hodin | Nízká | Nízký |
| Booking systém | 24 hodin | Vysoká | Vysoký |
| Email marketing | 4 hodiny | Střední | Střední |

### 6.2 Fázování
**Fáze 1 (1 týden):** Kritické business features
- Formuláře backend
- Error boundaries

**Fáze 2 (1 měsíc):** UX vylepšení
- Optimalizace obrázků
- Loading states
- Analytics

**Fáze 3 (3 měsíce):** Advanced features
- CMS pro blog
- Booking systém
- Email marketing

---

## 7. Success metriky

### 7.1 Technické metriky
- **Performance score:** 90+ (PageSpeed Insights)
- **Accessibility score:** 95+ (Lighthouse)
- **SEO score:** 95+ (Lighthouse)
- **Bundle size:** < 200 KB

### 7.2 Business metriky
- **Conversion rate:** Formuláře submissions
- **Bounce rate:** < 40%
- **Page views:** Tracking přes Analytics
- **Kontakt formuláře:** Počet odeslaných zpráv

---

## 8. Závěr

**Aktuální stav projektu:** 9/10 ⭐
- ✅ Všechny kritické problémy z V1 vyřešeny
- ✅ Moderní tech stack s animacemi a dark mode
- ✅ Výborné SEO a struktura

**Další kroky:**
1. **Okamžitě:** Opravit warningy (35 minut)
2. **Krátkodobě:** Formuláře + error boundaries (9 hodin)
3. **Střednědobě:** Performance + analytics (4 hodiny)
4. **Dlouhodobě:** Advanced features (36+ hodin)

Projekt je nyní profesionální a připravený pro růst. Doporučuji prioritizovat business-kritické features (formuláře) před nice-to-have vylepšeními.

**Celkový potenciál:** 9.5/10 po implementaci všech doporučení