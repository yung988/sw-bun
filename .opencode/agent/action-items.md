# Action Items - SW Beauty UX Fixes

## 🔴 Priority 0 - Kritické (Implementovat ASAP)

### 1. Fix Contact Form API
**Problém:** Kontaktní formulář používá `mailto:` místo API  
**Soubor:** `src/components/ContactForm.tsx`  
**Čas:** ~30 minut

**Úkoly:**
- [ ] Vytvořit `src/app/api/contact/route.ts`
- [ ] Zkopírovat Resend logiku z `booking/route.ts`
- [ ] Upravit email template pro kontakt
- [ ] Update `ContactForm.tsx` - zavolat `/api/contact` místo `mailto:`
- [ ] Otestovat odeslání

**Kód snippet:**
```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()
  
  await resend.emails.send({
    from: 'SW Beauty Kontakt <kontakt@swbeauty.cz>',
    to: 'info@swbeauty.cz',
    subject: `Nový kontakt - ${name}`,
    html: `
      <h2>Nová zpráva z kontaktního formuláře</h2>
      <p><strong>Jméno:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Zpráva:</strong></p>
      <p>${message}</p>
    `
  })
  
  return NextResponse.json({ success: true })
}
```

---

### 2. Fix Voucher Form API
**Problém:** VoucherForm používá `mailto:`  
**Soubor:** `src/components/VoucherForm.tsx`  
**Čas:** ~30 minut

**Úkoly:**
- [ ] Vytvořit `src/app/api/voucher/route.ts`
- [ ] Update `VoucherForm.tsx` - zavolat `/api/voucher`
- [ ] Otestovat objednávku poukazu

---

### 3. Přidat Services Dropdown do BookingForm
**Problém:** Uživatel musí ručně psát název služby  
**Soubor:** `src/components/BookingForm.tsx`  
**Čas:** ~45 minut

**Úkoly:**
- [ ] Import `getAllServices()` z `lib/services`
- [ ] Přidat `<select>` dropdown místo hidden input
- [ ] Zobrazit price + duration v option labelu
- [ ] Update form validation

**Kód snippet:**
```tsx
// src/components/BookingForm.tsx
import { getAllServices } from '@/lib/services'

export default function BookingForm({ preselectedService }: Props) {
  const allServices = getAllServices()
  
  return (
    <form>
      {!preselectedService && (
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
      )}
      {/* ... rest */}
    </form>
  )
}
```

---

### 4. Validovat Zavírací Dny v Date Picker
**Problém:** Uživatel může vybrat neděli (zavřeno)  
**Soubor:** `src/components/BookingForm.tsx`  
**Čas:** ~20 minut

**Úkoly:**
- [ ] Přidat `isDateDisabled` funkci
- [ ] Blokovat neděle (day === 0)
- [ ] Disable input field v date pickeru pro neděle
- [ ] Přidat helper text "Salon je zavřený v neděli"

**Kód:**
```tsx
// Přidat do BookingForm
const isDateDisabled = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDay()
  return day === 0 // Neděle
}

// UI hint
<input
  type="date"
  {...register('preferredDate')}
  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
  // TODO: Add onBlur validation
/>
<p className="text-xs text-slate-500">
  Salon je zavřený v neděli
</p>
```

---

### 5. Sjednotit Design Rezervační Stránky
**Problém:** `/rezervace` používá jiné styly než ostatní stránky  
**Soubor:** `src/app/rezervace/page.tsx`  
**Čas:** ~15 minut

**Úkoly:**
- [ ] Replace `gray-*` → `slate-*`
- [ ] Replace `font-bold` → `font-light`
- [ ] Replace `shadow-lg` → `border border-slate-200`
- [ ] Match padding a spacing podle `/kontakt` nebo homepage

**Before:**
```tsx
<h1 className="text-4xl md:text-5xl font-bold text-gray-900">
```

**After:**
```tsx
<h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">
```

---

### 6. Fix Navbar Border Visibility
**Problém:** Border `border-white/30` je neviditelný  
**Soubor:** `src/components/Navbar.tsx` (line 49)  
**Čas:** ~2 minuty

**Úkoly:**
- [ ] Change `border-white/30` to `border-slate-200/50`

**Kód:**
```tsx
// Before
className="sticky top-0 z-50 mt-5 bg-white/90 backdrop-blur-md border-b border-white/30"

// After
className="sticky top-0 z-50 mt-5 bg-white/90 backdrop-blur-md border-b border-slate-200/50"
```

---

### 7. Přidat Focus States pro A11y
**Problém:** Keyboard navigation nemá viditelný focus  
**Soubor:** `src/app/globals.css`  
**Čas:** ~10 minut

**Úkoly:**
- [ ] Přidat global `:focus-visible` style
- [ ] Otestovat Tab navigation

**Kód:**
```css
/* src/app/globals.css */
@layer base {
  *:focus-visible {
    @apply outline outline-2 outline-offset-2 outline-slate-900 ring-0;
  }
  
  button:focus-visible,
  a:focus-visible {
    @apply outline outline-2 outline-offset-2 outline-slate-900;
  }
}
```

---

## 🟡 Priority 1 - Vysoká (Tento/příští týden)

### 8. Propojit Detail Služby → Rezervace
**Čas:** ~1 hodina

**Úkoly:**
- [ ] Vytvořit service detail page `/sluzby/[kategorie]/[slug]/page.tsx`
- [ ] Přidat "Rezervovat tuto službu" CTA button
- [ ] Link na `/rezervace?service={slug}`
- [ ] Update `BookingForm` - přečíst query param a preselect service

---

### 9. Dynamické Time Slots
**Čas:** ~2 hodiny

**Úkoly:**
- [ ] Generovat time slots podle dne (Po-Pá vs So)
- [ ] Respektovat `duration` služby
- [ ] Blokovat sloty, které končí po zavírací době

**Kód:**
```tsx
const generateTimeSlots = (date: string, duration: number) => {
  const d = new Date(date)
  const day = d.getDay()
  
  const openTime = day === 6 ? 10 : 9  // So: 10:00, ostatní: 9:00
  const closeTime = day === 6 ? 18 : 20
  
  const slots = []
  for (let h = openTime; h < closeTime; h++) {
    // Check if service fits before closing
    if (h + Math.ceil(duration / 60) <= closeTime) {
      slots.push(`${h}:00`)
    }
  }
  return slots
}
```

---

### 10. Rate Limiting na API (Simple In-Memory)
**Čas:** ~45 minut

**Úkoly:**
- [ ] Vytvořit simple in-memory rate limiter (bez externích služeb)
- [ ] Použít Map s IP → timestamp tracking
- [ ] Přidat middleware do `/api/booking`, `/api/contact`, `/api/voucher`
- [ ] Limit: 5 requests per hour per IP
- [ ] Note: Funguje jen na single instance, ale pro Vercel Hobby/Pro je OK

---

### 11. Breadcrumb Navigace
**Čas:** ~45 minut

**Úkoly:**
- [ ] Vytvořit `Breadcrumb.tsx` komponent
- [ ] Přidat na `/sluzby/[kategorie]` a `/sluzby/[kategorie]/[slug]`
- [ ] Styled podle design systému

---

### 12. JSON-LD Structured Data
**Čas:** ~30 minut

**Úkoly:**
- [ ] Přidat LocalBusiness schema do `app/layout.tsx`
- [ ] Přidat Service schema na service detail pages
- [ ] Validate s Google Rich Results Test

---

## 🟢 Priority 2 - Střední (Příští měsíc)

### 13. Real-time Booking Kalendář
**Čas:** ~1 den (pokud Calendly), ~1 týden (custom)

**Možnosti:**
- **Option A:** Calendly iframe embed (fastest)
- **Option B:** Cal.com integration (open-source)
- **Option C:** Custom kalendář s Google Calendar sync

---

### 14. Online Platba Poukazů
**Čas:** ~2-3 dny

**Úkoly:**
- [ ] Setup Stripe nebo GoPay account
- [ ] Vytvořit checkout flow
- [ ] Generate PDF poukaz po platbě
- [ ] Email s PDF poukazem

---

### 15. Error Tracking (Vercel Logs + Runtime Logs)
**Čas:** ~30 minut

**Úkoly:**
- [ ] Enable Vercel Runtime Logs (zdarma v dashboardu)
- [ ] Add `app/error.tsx` global error boundary s console.error
- [ ] Setup Vercel error notifications (email/Slack)
- [ ] Monitor v Vercel Dashboard → Logs tab

---

### 16. Analytics Setup (Vercel Analytics)
**Čas:** ~20 minut

**Úkoly:**
- [ ] Enable Vercel Web Analytics (Settings → Analytics)
- [ ] Enable Vercel Speed Insights
- [ ] Install `@vercel/analytics` package
- [ ] Add Analytics component do layout.tsx
- [ ] (Optional) Microsoft Clarity pro session recordings (100% free)
- [ ] Track custom events:
  - Booking submitted
  - Contact form submitted
  - Service viewed
  - Voucher ordered

---

## ⚪ Priority 3 - Nízká (Budoucnost)

### 17. Zákaznický Účet
- Login/Register
- Historie rezervací
- Loyalty program

### 18. Live Chat
- Crisp nebo Intercom
- Automatické odpovědi na FAQ

### 19. Before/After Galerie
- Upload system pro case studies
- Lightbox viewer

### 20. Advanced Filtering
- Filtr služeb podle ceny, času, kategorie
- Řazení (nejlevnější, nejkratší, nejpopulárnější)

---

## Testing Checklist

Po implementaci každého fix:

- [ ] **Desktop test** (Chrome, Firefox, Safari)
- [ ] **Mobile test** (iOS Safari, Android Chrome)
- [ ] **Keyboard navigation** (Tab, Enter, Esc)
- [ ] **Screen reader test** (VoiceOver on Mac, NVDA on Windows)
- [ ] **Performance** (Lighthouse score)
- [ ] **Error scenarios** (špatný email, missing fields, API down)

---

## Estimated Total Time

- **P0 (Kritické):** ~3-4 hodiny
- **P1 (Vysoká):** ~8-10 hodin
- **P2 (Střední):** ~3-5 dní
- **P3 (Nízká):** ~2-4 týdny

**Doporučuji začít s P0 a dokončit je tento týden. Potom postupně P1 během příštích 2 týdnů.**
