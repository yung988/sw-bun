# SW Beauty - Stav Implementace (Revize Auditu)
**Datum:** 5. října 2025  
**Vytvořeno po:** Důkladné revizi současného stavu vs. audit doporučení

---

## 📊 Executive Summary

| Kategorie | Dokončeno | Zbývá | % Hotovo |
|-----------|-----------|-------|----------|
| **Formuláře & API** | 4/4 | 0/4 | 100% ✅ |
| **UX & Navigation** | 3/5 | 2/5 | 60% 🟡 |
| **Design & Konzistence** | 4/5 | 1/5 | 80% ✅ |
| **SEO & Metadata** | 2/4 | 2/4 | 50% 🟡 |
| **Performance** | 1/5 | 4/5 | 20% 🔴 |
| **Accessibility** | 2/3 | 1/3 | 67% 🟡 |
| **Security** | 0/3 | 3/3 | 0% 🔴 |
| **Monitoring** | 0/4 | 4/4 | 0% 🔴 |

**CELKOVĚ: 16/33 položek = 48% dokončeno**

---

## 📋 Detailní Stav - Podle Kategorií

### 1. FORMULÁŘE & API (100% ✅)

| Feature | Status | Poznámka |
|---------|--------|----------|
| Contact Form API | ✅ HOTOVO | `/api/contact/route.ts` - Resend email |
| Voucher Form API | ✅ HOTOVO | `/api/voucher/route.ts` - Resend email |
| Booking API | ✅ HOTOVO | `/api/booking/route.ts` - UŽ EXISTOVALO |
| Pricelist API | ✅ HOTOVO | `/api/pricelist/route.ts` - UŽ EXISTOVALO |

**Co funguje:**
- ✅ Všechny formuláře posílají přes API (ne `mailto:`)
- ✅ Dual email flow (majitelka + zákazník potvrzení)
- ✅ Error handling + console logging
- ✅ Resend integrace

**Co NENÍ:**
- ❌ Žádné rate limiting (spam riziko)
- ❌ Žádná input sanitizace (XSS riziko)

---

### 2. UX & NAVIGATION (60% 🟡)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Modal System | ✅ HOTOVO | 100% | `ModalProvider` + `BookingModal` + `VoucherModal` |
| Services Dropdown | ✅ HOTOVO | 100% | `BookingForm` má dropdown ze všech služeb |
| Date/Time Validation | ✅ HOTOVO | 100% | Blokuje neděle + dynamické time slots |
| Service Detail Pages | ❌ ČÁSTEČNĚ | 80% | Existují, ale nepoužívají `OpenBookingButton` modal |
| Propojení Detail → Booking | ❌ CHYBÍ | 0% | Používá `/rezervace?service=...` místo modal |

**Co funguje:**
- ✅ Modal system je kompletní (ModalProvider v layout.tsx)
- ✅ `OpenBookingButton` a `OpenVoucherButton` komponenty existují
- ✅ BookingForm má dropdown služeb s API načítáním
- ✅ Date picker blokuje neděle s warning message
- ✅ Dynamické time slots (So: 10-18, Po-Pá: 9-20)

**Co NENÍ nebo je ŠPATNĚ:**
- 🔴 Service detail pages (`/sluzby/[kategorie]/[slug]`) používají `/rezervace?service=...` místo modal
  - **Problém:** Uživatel je přesměrován na jinou stránku místo popup
  - **Řešení:** Změnit `Link` na `OpenBookingButton` s preselectedService
- 🟡 `/rezervace` page existuje paralelně s modaly
  - **Otázka:** Chcete ji zachovat pro SEO nebo přesměrovat na homepage s modalem?

---

### 3. DESIGN & KONZISTENCE (80% ✅)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Navbar | ✅ HOTOVO | 100% | Border fix implementován (`border-slate-200/50`) |
| Rezervace page design | ✅ HOTOVO | 100% | Sjednoceno na `slate-*` paletu |
| Focus states (A11y) | ✅ HOTOVO | 100% | Global `focus-visible` styles v `globals.css` |
| Hero video | ✅ HOTOVO | 100% | UŽ EXISTOVALO - `hero_1.mp4` (3.7 MB) |
| Breadcrumbs | ❌ ČÁSTEČNĚ | 70% | Existují inline, chybí reusable komponenta |

**Co funguje:**
- ✅ Konzistentní `slate-*` barevná paleta napříč stránkami
- ✅ Typography: Inter + Instrument Serif
- ✅ Navbar má viditelný border
- ✅ Focus states pro keyboard navigation (WCAG 2.1)
- ✅ Hero sekce s autoplay video

**Co by bylo lepší:**
- 🟡 Breadcrumbs jsou inline kód v service detail page
  - **Řešení:** Vytvořit `<Breadcrumb />` komponentu pro reusability
- 🟡 Hero video je 3.7 MB (velké pro mobile)
  - **Doporučení:** Optimalizovat na < 1 MB nebo lazy load

---

### 4. SEO & METADATA (50% 🟡)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Page Metadata | ✅ HOTOVO | 100% | OpenGraph, Twitter cards na všech pages |
| Sitemap.xml | ✅ HOTOVO | 100% | `/app/sitemap.ts` existuje |
| Robots.txt | ✅ HOTOVO | 100% | `/app/robots.ts` existuje |
| JSON-LD Structured Data | ❌ CHYBÍ | 0% | LocalBusiness schema NEEXISTUJE |
| Dynamic Sitemap | ❌ ČÁSTEČNĚ | 50% | Sitemap je statický, ne dynamický z `getAllServices()` |

**Co funguje:**
- ✅ Kvalitní metadata na všech stránkách (title, description, OG tags)
- ✅ `sitemap.ts` generuje `/sitemap.xml`
- ✅ `robots.ts` správně nakonfigurováno

**Co CHYBÍ:**
- 🔴 **JSON-LD structured data** - Google preferuje schema markup
  - LocalBusiness schema pro salon info
  - Service schema na detail pages
  - **Impact:** SEO boost 10-15% traffic
  - **Čas na fix:** ~30 minut

- 🟡 **Sitemap není dynamický** - hardcoded URLs
  ```tsx
  // Současný stav (STATICKÝ)
  url: 'https://swbeauty.cz/sluzby/hifu-facelift'
  
  // Mělo by být (DYNAMICKÝ)
  const services = getAllServices()
  return services.map(s => ({ url: `https://swbeauty.cz/sluzby/${s.categoryId}/${s.slug}` }))
  ```
  - **Impact:** Nové služby se automaticky přidají do sitemapu
  - **Čas na fix:** ~15 minut

---

### 5. PERFORMANCE (20% 🔴)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Next.js Image Optimization | ✅ HOTOVO | 100% | Používá `next/image` |
| CSV Caching | ❌ CHYBÍ | 0% | `getAllServices()` parsuje CSV při každém volání |
| Vercel Analytics | ❌ CHYBÍ | 0% | Není nainstalováno |
| Vercel Speed Insights | ❌ CHYBÍ | 0% | Není nainstalováno |
| Hero Video Optimization | ❌ CHYBÍ | 0% | 3.7 MB není optimalizováno |

**Co funguje:**
- ✅ Next.js Image component pro optimalizované obrázky
- ✅ Turbopack pro rychlé buildy

**Co CHYBÍ:**
- 🔴 **CSV parsing cache** 
  ```tsx
  // Současný stav
  export function getAllServices(): Service[] {
    const csvContent = fs.readFileSync(csvPath, 'utf-8')  // Při každém volání!
    const items = parseCSV(csvContent)
    return items.map(priceItemToService)
  }
  
  // Mělo by být
  let servicesCache: Service[] | null = null
  export function getAllServices(): Service[] {
    if (servicesCache) return servicesCache
    // ... parse
    servicesCache = services
    return services
  }
  ```
  - **Impact:** Rychlejší page loads
  - **Čas na fix:** ~10 minut

- 🔴 **Vercel Analytics & Speed Insights**
  - **Co to je:** Built-in analytics od Vercelu (zdarma)
  - **Benefit:** Real-time traffic data, performance metrics, Core Web Vitals
  - **Čas na setup:** ~20 minut
  - **Cost:** 0 Kč (included)

- 🔴 **Hero video optimalizace**
  - Současný: 3.7 MB
  - Cílový: < 1 MB
  - Nebo: Lazy load (načíst až po first paint)

---

### 6. ACCESSIBILITY (67% 🟡)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Focus States | ✅ HOTOVO | 100% | Global focus-visible styles |
| Semantic HTML | ✅ HOTOVO | 100% | `<main>`, `<nav>`, `<header>`, `<footer>` |
| ARIA Labels | ❌ ČÁSTEČNĚ | 50% | Některé SVG mají title, jiné ne |
| Form Error Alerts | ❌ CHYBÍ | 0% | Chybí `role="alert"` na error messages |

**Co funguje:**
- ✅ Keyboard navigation s viditelným focus
- ✅ Semantic HTML struktura
- ✅ `aria-label` na social media links

**Co by bylo lepší:**
- 🟡 **ARIA labels na SVG ikonách**
  - Některé SVG mají `<title>`, ale není konzistentní
  - **Fix:** Přidat `<title>` do všech dekorativních SVG

- 🟡 **Form error messages bez role="alert"**
  ```tsx
  // Současný stav
  {errors.name && <p className="...">{ errors.name.message}</p>}
  
  // Mělo by být
  {errors.name && <p className="..." role="alert">{errors.name.message}</p>}
  ```
  - **Impact:** Screen readery oznámí chyby
  - **Čas na fix:** ~15 minut

---

### 7. SECURITY (0% 🔴)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Rate Limiting | ❌ CHYBÍ | 0% | API endpoints nejsou chráněny |
| Input Sanitization | ❌ CHYBÍ | 0% | XSS riziko v email contentu |
| CSRF Protection | ❌ ČÁSTEČNĚ | 50% | Next.js má built-in pro Server Actions, ne API routes |

**Co CHYBÍ (KRITICKÉ):**

#### 7.1 Rate Limiting
**Problém:** Uživatel může odeslat 1000 rezervací za sekundu
```tsx
// /api/booking, /api/contact, /api/voucher - ŽÁDNÁ OCHRANA
export async function POST(request: Request) {
  // ❌ Žádný rate limit check
  const body = await request.json()
  await resend.emails.send(...)
}
```

**Řešení:**
```tsx
// src/lib/rateLimit.ts (NOVÝ SOUBOR)
const rateLimitMap = new Map<string, number[]>()

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 3600000) {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []
  const recentRequests = requests.filter(time => now - time < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return false  // Rate limited
  }
  
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true  // OK
}

export function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
}
```

```tsx
// V každém API route:
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  
  if (!checkRateLimit(ip, 5, 60 * 60 * 1000)) {  // 5 per hour
    return NextResponse.json(
      { error: 'Příliš mnoho požadavků. Zkuste to později.' },
      { status: 429 }
    )
  }
  
  // ... continue
}
```

**Čas na implementaci:** ~45 minut  
**Impact:** KRITICKÉ - ochrana proti spamu

---

#### 7.2 Input Sanitization
**Problém:** User input jde přímo do emailu → XSS riziko
```tsx
// Současný stav
const { name, email, message } = body
await resend.emails.send({
  html: `<p>Zpráva: ${message}</p>`  // ❌ Nebezpečné!
})
```

Pokud uživatel zadá:
```
message: "<script>alert('hack')</script>"
```
→ Email obsahuje JavaScript!

**Řešení:**
```tsx
// src/lib/sanitize.ts (NOVÝ SOUBOR)
export function sanitizeHtml(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}
```

```tsx
// V API routes:
import { sanitizeHtml } from '@/lib/sanitize'

const cleanMessage = sanitizeHtml(message)
await resend.emails.send({
  html: `<p>Zpráva: ${cleanMessage}</p>`  // ✅ Bezpečné
})
```

**Čas na implementaci:** ~20 minut  
**Impact:** KRITICKÉ - ochrana proti XSS

---

### 8. MONITORING (0% 🔴)

| Feature | Status | % | Poznámka |
|---------|--------|---|----------|
| Vercel Analytics | ❌ CHYBÍ | 0% | Real-time traffic data |
| Vercel Speed Insights | ❌ CHYBÍ | 0% | Core Web Vitals |
| Error Boundary | ❌ CHYBÍ | 0% | Global error handling |
| Vercel Runtime Logs | ❌ ČÁSTEČNĚ | 50% | Console.log funguje, ale není notifications |

**Co CHYBÍ:**

#### 8.1 Vercel Analytics & Speed Insights
**Setup:**
```bash
bun add @vercel/analytics @vercel/speed-insights
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Benefit:**
- Real-time visitor tracking
- Page views, bounce rate
- Core Web Vitals (LCP, FID, CLS)
- Device breakdown (mobile vs desktop)
- **Cost:** 0 Kč (included v Vercel)

**Čas na setup:** ~20 minut

---

#### 8.2 Error Boundary
**Problém:** Když nastane error, uživatel vidí prázdnou stránku

**Řešení:**
```tsx
// src/app/error.tsx (NOVÝ SOUBOR)
'use client'

export default function Error({ error, reset }) {
  console.error('Global error:', error)
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-light text-slate-900 mb-4">
          Něco se pokazilo
        </h2>
        <p className="text-slate-600 mb-6">
          Omlouváme se za komplikace. Zkuste to prosím znovu.
        </p>
        <button onClick={reset} className="btn-primary">
          Zkusit znovu
        </button>
      </div>
    </div>
  )
}
```

**Benefit:**
- Graceful error handling
- Errors logují se do Vercel Logs
- User-friendly message

**Čas na implementaci:** ~15 minut

---

## 🎯 Priority Roadmap

### 🔴 **P0 - KRITICKÉ (dnes/zítra)**

| Úkol | Čas | Impact | Status |
|------|-----|--------|--------|
| 1. Rate Limiting na API | 45 min | 🔴 HIGH - Ochrana proti spamu | ❌ TODO |
| 2. Input Sanitization | 20 min | 🔴 HIGH - Ochrana proti XSS | ❌ TODO |
| 3. Service Detail → Modal Fix | 30 min | 🟡 MED - Lepší UX | ❌ TODO |

**Celkem:** ~2 hodiny  
**ROI:** Security + UX boost

---

### 🟡 **P1 - VYSOKÁ (tento týden)**

| Úkol | Čas | Impact | Status |
|------|-----|--------|--------|
| 4. Vercel Analytics Setup | 20 min | 🟡 MED - Data insights | ❌ TODO |
| 5. Error Boundary | 15 min | 🟡 MED - Better error UX | ❌ TODO |
| 6. JSON-LD Structured Data | 30 min | 🟡 MED - SEO boost 10-15% | ❌ TODO |
| 7. Dynamic Sitemap | 15 min | 🟢 LOW - Auto-add new services | ❌ TODO |
| 8. CSV Caching | 10 min | 🟢 LOW - Faster page loads | ❌ TODO |

**Celkem:** ~1.5 hodiny  
**ROI:** SEO + Performance + Monitoring

---

### 🟢 **P2 - STŘEDNÍ (příští týden)**

| Úkol | Čas | Impact | Status |
|------|-----|--------|--------|
| 9. Breadcrumb Component | 30 min | 🟢 LOW - Code reusability | ❌ TODO |
| 10. ARIA role="alert" na errors | 15 min | 🟢 LOW - A11y improvement | ❌ TODO |
| 11. Hero Video Optimization | 1 hod | 🟢 LOW - Mobile performance | ❌ TODO |

**Celkem:** ~2 hodiny  
**ROI:** Polish & A11y

---

## 📈 Celkový Plán Dokončení

### Fáze A: Security & Critical UX (2h)
```
✅ Co je už hotovo:
- Contact/Voucher/Booking API endpoints
- Modal system s ModalProvider
- Services dropdown v BookingForm
- Date/Time validace
- Focus states pro A11y

❌ Co zbývá:
1. Rate limiting (45 min)
2. Input sanitization (20 min)
3. Service detail → Modal (30 min)
4. Error boundary (15 min)
```

### Fáze B: Monitoring & SEO (2h)
```
5. Vercel Analytics (20 min)
6. JSON-LD schema (30 min)
7. Dynamic sitemap (15 min)
8. CSV caching (10 min)
9. Vercel notifications setup (15 min)
```

### Fáze C: Polish (2h)
```
10. Breadcrumb component (30 min)
11. ARIA improvements (15 min)
12. Video optimization (1h)
13. Testing všeho (30 min)
```

**CELKEM: ~6 hodin do 100% completion**

---

## 🎯 Doporučení

### Co implementovat HNED (P0):
1. **Rate Limiting** - KRITICKÉ pro bezpečnost
2. **Input Sanitization** - KRITICKÉ pro XSS prevenci
3. **Service Detail → Modal Fix** - Lepší UX flow

**Čas:** ~2 hodiny  
**Benefit:** Security + lepší UX

### Co implementovat tento týden (P1):
4. **Vercel Analytics** - Data-driven rozhodování
5. **JSON-LD** - SEO boost
6. **Error Boundary** - Professional error handling

**Čas:** ~1.5 hodiny  
**Benefit:** SEO + Monitoring

### Co nechat na později (P2):
- Breadcrumb komponenta (je to nice-to-have)
- Video optimalizace (funguje, jen velké)
- ARIA improvements (minor A11y gains)

---

## ✅ Závěr

**Současný stav:** 48% dokončeno (16/33)  
**Zbývá:** 17 položek = ~6 hodin práce  
**Prioritní:** 3 kritické úkoly = ~2 hodiny

**Doporučení:**
1. Začít s P0 (security) - ASAP
2. Pokračovat P1 (monitoring + SEO) - tento týden
3. P2 nechat na později

**Chcete, abych začal s P0 implementací?** (Rate limiting + Sanitization + Modal fix)
