# UX Audit Report - SW Beauty Website
**Datum:** 5. října 2025  
**Typ auditu:** Statická analýza kódu + architektura  
**Aplikace:** Next.js 15.5.4 s Turbopack, React 19, Tailwind CSS 4

---

## Executive Summary

Provedl jsem hloubkovou analýzu vašeho webu **SW Beauty** na základě kódu, struktury komponent, routing a konfigurace. Web má **solidní technický základ** s moderní architekturou (Next.js 15, React 19, Tailwind 4), ale identifikoval jsem **kritické problémy** v UX, SEO, přístupnosti a několik možností pro vylepšení výkonu.

### Severity Classification
- 🔴 **Kritické** - Blokuje uživatelský flow nebo vytváří negativní dojem
- 🟡 **Vysoká** - Značně zhoršuje UX, mělo by být opraveno brzy
- 🟢 **Střední** - Vylepšení, které zlepší zkušenost
- ⚪ **Nízká** - Nice-to-have, neblokující

---

## 1. Struktura a Navigace

### ✅ Pozitiva
- **Konzistentní navigace** - Sticky navbar s `Navbar.tsx`, stejná struktura na všech stránkách
- **Mobilní menu** - Dobře implementované drawer menu s overlay
- **Aktivní sekce tracking** - Navigace reaguje na scroll pozici a active page
- **Logické routy**:
  - `/` - Domovská stránka
  - `/sluzby` - Katalog služeb
  - `/sluzby/[kategorie]` - Kategorie služeb  
  - `/sluzby/[kategorie]/[slug]` - Detail služby
  - `/rezervace` - Booking formulář
  - `/kontakt` - Kontaktní stránka
  - `/o-salonu` - O nás
  - `/poukazy` - Dárkové poukazy
  - `/cenik` - Ceník

### 🔴 Kritické problémy

#### 1.1 Rezervační formulář neselektuje služby
**Soubor:** `src/components/BookingForm.tsx` (řádky 95-120)  
**Problém:** Formulář má podporu pro `preselectedService`, ale na stránce `/rezervace` se nepoužívá. Uživatel musí ručně psát název služby, místo aby si vybral ze seznamu.

```tsx
// Aktuálně v /rezervace/page.tsx
<BookingForm />  // ❌ Žádná preselekce

// Mělo by být:
<BookingForm preselectedService={serviceFromQuery} />
// Nebo dropdown se všemi službami
```

**Dopad:** Uživatel může udělat překlep, není to intuitivní, zvyšuje friction.  
**Fix:** Přidat `<select>` dropdown se seznamem všech služeb ze `getAllServices()`.

#### 1.2 Kontaktní formulář používá `mailto:`
**Soubor:** `src/components/ContactForm.tsx` (řádek 22)  
**Problém:** Formulář neposílá data přes API, ale otevírá `mailto:` link

```tsx
window.location.href = `mailto:info@swbeauty.cz?subject=${subject}&body=${body}`
```

**Dopady:**
- Vyžaduje nastavený emailový klient (Gmail v browseru, Outlook, etc.)
- Na mobilu může otevřít nesprávnou aplikaci
- Není uživatelsky přívětivé
- Nevytváří dobrý dojem profesionality

**Fix:** Vytvořit `/api/contact` endpoint s Resend (stejně jako booking).

#### 1.3 Voucher formulář také používá `mailto:`
**Soubor:** `src/components/VoucherForm.tsx` (řádek 35)  
**Stejný problém** jako kontaktní formulář.

**Fix:** Vytvořit `/api/voucher` endpoint.

---

## 2. User Flows - Kritické cesty

### 2.1 Flow: Rezervace služby

**Aktuální stav:**
1. Uživatel klikne na "Rezervace" v navbaru
2. Otevře se `/rezervace` s prázdným formulářem
3. Uživatel musí RUČNĚ napsat název služby
4. Vyplní kontakt, datum, čas
5. Odešle → Email přes Resend API ✅

**Problémy:**
- 🔴 Chybí dropdown pro výběr služby (uživatel nemusí znát přesný název)
- 🔴 Není propojení z detailu služby na rezervaci s předvyplněnou službou
- 🟡 Chybí validace dostupnosti termínů (frontend akceptuje i neděli, i když salon je zavřený)

**Optimální flow:**
1. Uživatel prohlíží `/sluzby/hifu/hifu-facelift-cely-oblicej...`
2. Klikne "Rezervovat tuto službu" → přesměruje na `/rezervace?service=hifu-facelift...`
3. Formulář má službu **předvyplněnou** s cenou a dobou trvání
4. Datum picker blokuje neděle a zavírací dny
5. Time slots jsou generované dynamicky (ne statické pole)
6. Odešle → potvrzení

### 2.2 Flow: Nákup dárkového poukazu

**Aktuální stav:**
1. Uživatel klikne "Objednat dárkový poukaz" (komponenta `OpenVoucherButton`)
2. Otevře se modal (`VoucherModal` + `VoucherForm`)
3. Vybere částku, vyplní kontakt
4. Odešle → `mailto:` 🔴

**Problém:** `mailto:`破坏profesionální UX.

**Fix:**
- `/api/voucher` endpoint
- Integrovat platební bránu (GoPay, Stripe) pro okamžitou platbu poukazu

### 2.3 Flow: Prohlížení služeb

**Aktuální stav:**
1. `/sluzby` → zobrazí kategorie (HIFU, Endosphere, Kosmetika, etc.)
2. Klikne na kategorii → `/sluzby/hifu` → zobrazí služby v kategorii
3. Klikne na službu → `/sluzby/hifu/[slug]` → detail

**Problémy:**
- 🟡 Neexistuje filtrování podle ceny nebo času trvání
- 🟢 Není breadcrumb navigace (uživatel neví, kde je)
- 🟢 Chybí "Podobné služby" na detailu

**Doporučení:**
- Přidat breadcrumbs: `Služby > HIFU > HIFU Facelift celý obličej`
- Přidat related services widget na detail page

---

## 3. Formuláře a Validace

### ✅ Pozitiva
- **React Hook Form** + **Zod validace** v `BookingForm` (řádky 7-15)
- Správné error messages v češtině
- Vizuální feedback při submitu (loading state, success message)

### 🔴 Kritické problémy

#### 3.1 Datum picker nevaliduje zavírací dny
**Soubor:** `BookingForm.tsx` (řádek 130)

```tsx
min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
```

Blokuje pouze včerejší dny, ale:
- ❌ Neděle je zavřeno (mělo by být disabled)
- ❌ Svátky nejsou blokovány
- ❌ Uživatel může vybrat neděli → rezervace neplatná

**Fix:**
```tsx
// Přidat funkci pro disabled dates
const isDateDisabled = (date: Date) => {
  const day = date.getDay()
  return day === 0 // Neděle
  // TODO: + kontrola svátků
}
```

#### 3.2 Time slots jsou statické
**Soubor:** `BookingForm.tsx` (řádek 67)

```tsx
const timeSlots = ['9:00', '10:00', '11:00', ..., '17:00']
```

**Problémy:**
- V sobotu salon zavírá v 18:00, ne 20:00 → uživatel si může vybrat čas, kdy je zavřeno
- Není kontrola, jestli je slot již obsazený
- Není respektován duration služby (60 min služba v 17:00 = končí v 18:00, ale salon zavírá v 20:00)

**Řešení:**
1. Generovat time slots dynamicky podle dne:
   - Po-Pá: 9:00-20:00
   - So: 10:00-18:00
2. Odečíst `duration` služby od zavírací doby
3. Integrovat s kalendářem (Calendly, Google Calendar) pro real-time dostupnost

#### 3.3 Telefonní číslo validace je slabá
**Zod schema:**
```tsx
phone: z.string().min(9, 'Zadejte prosím platné telefonní číslo')
```

Akceptuje "123456789", což není validní.

**Fix:**
```tsx
phone: z.string().regex(/^(\+420)?[0-9]{9}$/, 'Zadejte platné české telefonní číslo')
```

---

## 4. Design a UI Konzistence

### ✅ Pozitiva
- **Moderní design systém**: Čistý černobílošedý design
- **Typografie**: Inter (sans-serif) + Instrument Serif (display) = elegantní
- **Konzistentní spacing**: Tailwind utility classes
- **Responzivní**: Grid layout s breakpointy

### 🟡 Problémy

#### 4.1 Inconsistentní styly mezi stránkami
**Rezervace page** (`/rezervace/page.tsx`) používá jiné classes než zbytek:

```tsx
// /rezervace/page.tsx
<h1 className="text-4xl md:text-5xl font-bold text-gray-900">
<p className="text-xl text-gray-600">
<div className="bg-white rounded-lg shadow-lg">

// Ostatní stránky
<h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">
<p className="text-slate-600">
<div className="rounded-2xl border border-slate-200">
```

**Problém:** 
- `gray-900` vs `slate-900`
- `font-bold` vs `font-light`
- `shadow-lg` vs `border`

**Fix:** Sjednotit na `slate-*` paletu a `font-light` podle designu ostatních stránek.

#### 4.2 Navbar má bílý backdrop ale není vidět border
**Soubor:** `Navbar.tsx` (řádek 49)

```tsx
className="sticky top-0 z-50 mt-5 bg-white/90 backdrop-blur-md backdrop-saturate-150 border-b border-white/30"
```

`border-white/30` je skoro neviditelný na bílém pozadí.

**Fix:**
```tsx
border-b border-slate-200/50
```

---

## 5. Výkon a Performance

### ✅ Pozitiva
- Next.js 15 s **Turbopack** → rychlé buildy
- Image component pro optimalizované obrázky
- Lazy loading komponent (`FadeInSection` s Framer Motion)

### 🟡 Doporučení

#### 5.1 Video na homepage
**Soubor:** `public/hero_1.mp4` (3.7 MB)

Pokud používáte video na hero sekci:
- 🟡 3.7 MB je velké pro mobile (3G/4G)
- Doporučuji:
  - Optimalizovat na < 1 MB (lower bitrate, 720p)
  - Lazy load (načíst až po first paint)
  - Fallback obrázek pro slow connections

#### 5.2 CSV parsing na každý request
**Soubor:** `lib/services.ts` (řádek 92)

```tsx
export function getAllServices(): Service[] {
  const csvPath = path.join(process.cwd(), 'public', 'pricelist.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')  // Čte soubor při každém volání
  const items = parseCSV(csvContent)
  return items.map(priceItemToService)
}
```

**Problém:** Při každém načtení stránky se znovu parsuje CSV.

**Fix:** Cache výsledek:
```tsx
let servicesCache: Service[] | null = null

export function getAllServices(): Service[] {
  if (servicesCache) return servicesCache
  // ... parsování
  servicesCache = services
  return services
}
```

Nebo lépe: Použít statické generování (`generateStaticParams` pro všechny služby).

#### 5.3 Instagram Feed
**Komponenta:** `InstagramFeed.tsx`

Pokud načítáte Instagram přes API:
- 🟢 Cachovat data (ne live při každém page load)
- 🟢 SSR nebo ISR (Incremental Static Regeneration)

---

## 6. Přístupnost (A11y)

### ✅ Pozitiva
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- `aria-label` na tlačítkách a ikonách
- `<title>` v SVG ikonách

### 🔴 Kritické problémy

#### 6.1 Focus states chybí na interaktivních prvcích
Většina tlačítek a linků nemá viditelný `:focus` state pro keyboard navigation.

**Fix:** Přidat do `globals.css`:
```css
@layer base {
  *:focus-visible {
    @apply outline outline-2 outline-offset-2 outline-slate-900;
  }
}
```

#### 6.2 Modal nemá správný focus management
**Komponenta:** `Modal.tsx`

Když se modal otevře:
- ❌ Focus není přesunut do modalu
- ❌ Není focus trap (uživatel může tabbovat ven)
- ❌ ESC klávesa není implementována

**Fix:** Použít `@headlessui/react` Dialog nebo `react-focus-lock`.

#### 6.3 Formulářové chyby nejsou oznámeny screen readeru
React Hook Form má error messages, ale nejsou v `<div role="alert">`.

**Fix:**
```tsx
{errors.name && (
  <p className="mt-1.5 text-xs text-red-600" role="alert">
    {errors.name.message}
  </p>
)}
```

---

## 7. SEO a Meta Tags

### ✅ Pozitiva
- Dobrá metadata struktura (`layout.tsx` a page-level)
- Open Graph tags pro social sharing
- Structured metadata s `next/metadata`

### 🟡 Problémy

#### 7.1 Missing JSON-LD structured data
Google preferuje **LocalBusiness** schema pro salony:

```tsx
// Přidat do layout.tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "SW Beauty",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "U Cihelny 1326/2",
    "addressLocality": "Hodonín",
    "postalCode": "695 01",
    "addressCountry": "CZ"
  },
  "telephone": "+420773577899",
  "openingHours": ["Mo-Fr 09:00-20:00", "Sa 10:00-18:00"],
  "priceRange": "500Kč - 5000Kč"
})}
</script>
```

#### 7.2 Sitemap a robots.txt
Zkontrolovat:
- `/sitemap.xml` - existuje?
- `/robots.txt` - existuje?

Next.js 15 podporuje `app/sitemap.ts`:
```tsx
export default function sitemap() {
  return [
    { url: 'https://swbeauty.cz', lastModified: new Date() },
    { url: 'https://swbeauty.cz/sluzby', lastModified: new Date() },
    // ... dynamicky vygenerovat všechny služby
  ]
}
```

---

## 8. Chybějící Funkce

### 🟡 High-value features

#### 8.1 Žádný booking kalendář / dostupnost
**Problem:** Uživatel musí čekat 24h na potvrzení.  
**Řešení:** Integrace s **Calendly**, **Cal.com** nebo custom kalendář zobrazující dostupné sloty v reálném čase.

#### 8.2 Online platba poukazů
**Aktuálně:** Poukazy se objednávají emailem, platba offline.  
**Doporučení:** Integrovat **Stripe** nebo **GoPay** pro okamžitou platbu + automatické generování PDF poukazu.

#### 8.3 Zákaznický účet / historie rezervací
**Benefit:** Uživatel vidí své minulé rezervace, může je zrušit/upravit.

#### 8.4 Live chat nebo chatbot
**Benefit:** Okamžitá odpověď na dotazy (otevírací doba, cena služby, etc.)  
**Nástroje:** Crisp, Intercom, nebo custom s ChatGPT API.

#### 8.5 Before/After galerie
Ukázat výsledky ošetření (s consent klientek) → zvyšuje trust a konverze.

---

## 9. Bezpečnost

### ✅ Pozitiva
- API routes používají `try/catch` error handling
- RESEND_API_KEY je v `.env` (ne hardcoded)

### 🟡 Doporučení

#### 9.1 Rate limiting na API endpoints
**Soubory:** `/api/booking/route.ts`, `/api/pricelist/route.ts`

Chybí ochrana proti spam:
- Uživatel může odeslat 1000 rezervací za sekundu

**Fix:** Použít `@upstash/ratelimit` nebo middleware:
```tsx
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
})
```

#### 9.2 CSRF protection
Next.js má built-in CSRF pro Server Actions, ale API routes jsou zranitelné.

**Fix:** Použít `csrf` package nebo ověřit `origin` header.

---

## 10. Monitoring a Analytics

### 🟡 Chybějící

#### 10.1 Error tracking
**Doporučení:** Integrace **Sentry** pro frontend i API errors.

```tsx
// app/error.tsx
'use client'
import * as Sentry from '@sentry/nextjs'

export default function Error({ error }: { error: Error }) {
  Sentry.captureException(error)
  return <div>Něco se pokazilo...</div>
}
```

#### 10.2 Analytics
- **Google Analytics** nebo **Plausible** (privacy-friendly)
- **Hotjar** nebo **Microsoft Clarity** pro session recordings (vidět, jak uživatelé navigují)

#### 10.3 Performance monitoring
- **Vercel Analytics** (pokud hostujete na Vercelu)
- **Web Vitals** tracking

---

## 11. Mobile UX

### ✅ Pozitiva
- Responzivní grid layout
- Mobilní menu drawer
- Touch-friendly tlačítka (min 44x44px)

### 🟡 Problémy

#### 11.1 Carousel může být problematický na mobile
**Komponenta:** `Carousel.tsx`

- Doporučuji testovat swipe gestures
- Přidat indikátory (dots) pro orientaci

#### 11.2 Formuláře na mobilu
- Input fields by měly mít správný `inputMode` a `autocomplete`:

```tsx
<input
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  // Otevře numeric keyboard na iOS/Android
/>

<input
  type="email"
  inputMode="email"
  autoComplete="email"
  // Přidá @ do keyboard
/>
```

---

## 12. Content a Copy

### ✅ Pozitiva
- Profesionální český text
- Jasné CTA ("Rezervace", "Objednat poukaz")
- Trust signály ("500+ klientů", certifikace)

### 🟡 Doporučení

#### 12.1 FAQ je kvalitní, ale mohlo by být více
Aktuálně je 4 FAQ položky. Doporučuji:
- Přidat "Jak dlouho trvá ošetření?"
- "Mohu použít poukaz na jakoukoli službu?"
- "Jaká je storno politika?"

#### 12.2 Micro-copy na formulářích
Placeholder text je dobrý, ale:
- Přidat helper text: "Brzy vás budeme kontaktovat pro potvrzení"
- Vysvětlit, proč požadujete telefon (volání vs SMS vs WhatsApp?)

---

## Priority Matrix - Co opravit první

### 🔴 **P0 - Kritické (do 1 týdne)**
1. **Opravit kontaktní a voucher formulář** - nahradit `mailto:` za `/api/contact` a `/api/voucher`
2. **Přidat služby dropdown do rezervačního formuláře** - uživatel si nemůže vybrat službu
3. **Validovat zavírací dny v date pickeru** - blokovat neděle
4. **Sjednotit design rezervační stránky** s rest of the site
5. **Přidat focus states** pro accessibility

### 🟡 **P1 - Vysoká (do 2-4 týdnů)**
6. **Propojit detail služby → rezervace** s předvyplněním
7. **Dynamické time slots** podle dne a duration služby
8. **Rate limiting na API** proti spamu
9. **Breadcrumb navigace** na service pages
10. **JSON-LD structured data** pro SEO

### 🟢 **P2 - Střední (1-2 měsíce)**
11. **Real-time booking kalendář** (Calendly integrace)
12. **Online platba poukazů** (Stripe/GoPay)
13. **Error tracking** (Sentry)
14. **Session recordings** (Hotjar/Clarity)
15. **Before/After galerie**

### ⚪ **P3 - Nízká (nice to have)**
16. Zákaznický účet systém
17. Live chat / chatbot
18. Pokročilé filtrování služeb
19. Related services widget
20. Dark mode (pokud to zapadá do brand identity)

---

## Závěr

Váš web **SW Beauty** má **solidní technický základ** s moderním tech stackem, ale UX a business logika potřebují vylepšení. Hlavní problémy jsou:

1. **Formuláře** používají `mailto:` místo API → špatný UX
2. **Rezervační flow** je neúplný (chybí dropdown služeb, validace)
3. **Přístupnost** potřebuje focus states a ARIA
4. **SEO** je dobrý, ale chybí structured data

**Odhadovaný čas na fix P0 issues:** ~2-3 dny práce  
**Dopad:** Výrazně lepší conversion rate a profesionální dojem.

---

## Technické Doporučení

### Immediate Wins (< 1 den práce)
```bash
# 1. Opravit contact form API
touch src/app/api/contact/route.ts
# Zkopírovat logiku z booking/route.ts

# 2. Opravit voucher form API  
touch src/app/api/voucher/route.ts

# 3. Přidat služby dropdown do BookingForm
# Edit: src/components/BookingForm.tsx
# Import: getAllServices() from lib/services

# 4. Sjednotit styly rezervace page
# Edit: src/app/rezervace/page.tsx
# Replace gray-* with slate-*, font-bold with font-light

# 5. Fix navbar border
# Edit: src/components/Navbar.tsx, line 49
# Change: border-white/30 → border-slate-200/50
```

### Medium-term (1-2 týdny)
- Implementovat Calendly iframe nebo custom booking kalendář
- Přidat Stripe payment flow pro poukazy
- Setup Sentry error tracking
- Vytvořit sitemap.ts a robots.ts

### Long-term (1-2 měsíce)
- Zákaznický portal (Next-Auth)
- Before/After galerie s case studies
- A/B testing landing pages

---

**Potřebujete, abych některou z těchto úprav implementoval? Mohu začít s nejvyššími prioritami (P0) a postupně se propracovat dolů.**
