# Vercel Setup Guide - SW Beauty
**Stack:** Vercel + Resend (Budget-friendly)

---

## 🎯 Co Vercel poskytuje ZDARMA

### 1. **Vercel Web Analytics** (Analytics Tab)
- Real-time visitor tracking
- Page views, unique visitors
- Top pages, referrers
- Device & browser breakdown
- **NO cookies, GDPR compliant**

### 2. **Vercel Speed Insights**
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Performance score per page
- Geographic performance data

### 3. **Runtime Logs**
- Console.log output z API routes
- Error stack traces
- Request/response logging
- Filter by status code, path

### 4. **Deployment Previews**
- Automatic preview URLs for każdý commit
- QA testing před production

---

## 📦 Quick Setup (20 minut)

### Krok 1: Enable Vercel Analytics (~5 min)

```bash
# 1. Instalace package
bun add @vercel/analytics @vercel/speed-insights
```

```tsx
// 2. Přidat do src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

```bash
# 3. Deploy
git add .
git commit -m "Add Vercel Analytics"
git push
```

**4. Enable v Vercel Dashboard:**
- Jdi na vercel.com/dashboard
- Vyber projekt `swbeauty-bun`
- Settings → Analytics → Enable Web Analytics
- Settings → Speed Insights → Enable

✅ **Hotovo!** Data se začnou sbírat okamžitě.

---

### Krok 2: Setup Error Logging (~10 min)

**Vytvořit global error boundary:**

```tsx
// src/app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log to Vercel Runtime Logs
  console.error('Global error:', error)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md p-8 bg-white rounded-2xl border border-slate-200 text-center">
        <h2 className="text-2xl font-display text-slate-900 mb-4">
          Něco se pokazilo
        </h2>
        <p className="text-slate-600 mb-6">
          Omlouváme se, došlo k neočekávané chybě. Pracujeme na nápravě.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-slate-900 px-6 py-3 text-white hover:bg-slate-800"
        >
          Zkusit znovu
        </button>
      </div>
    </div>
  )
}
```

**Update API routes s lepším loggingem:**

```tsx
// src/app/api/booking/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Log request (viditelné v Vercel Logs)
    console.log('Booking request:', {
      service: body.service,
      date: body.preferredDate,
      time: body.preferredTime,
    })
    
    // ... vaše logika
    
    console.log('✅ Booking sent successfully')
    return NextResponse.json({ success: true })
    
  } catch (error) {
    // Detailed error log
    console.error('❌ Booking API error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    
    return NextResponse.json(
      { error: 'Failed to send booking' },
      { status: 500 }
    )
  }
}
```

**Kde vidět logy:**
- Vercel Dashboard → Project → Logs tab
- Real-time stream
- Filter by: Error, Warning, Info

**Setup notifikací:**
- Settings → Notifications → Error Alerts
- Přidat email nebo Slack webhook

---

### Krok 3: Custom Event Tracking (~5 min)

Trackovat důležité akce:

```tsx
// src/components/BookingForm.tsx
import { track } from '@vercel/analytics'

const onSubmit = async (data: BookingFormData) => {
  setIsSubmitting(true)
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Track successful booking
      track('booking_submitted', {
        service: data.service,
        date: data.preferredDate,
      })
      
      setIsSuccess(true)
    }
  } catch (error) {
    console.error('Booking error:', error)
    
    // Track failed booking
    track('booking_failed', {
      error: error instanceof Error ? error.message : 'Unknown',
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

**Další events k trackování:**
```tsx
// Kontaktní formulář
track('contact_submitted')

// Voucher objednávka
track('voucher_ordered', { amount: formData.amount })

// Service viewed
track('service_viewed', { service: service.name, category: service.category })

// CTA clicked
track('cta_clicked', { location: 'hero', action: 'book_now' })
```

**Zobrazit v dashboardu:**
- Analytics → Events tab
- Vytvoří se automaticky po prvním track() volání

---

## 🔒 Simple Rate Limiting (bez externích služeb)

**Vytvořit helper:**

```tsx
// src/lib/rateLimit.ts
type RateLimitStore = Map<string, number[]>

const store: RateLimitStore = new Map()

export function rateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): { success: boolean; remaining: number } {
  const now = Date.now()
  const requests = store.get(identifier) || []
  
  // Remove old requests outside window
  const recentRequests = requests.filter(timestamp => now - timestamp < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return { success: false, remaining: 0 }
  }
  
  // Add current request
  recentRequests.push(now)
  store.set(identifier, recentRequests)
  
  // Cleanup old entries (prevent memory leak)
  if (store.size > 10000) {
    const oldestKey = store.keys().next().value
    store.delete(oldestKey)
  }
  
  return {
    success: true,
    remaining: maxRequests - recentRequests.length,
  }
}

export function getClientIp(request: Request): string {
  // Vercel provides real IP in headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return realIp || 'unknown'
}
```

**Použití v API route:**

```tsx
// src/app/api/booking/route.ts
import { rateLimit, getClientIp } from '@/lib/rateLimit'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { success, remaining } = rateLimit(ip, 5, 60 * 60 * 1000) // 5 per hour
  
  if (!success) {
    console.warn(`Rate limit exceeded for IP: ${ip}`)
    
    return NextResponse.json(
      { error: 'Příliš mnoho požadavků. Zkuste to prosím později.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '3600',
        }
      }
    )
  }
  
  // Continue with normal logic
  try {
    const body = await request.json()
    // ...
  } catch (error) {
    // ...
  }
}
```

**Výhody:**
- ✅ Zero cost (no external service)
- ✅ Zero latency (in-memory)
- ✅ Simple implementation

**Omezení:**
- ⚠️ Reset při restartu serverless funkce (OK pro Vercel)
- ⚠️ Nefunguje across multiple instances (ale Vercel má sticky sessions)

---

## 📊 Optional: Microsoft Clarity (100% FREE)

Pro session recordings a heatmapy (pokud chcete vidět, jak uživatelé navigují):

**1. Registrace:**
- clarity.microsoft.com
- Create project
- Get tracking code

**2. Přidat do layout:**

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**Co získáte:**
- Session recordings (vidíte přesně, jak uživatel naviguje)
- Heatmapy (kde klikají)
- Scroll depth
- Dead clicks (klikání na non-clickable prvky)
- Rage clicks (frustrace)

**GDPR compliant** - anonymizuje osobní data.

---

## 📈 Monitoring Dashboard Setup

### Vercel Dashboard Overview

**1. Analytics Tab:**
- Real-time visitors
- Top pages (které služby si prohlížejí)
- Referral sources (odkud přicházejí)
- Devices (mobile vs desktop ratio)

**2. Speed Insights Tab:**
- Performance score per page
- Core Web Vitals:
  - LCP (Largest Contentful Paint) - cíl: <2.5s
  - FID (First Input Delay) - cíl: <100ms
  - CLS (Cumulative Layout Shift) - cíl: <0.1

**3. Logs Tab:**
- Real-time log stream
- Filter by:
  - Status: 200, 404, 500
  - Path: /api/booking, /api/contact
  - Search: "error", "booking"

**4. Deployments Tab:**
- Preview URLs pro testing
- Rollback function (pokud něco pokazíte)

---

## 🎯 Key Metrics to Track

### Týdenní monitoring (každé pondělí):

**Business Metrics:**
- [ ] Počet booking requests (Analytics → Events → booking_submitted)
- [ ] Počet contact form submissions
- [ ] Počet voucher orders
- [ ] Conversion rate (visitors → bookings)

**Technical Metrics:**
- [ ] Performance score (Speed Insights) - cíl: >90
- [ ] Error rate (Logs → filter 5xx) - cíl: <1%
- [ ] API response time - cíl: <500ms
- [ ] Mobile vs Desktop ratio

**UX Metrics (pokud používáte Clarity):**
- [ ] Average session duration - cíl: >2 min
- [ ] Pages per session - cíl: >3
- [ ] Dead clicks - cíl: <5%
- [ ] Rage clicks - identifikovat frustrující elementy

---

## 🚨 Alert Setup

**Vercel Notifications (Settings → Notifications):**

1. **Deployment Failed**
   - Email: ✅ Ano
   - Slack: Optional

2. **Error Rate > 5%**
   - Email: ✅ Ano
   - Trigger: >10 errors za 5 minut

3. **Performance Degradation**
   - Speed Insights score drops below 80

---

## 💡 Pro Tips

### 1. Environment Variables
Všechny secrets v Vercel Dashboard:
- Settings → Environment Variables
- `RESEND_API_KEY` - pro production, preview, development

### 2. Preview Deployments
Každý branch/PR automaticky vytvoří preview URL:
- `https://swbeauty-bun-git-feature-xyz.vercel.app`
- Testovat před merge do main

### 3. Deployment Protection
Settings → Deployment Protection:
- Enable password pro preview deployments
- Prevent preview URLs z indexování Googlem

### 4. Custom Domain
Domains → Add Domain:
- `swbeauty.cz`
- `www.swbeauty.cz`
- Auto SSL certifikát (Let's Encrypt)

---

## ✅ Checklist

Po dokončení setupu:

- [ ] `@vercel/analytics` instalováno a přidáno do layout
- [ ] `@vercel/speed-insights` instalováno a přidáno do layout
- [ ] Web Analytics enabled v Vercel Dashboard
- [ ] Speed Insights enabled
- [ ] `app/error.tsx` vytvořen s error boundaryem
- [ ] API routes mají console.log/error logging
- [ ] Custom events trackují klíčové akce (booking, contact, voucher)
- [ ] Rate limiting implementován na všech API routes
- [ ] Email notifications nastaveny pro errors
- [ ] (Optional) Microsoft Clarity přidán

**Deploy a otestovat:**
```bash
git add .
git commit -m "Setup Vercel monitoring & analytics"
git push
```

Po deployu zkontrolovat:
1. Analytics tab - vidíte traffic? ✅
2. Logs tab - vidíte console.log výstupy? ✅
3. Test error boundary - throw new Error('test') v komponentě ✅
4. Test rate limiting - odeslat 6 bookings rychle za sebou ✅

---

## 📞 Troubleshooting

**Analytics nezobrazuje data:**
- Počkejte 5-10 minut po deployu
- Zkontrolujte, že `<Analytics />` je v layout.tsx
- Check browser console pro errors

**Logs nejsou vidět:**
- console.log funguje jen v production (ne local dev)
- Musíte deployovat na Vercel
- Test: `vercel dev` místo `bun dev`

**Rate limiting nefunguje:**
- Pouze production mode (local dev může být jiný)
- Test s curl nebo Postman (rychlé requesty)

**Speed Insights ukazuje nízké skóre:**
- Optimalizovat images (next/image už máte ✅)
- Zkontrolovat hero video velikost
- Remove unused JavaScript

---

**Celkový čas setupu: ~20-30 minut**  
**Měsíční cost: 0 Kč** (vše included ve Vercel Hobby/Pro plánu)

🎉 **Máte enterprise-grade monitoring bez enterprise nákladů!**
