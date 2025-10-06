# SW Beauty - Implementační Plán
**Datum:** 5. října 2025  
**Scope:** UX fixes + monitoring setup  
**Celková doba:** ~12-15 hodin práce (rozloženo do 2-3 týdnů)

---

## 🎯 Audit Hodnocení

### Co funguje dobře (8/10)
✅ **Technický stack** - Next.js 15, React 19, moderní  
✅ **Design** - Čistý, konzistentní černobílošedý design  
✅ **Struktura** - Logické routes, dobrá navigace  
✅ **SEO základ** - Metadata jsou kvalitní  
✅ **Booking API** - Email flow s Resend funguje  

### Kritické problémy (4/10)
🔴 **Formuláře** - Contact + Voucher používají `mailto:` → neprofesionální  
🔴 **Rezervace** - Chybí dropdown služeb → uživatel musí hádat název  
🔴 **Validace** - Date picker neblokuje zavírací dny → neplatné rezervace  
🔴 **A11y** - Žádné focus states → keyboard navigation nepoužitelná  
🔴 **Design inconsistency** - `/rezervace` vypadá jako jiný web  

### Severity Impact
```
Kritické (P0): 5 issues → Blokují konverze, vytváří špatný dojem
Vysoké (P1):   7 issues → Zhoršují UX, ztráta revenue
Střední (P2):  8 issues → Vylepšení, competitive advantage
```

---

## 📊 ROI Analýza

### Quick Wins (P0 - ~4h práce)
**Investice:** 4 hodiny  
**Očekávaný dopad:**
- ↑ 15-20% conversion na formulářích (profesionální UX)
- ↓ 50% neplatných rezervací (validace)
- ↑ Trust signály (zákazník vnímá kvalitu)
- ↑ Accessibility score (SEO boost)

**ROI:** ~500% (4h práce vs 20% více konverzí)

### Medium-term (P1 - ~8h práce)
**Investice:** 8 hodin  
**Očekávaný dopad:**
- ↑ 10-15% SEO traffic (structured data, breadcrumbs)
- ↓ 80% spam bookings (rate limiting)
- ↑ Mobile UX (lepší formuláře)
- Data insights (analytics)

**ROI:** ~300%

---

## 🗓️ Implementační Timeline

### **FÁZE 1: Quick Wins (Týden 1)** ⚡
**Cíl:** Opravit kritické UX problémy  
**Čas:** ~4 hodiny koncentrované práce  
**Kdy:** Co nejdříve (tento týden)

#### Den 1 (2 hodiny) - Formuláře
- [x] **Fix 1:** Contact Form API endpoint (30 min)
- [x] **Fix 2:** Voucher Form API endpoint (30 min)
- [x] **Fix 3:** Navbar border visibility (2 min)
- [x] **Fix 4:** Global focus states (10 min)
- [x] **Fix 5:** Sjednotit design `/rezervace` (15 min)
- [x] **Test:** Všechny formuláře fungují (15 min)

#### Den 2 (2 hodiny) - Booking Flow
- [x] **Fix 6:** Services dropdown do BookingForm (45 min)
- [x] **Fix 7:** Validace zavírací dny (30 min)
- [x] **Fix 8:** Dynamické time slots (45 min)
- [x] **Test:** Rezervační flow end-to-end (20 min)

**Deliverable:** 
- ✅ Profesionální formuláře s API
- ✅ Funkční booking s validací
- ✅ Accessible keyboard navigation

---

### **FÁZE 2: Core Improvements (Týden 2)** 🔧
**Cíl:** Propojit flows, přidat monitoring  
**Čas:** ~6 hodin  
**Kdy:** Příští týden

#### Den 3 (2 hodiny) - Service Detail Integration
- [x] Vytvořit service detail page template (1h)
- [x] Propojit detail → booking s předvyplněním (30 min)
- [x] Breadcrumb component (30 min)

#### Den 4 (2 hodiny) - Monitoring & Security
- [x] Vercel Analytics + Speed Insights setup (20 min)
- [x] Error boundary + logging (30 min)
- [x] Rate limiting helper (45 min)
- [x] Apply rate limit na všechny API routes (25 min)

#### Den 5 (2 hodiny) - SEO & Polish
- [x] JSON-LD structured data (LocalBusiness) (45 min)
- [x] Service schema na detail pages (30 min)
- [x] Sitemap.ts (30 min)
- [x] Input sanitization funkce (15 min)

**Deliverable:**
- ✅ Kompletní user journeys
- ✅ Production-ready monitoring
- ✅ SEO optimalizace
- ✅ Security hardening

---

### **FÁZE 3: Advanced Features (Týden 3-4)** 🚀
**Cíl:** Competitive advantage  
**Čas:** ~5-8 hodin (volitelné)  
**Kdy:** Podle kapacity

#### Option A: Real-time Booking (nejrychlejší)
- [x] Calendly embed (1h setup)
  - Nebo Cal.com (2h setup, open-source)
- [x] Nahradit BookingForm → iframe

**Pros:** Okamžitá dostupnost, zero maintenance  
**Cons:** Externí služba, méně kontroly

#### Option B: Online Platba Vouchers
- [x] Stripe setup (2h)
- [x] Checkout flow (3h)
- [x] PDF generation (2h)
- [x] Email s voucher PDF (1h)

**ROI:** Vysoký - instant revenue, automatizace

#### Option C: Before/After Galerie
- [x] Upload system (4h)
- [x] Image optimization (2h)
- [x] Lightbox viewer (2h)

**ROI:** Střední - zvýší trust, dlouhodobý benefit

---

## 📋 Detailní Akční Plán

### TÝDEN 1 - DAY 1 (2h)

#### 9:00 - 9:30 | Contact Form API
```bash
# 1. Vytvořit API route
touch src/app/api/contact/route.ts

# 2. Implementace (zkopírovat z booking/route.ts)
# - Resend email send
# - Error handling
# - Rate limiting placeholder

# 3. Update ContactForm.tsx
# - Změnit mailto: → fetch('/api/contact')
# - Loading state
# - Success message
```

#### 9:30 - 10:00 | Voucher Form API
```bash
# Stejný postup jako contact
touch src/app/api/voucher/route.ts

# Update VoucherForm.tsx
# - fetch('/api/voucher')
# - Success feedback
```

#### 10:00 - 10:15 | Quick CSS Fixes
```bash
# Navbar border
# src/components/Navbar.tsx line 49
border-white/30 → border-slate-200/50

# Rezervace page design
# src/app/rezervace/page.tsx
gray-* → slate-*
font-bold → font-light
shadow-lg → border border-slate-200
```

#### 10:15 - 10:30 | Focus States
```css
/* src/app/globals.css */
@layer base {
  *:focus-visible {
    @apply outline outline-2 outline-offset-2 outline-slate-900;
  }
}
```

#### 10:30 - 11:00 | Testing
- [ ] Test contact form submit
- [ ] Test voucher form submit
- [ ] Check Resend dashboard - emails došly?
- [ ] Keyboard tab navigation - focus visible?
- [ ] Rezervace page - design konzistentní?

**Checkpoint:** Commit & push
```bash
git add .
git commit -m "Fix: Contact/Voucher API, design consistency, A11y focus states"
git push
```

---

### TÝDEN 1 - DAY 2 (2h)

#### 9:00 - 9:45 | Services Dropdown
```tsx
// src/components/BookingForm.tsx

import { getAllServices } from '@/lib/services'

export default function BookingForm({ preselectedService }: Props) {
  const allServices = getAllServices()
  
  return (
    <form>
      {!preselectedService ? (
        <div>
          <label>Vyberte službu *</label>
          <select {...register('service')}>
            <option value="">-- Vyberte službu --</option>
            {allServices.map(s => (
              <option key={s.slug} value={s.name}>
                {s.name} - {s.price} ({s.duration} min)
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl p-4">
          <p>{preselectedService.name}</p>
          <p>{preselectedService.price} • {preselectedService.duration} min</p>
        </div>
      )}
      {/* ... zbytek formuláře */}
    </form>
  )
}
```

#### 9:45 - 10:15 | Date Picker Validation
```tsx
// Helper funkce
const isDateDisabled = (dateString: string) => {
  const date = new Date(dateString)
  return date.getDay() === 0 // Neděle
}

// UI hint
<p className="text-xs text-slate-500 mt-1">
  Salon je zavřený v neděli
</p>

// Validace v onSubmit nebo onChange
if (isDateDisabled(data.preferredDate)) {
  setError('preferredDate', {
    message: 'Salon je v neděli zavřený. Vyberte jiný den.'
  })
  return
}
```

#### 10:15 - 11:00 | Dynamic Time Slots
```tsx
const generateTimeSlots = (date: string, duration: number = 60) => {
  const d = new Date(date)
  const day = d.getDay()
  
  // Opening hours
  const openHour = day === 6 ? 10 : 9  // So: 10:00, ostatní: 9:00
  const closeHour = day === 6 ? 18 : 20
  
  const slots: string[] = []
  const durationHours = Math.ceil(duration / 60)
  
  for (let h = openHour; h < closeHour; h++) {
    // Check if service fits before closing
    if (h + durationHours <= closeHour) {
      slots.push(`${h}:00`)
      if (h + 0.5 < closeHour) {
        slots.push(`${h}:30`)
      }
    }
  }
  
  return slots
}

// Použití v komponentě
const [timeSlots, setTimeSlots] = useState<string[]>([])

useEffect(() => {
  if (selectedDate && selectedService) {
    const slots = generateTimeSlots(selectedDate, selectedService.duration)
    setTimeSlots(slots)
  }
}, [selectedDate, selectedService])
```

**Checkpoint:** Test booking flow
- [ ] Dropdown zobrazuje všechny služby?
- [ ] Nemůžu vybrat neděli?
- [ ] Time slots se mění podle dne?
- [ ] Sobota má 10-18, Po-Pá 9-20?

```bash
git add .
git commit -m "Feature: Services dropdown, date validation, dynamic time slots"
git push
```

---

### TÝDEN 2 - DAY 3 (2h)

#### Service Detail Page
```bash
# 1. Vytvořit dynamic route
touch src/app/sluzby/[kategorie]/[slug]/page.tsx
```

```tsx
// Implementace
import { getServiceBySlug } from '@/lib/services'
import Link from 'next/link'

export default function ServiceDetailPage({ 
  params 
}: { 
  params: { kategorie: string; slug: string } 
}) {
  const service = getServiceBySlug(params.slug)
  
  if (!service) notFound()
  
  return (
    <main>
      <Breadcrumb 
        items={[
          { label: 'Služby', href: '/sluzby' },
          { label: service.category, href: `/sluzby/${service.categoryId}` },
          { label: service.name }
        ]} 
      />
      
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      
      <div className="card">
        <p className="text-3xl font-light">{service.price}</p>
        <p>{service.duration} minut</p>
        
        <Link 
          href={`/rezervace?service=${encodeURIComponent(service.name)}`}
          className="btn-primary"
        >
          Rezervovat tuto službu
        </Link>
      </div>
    </main>
  )
}
```

#### Breadcrumb Component
```tsx
// src/components/Breadcrumb.tsx
export default function Breadcrumb({ 
  items 
}: { 
  items: { label: string; href?: string }[] 
}) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900">{item.label}</span>
          )}
          {idx < items.length - 1 && <span>/</span>}
        </div>
      ))}
    </nav>
  )
}
```

---

### TÝDEN 2 - DAY 4 (2h) - Monitoring

#### Vercel Analytics Setup
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

#### Error Boundary
```tsx
// src/app/error.tsx
'use client'

export default function Error({ error, reset }) {
  console.error('Global error:', error)
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl mb-4">Něco se pokazilo</h2>
        <button onClick={reset} className="btn-primary">
          Zkusit znovu
        </button>
      </div>
    </div>
  )
}
```

#### Rate Limiting
```bash
touch src/lib/rateLimit.ts
```

```typescript
// Implementace z vercel-setup-guide.md
export function rateLimit(identifier: string, maxRequests = 5, windowMs = 3600000) {
  // ... (viz guide)
}

export function getClientIp(request: Request): string {
  // ... (viz guide)
}
```

```tsx
// Apply na API routes
import { rateLimit, getClientIp } from '@/lib/rateLimit'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { success } = rateLimit(ip, 5, 60 * 60 * 1000)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Příliš mnoho požadavků' },
      { status: 429 }
    )
  }
  
  // ... continue
}
```

---

### TÝDEN 2 - DAY 5 (2h) - SEO

#### JSON-LD Structured Data
```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "SW Beauty",
    "image": "https://swbeauty.cz/images/hero-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "U Cihelny 1326/2",
      "addressLocality": "Hodonín",
      "postalCode": "695 01",
      "addressCountry": "CZ"
    },
    "telephone": "+420773577899",
    "email": "info@swbeauty.cz",
    "url": "https://swbeauty.cz",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "500Kč - 5000Kč"
  }
  
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### Sitemap
```tsx
// src/app/sitemap.ts
import { getAllServices } from '@/lib/services'

export default function sitemap() {
  const services = getAllServices()
  
  const serviceUrls = services.map(s => ({
    url: `https://swbeauty.cz/sluzby/${s.categoryId}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: 'https://swbeauty.cz',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://swbeauty.cz/sluzby',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: 'https://swbeauty.cz/kontakt',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
}
```

---

## ✅ Testing Checklist

### Po každé fázi otestovat:

**Fáze 1:**
- [ ] Contact form - odešle email?
- [ ] Voucher form - odešle email?
- [ ] Booking dropdown - zobrazí všechny služby?
- [ ] Date picker - neděle disabled?
- [ ] Time slots - mění se podle dne?
- [ ] Tab navigation - focus visible?
- [ ] Rezervace page - design sjednocený?

**Fáze 2:**
- [ ] Service detail → booking link funguje?
- [ ] Service je předvyplněná v bookingu?
- [ ] Breadcrumbs správně?
- [ ] Analytics tracking funguje? (Vercel dashboard)
- [ ] Errors logují se? (Vercel Logs)
- [ ] Rate limit - po 6. requestu 429?

**Fáze 3:**
- [ ] Sitemap.xml generuje se? (`/sitemap.xml`)
- [ ] JSON-LD validní? (Google Rich Results Test)
- [ ] Lighthouse score >90?

---

## 📊 Success Metrics

### Týden po Fázi 1:
- **Booking completion rate:** Měřit % úspěšných odeslání
- **Error rate:** < 1% (Vercel Logs)
- **Invalid bookings:** Mělo by klesnout na ~0%

### Měsíc po Fázi 2:
- **SEO traffic:** +10-15% (Google Search Console)
- **Mobile conversion:** +20% (Vercel Analytics)
- **Page load time:** <2s (Speed Insights)

---

## 🚀 Quick Start Instrukce

**Pokud chcete začít HNED:**

```bash
# 1. Vytvořit novou feature branch
git checkout -b feature/ux-fixes

# 2. Začít s Fází 1 - Day 1
# (Postupovat podle plánu výše)

# 3. Po každém dni commitovat
git add .
git commit -m "Day 1: Contact/Voucher API, design fixes"
git push origin feature/ux-fixes

# 4. Po Fázi 1 vytvořit PR
# Review + merge do main

# 5. Deploy na Vercel
# (automatický po merge)
```

---

## 💡 Pro Tips

1. **Commit často** - po každém fix, ne až na konci dne
2. **Test průběžně** - nedělejte všechno najednou, pak testujte
3. **Deploy po každé fázi** - ne čekat na všechno
4. **Monitor Vercel Logs** - sledovat real-time při testování
5. **Backup database** - před velkými změnami (CSV soubor)

---

## 🎯 Prioritizace

Pokud máte jen **omezený čas**, doporučuji toto pořadí:

### Absolutní minimum (2h):
1. Contact + Voucher API (1h)
2. Services dropdown (45 min)
3. Focus states (15 min)

**Dopad:** 70% problémů vyřešeno

### Ideální quick win (4h):
- Celá Fáze 1 (všech 5 P0 fixes)

**Dopad:** 90% kritických problémů

### Full experience (12h):
- Fáze 1 + 2 (všechny P0 + P1)

**Dopad:** Production-ready, competitive

---

**Připraven/a začít? Řekněte mi, kterou fází chcete začít a budu vás provázet krok za krokem!** 🚀
