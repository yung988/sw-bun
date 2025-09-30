# Funkční analýza SW Beauty

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Přehled funkcionalit

Web SW Beauty poskytuje následující hlavní funkce:

| Funkce | Status | Komplexita | Priorita |
|--------|--------|------------|----------|
| Homepage s prezentací služeb | ✅ Funguje | Vysoká | Kritická |
| Dynamický ceník | ✅ Funguje | Střední | Kritická |
| Detailní stránky služeb | ✅ Funguje | Nízká | Vysoká |
| Blog články | ✅ Funguje | Nízká | Střední |
| Kontaktní formuláře | ⚠️ Mailto only | Nízká | Vysoká |
| Navigace a routing | ✅ Funguje | Nízká | Kritická |
| Smooth scrolling | ✅ Funguje | Nízká | Nízká |
| Responsive design | ✅ Funguje | Střední | Kritická |

---

## 2. Homepage (/)

### 2.1 Struktura
Homepage je rozdělena do 14 hlavních sekcí:

```
1. Hero sekce (nadpis + popis)
2. Hero Carousel (4 obrázky)
3. Partners Strip
4. Highlights (carousel s přednostmi)
5. Why section (proč si vybrat SW Beauty)
6. Products carousel (služby)
7. Testimonials (reference klientů)
8. Subscribe CTA
9. FAQ (často kladené otázky)
10. Consultation CTA
11. Blog (3 nejnovější články)
12. Voucher section (dárkové poukazy)
13. Contact & Map section
14. Footer
```

### 2.2 Interaktivní prvky
- **Hero Carousel:** Auto-play každých 5 sekund, pause on hover
- **Highlights Carousel:** Auto-scroll 40px/s
- **Products Carousel:** Manuální scroll s šipkami
- **Testimonials Carousel:** Manuální scroll s šipkami
- **FAQ:** Expandable/collapsible (předpokládáno)
- **Formuláře:** 3 formuláře (Contact, Voucher, Subscribe)

### 2.3 Data na homepage
```typescript
// Statická data (hardcoded v page.tsx)
- heroSlides: 4 obrázky
- trustedFaces: 3 obrázky (NEPOUŽITO)
- heroHighlights: 3 položky (NEPOUŽITO)
- whyLeft: 2 karty
- whyRight: 2 karty
- testimonials: 6 referencí
- faqs: 4 otázky
- blogPosts: 3 články
- products: 6 služeb (inline data)
```

**⚠️ Problém:** Všechna data jsou hardcoded v komponentě (457 řádků)

---

## 3. Ceník (/cenik)

### 3.1 Funkce
- **Načítání dat:** Fetch z `/api/pricelist`
- **Filtrování:** Podle kategorií (dynamické tlačítka)
- **Zobrazení:** Grid layout (2 sloupce na desktop)
- **Groupování:** Automatické podle CategoryName

### 3.2 Datový tok
```
1. useEffect() → fetch('/api/pricelist')
2. Parsování kategorií (unique CategoryName)
3. Filtrování podle selectedCategory
4. Groupování položek podle kategorie
5. Render PriceCard komponent
```

### 3.3 Typy dat
```typescript
type PriceItem = {
  CategoryId: string;
  CategoryName: string;
  PackageName: string;
  Price: string;
  Sessions: string;
  Description: string;
}
```

**⚠️ Problém:** Typ je definován 3x (cenik/page.tsx, sluzby/*/page.tsx, api/route.ts)

### 3.4 CSV formát
```csv
CategoryId,CategoryName,PackageName,Price,Sessions,Description
hifu,HIFU FACELIFT,Celý obličej,5500,1,"Kompletní lifting obličeje"
```

---

## 4. Služby (/sluzby/*)

### 4.1 Dostupné služby
```
/sluzby/hifu-facelift         - HIFU 7D Facelift
/sluzby/endos-roller          - Endos-roller
/sluzby/ems-budovani-svalu    - EMS budování svalů
/sluzby/kavitace              - Kavitace
/sluzby/kosmetika             - Kosmetika
```

### 4.2 Struktura stránky služby
```
1. Hero sekce (název + popis)
2. Featured image
3. About section (Co je to? + Výhody)
4. Pricing section (fetch z API)
5. CTA section (Objednat konzultaci)
6. Related article (link na blog)
```

### 4.3 Dynamické načítání cen
```typescript
useEffect(() => {
  fetch("/api/pricelist")
    .then(res => res.json())
    .then(data => {
      // Filtrování podle CategoryName
      const filtered = data.filter(item => 
        item.CategoryName === "HIFU FACELIFT"
      );
      setPrices(filtered);
    });
}, []);
```

**✅ Výhoda:** Ceny jsou centralizované v CSV
**⚠️ Problém:** Každá stránka služby fetchuje celý ceník

---

## 5. Blog (/blog/*)

### 5.1 Dostupné články
```
/blog/hifu-7d-revoluce-v-omlazovani
/blog/jak-funguje-endos-roller
/blog/ems-budovani-svalu
```

### 5.2 Struktura článku
```
1. Hero sekce (datum + nadpis + perex)
2. Featured image
3. Obsah článku (prose styling)
4. CTA section (Zobrazit ceník / Kontaktovat)
5. Social share (Instagram link)
6. Footer
```

### 5.3 Obsah
- **Formát:** Statický HTML/JSX
- **Styling:** Tailwind prose classes
- **Obrázky:** Lokální z /public/images/

**⚠️ Problém:** Články jsou hardcoded, není CMS

---

## 6. API Endpointy

### 6.1 GET /api/pricelist

**Funkce:**
- Načte `public/pricelist.csv`
- Parsuje CSV (custom parser)
- Vrátí JSON array

**Implementace:**
```typescript
export async function GET() {
  try {
    const file = path.join(process.cwd(), "public", "pricelist.csv");
    const csv = await fs.readFile(file, "utf-8");
    const items = parseCSV(csv);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load pricelist" }, 
      { status: 500 }
    );
  }
}
```

**Custom CSV Parser:**
- Podporuje quoted fields
- Odstraňuje BOM (`\ufeff`)
- Parsuje řádek po řádku
- Mapuje na PriceItem typ

**✅ Výhody:**
- Funguje spolehlivě
- Žádné externí závislosti (papaparse není použit)

**⚠️ Nevýhody:**
- Chybí error handling pro malformed CSV
- Chybí validace dat
- Nepoužívá nainstalovaný papaparse

---

## 7. Formuláře

### 7.1 ContactForm
**Umístění:** Homepage (Contact & Map section)

**Pole:**
- Jméno a příjmení (required)
- Email (required)
- Telefon (optional)
- Zpráva (required)

**Funkce:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const subject = encodeURIComponent(`Kontakt z webu - ${formData.name}`);
  const body = encodeURIComponent(
    `Jméno: ${formData.name}\nEmail: ${formData.email}\n...`
  );
  
  window.location.href = `mailto:info@swbeauty.cz?subject=${subject}&body=${body}`;
  
  setSubmitted(true);
  // Reset po 3 sekundách
};
```

**⚠️ Problém:** 
- Používá `mailto:` protokol (otevře email klienta)
- Není backend pro ukládání zpráv
- Není email notifikace
- Není CAPTCHA (spam protection)

### 7.2 VoucherForm
**Umístění:** Homepage (Voucher section)

**Pole:**
- Jméno obdarovaného
- Email kupujícího
- Hodnota poukazu
- Osobní věnování

**Funkce:** Stejná jako ContactForm (mailto)

### 7.3 SubscribeForm
**Umístění:** Homepage (Subscribe CTA)

**Pole:**
- Email (required)

**Funkce:** Stejná jako ContactForm (mailto)

**⚠️ Problém:**
- Není integrace s email marketing službou (Mailchimp, ConvertKit)
- Není databáze pro ukládání emailů

---

## 8. Navigace

### 8.1 Navbar
**Typ:** Sticky header

**Funkce:**
- Scroll detection (mění styl po scrollu)
- Mobile menu (hamburger)
- Desktop menu (inline links)
- Instagram link

**Menu položky:**
```
- Domů (/)
- Přednosti (#highlights)
- Služby (#products)
- Ceník (/cenik)
- FAQ (#faq)
```

**Responsive:**
- Desktop: Inline menu + Instagram icon
- Mobile: Hamburger menu (slide-in)

### 8.2 Footer
**Obsah:**
- Logo + popis
- Rychlé odkazy (anchor links)
- Služby (links)
- Kontakt (email, telefon, social)
- Copyright + legal links

**⚠️ Problém:** Legal links (#) nikam nevedou

---

## 9. Interaktivní komponenty

### 9.1 Carousel
**Typy:**
1. **HeroCarousel:** Auto-play, controls, dots
2. **Carousel (generic):** Auto-scroll nebo manual, infinite loop

**Funkce:**
- Infinite scroll (triplikace children)
- Auto-play s pause on hover
- Navigation arrows
- Smooth scrolling

**Implementace:**
```typescript
// Infinite loop pomocí triplikace
const renderItems = [...items, ...items, ...items];

// Auto-scroll pomocí requestAnimationFrame
const step = (now: number) => {
  el.scrollLeft += autoSpeed * dt;
  // Wrap around při dosažení konce
};
```

### 9.2 FAQ
**Funkce:** Expandable/collapsible otázky

**⚠️ Poznámka:** Implementace není vidět v přečtených souborech

### 9.3 Smooth Scroll
**Knihovna:** Lenis

**Konfigurace:**
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});
```

**Efekt:** Plynulý scroll na celém webu

---

## 10. Responsive Design

### 10.1 Breakpointy (Tailwind)
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### 10.2 Responsive prvky
- **Navbar:** Desktop menu → Mobile hamburger
- **Grid layouts:** 1 col → 2 cols → 3 cols
- **Typography:** Responsive font sizes
- **Images:** Responsive aspect ratios
- **Carousel:** Responsive item widths

---

## 11. SEO & Metadata

### 11.1 Metadata
**⚠️ Chybí:**
- Meta description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)

**✅ Přítomno:**
- `lang="cs"` na `<html>`
- Semantic HTML (header, main, section, footer)

### 11.2 Accessibility
**✅ Dobré:**
- Alt texty na obrázcích
- Aria labels na tlačítkách
- Semantic HTML

**⚠️ Chybí:**
- Skip to content link
- Focus indicators
- ARIA live regions

---

## 12. Performance

### 12.1 Image Optimization
**✅ Používá Next.js Image:**
- Automatická optimalizace
- Lazy loading
- Responsive images
- WebP format

**Příklad:**
```tsx
<Image 
  src="/images/service-hifu.jpg" 
  alt="HIFU" 
  fill 
  sizes="(min-width: 1024px) 1152px, 100vw"
  className="object-cover" 
/>
```

### 12.2 Code Splitting
**✅ Automatické:**
- Next.js App Router automaticky splituje kód
- Každá route je samostatný chunk

### 12.3 Loading States
**⚠️ Chybí:**
- Loading skeletons
- Suspense boundaries
- Error boundaries

---

## 13. Chybějící funkce

### 13.1 Kritické
1. **Backend pro formuláře**
   - Email notifikace
   - Databáze pro ukládání zpráv
   - CAPTCHA

2. **SEO metadata**
   - Meta tags
   - Open Graph
   - Structured data

### 13.2 Důležité
1. **CMS pro blog**
   - Markdown nebo headless CMS
   - Dynamické načítání článků

2. **Email marketing**
   - Integrace s Mailchimp/ConvertKit
   - Newsletter management

3. **Analytics**
   - Google Analytics
   - Conversion tracking

### 13.3 Nice-to-have
1. **Animace**
   - Framer Motion transitions
   - Scroll animations

2. **Dark mode**
   - next-themes implementace

3. **Online booking**
   - Kalendář s volnými termíny
   - Rezervační systém

---

## 14. Závěr

### Silné stránky:
- ✅ Čistá a intuitivní navigace
- ✅ Responsive design
- ✅ Dynamický ceník (CSV → API → UI)
- ✅ Smooth scrolling
- ✅ Image optimization

### Slabé stránky:
- ⚠️ Formuláře pouze mailto (není backend)
- ⚠️ Chybí SEO metadata
- ⚠️ Hardcoded obsah (není CMS)
- ⚠️ Chybí analytics
- ⚠️ Chybí loading states

### Celkové hodnocení: 7/10
- Web je funkční a dobře navržený
- Hlavní problém je absence backendu a SEO
- Doporučuji prioritizovat backend pro formuláře a SEO metadata