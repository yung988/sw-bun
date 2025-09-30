# Analýza obsahu a SEO

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Struktura obsahu

### 1.1 Přehled stránek
| Stránka | URL | Typ | Obsah | SEO Score |
|---------|-----|-----|-------|-----------|
| Homepage | `/` | Landing | Kompletní prezentace | 4/10 |
| Ceník | `/cenik` | Dynamická | Ceník služeb | 3/10 |
| HIFU Facelift | `/sluzby/hifu-facelift` | Služba | Detail služby | 4/10 |
| Endos-roller | `/sluzby/endos-roller` | Služba | Detail služby | 4/10 |
| EMS | `/sluzby/ems-budovani-svalu` | Služba | Detail služby | 4/10 |
| Kavitace | `/sluzby/kavitace` | Služba | Detail služby | 4/10 |
| Kosmetika | `/sluzby/kosmetika` | Služba | Detail služby | 4/10 |
| Blog HIFU | `/blog/hifu-7d-revoluce-v-omlazovani` | Článek | Informační | 5/10 |
| Blog Endos | `/blog/jak-funguje-endos-roller` | Článek | Informační | 5/10 |
| Blog EMS | `/blog/ems-budovani-svalu` | Článek | Informační | 5/10 |

**Celkem:** 10 stránek

---

## 2. Homepage analýza

### 2.1 Struktura nadpisů
```html
<h1>Profesionální péče o vaši krásu !</h1>
<h2>Proč si vybrat SW Beauty salon</h2>
<h2>Dopřejte si profesionální péči v moderním salonu</h2>
<h2>Objevte naši nabídku ošetření</h2>
<h2>Co říkají naši spokojení klienti</h2>
<h2>Máte dotaz? Rádi vám pomůžeme.</h2>
<h2>Domluvte si konzultaci ještě dnes.</h2>
<h2>Nejnovější články pro vás</h2>
<h2>Darujte relaxaci a krásu</h2>
<h2>Navštivte nás v salonu</h2>
```

**✅ Dobré:**
- Jeden H1 (správně)
- Logická hierarchie
- Klíčová slova v nadpisech

**⚠️ Problémy:**
- Příliš mnoho H2 (10x)
- Chybí H3 pro podnadpisy
- Některé H2 by měly být H3

### 2.2 Klíčová slova
**Primární:**
- Kosmetický salon
- HIFU facelift
- Endos-roller
- EMS budování svalů
- Profesionální kosmetika

**Sekundární:**
- Omlazení
- Lifting obličeje
- Formování postavy
- Kavitace
- Prodlužování vlasů

**Hustota klíčových slov:** Přiměřená (2-3%)

### 2.3 Obsah
**Délka:** ~2500 slov (odhad)

**Struktura:**
1. Hero sekce (50 slov)
2. Přednosti (200 slov)
3. Proč SW Beauty (150 slov)
4. Služby (300 slov)
5. Reference (150 slov)
6. FAQ (200 slov)
7. Blog preview (100 slov)
8. Kontakt (100 slov)

**✅ Dobré:**
- Dostatečná délka pro SEO
- Přirozené použití klíčových slov
- Strukturovaný obsah

**⚠️ Problémy:**
- Chybí meta description
- Chybí alt texty u některých obrázků
- Chybí internal linking

---

## 3. SEO Metadata

### 3.1 Aktuální stav
**⚠️ KRITICKÝ PROBLÉM:** Žádná stránka nemá SEO metadata!

**Chybí:**
```html
<!-- Title tag -->
<title>SW Beauty - Profesionální kosmetický salon | HIFU, Endos-roller, EMS</title>

<!-- Meta description -->
<meta name="description" content="...">

<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">

<!-- Canonical URL -->
<link rel="canonical" href="...">
```

### 3.2 Doporučená metadata

#### Homepage
```typescript
export const metadata = {
  title: 'SW Beauty - Profesionální kosmetický salon | HIFU, Endos-roller, EMS',
  description: 'Moderní kosmetický salon v Praze. Nabízíme HIFU 7D facelift, Endos-roller, EMS budování svalů, profesionální kosmetiku a prodlužování vlasů. Rezervujte si termín!',
  keywords: ['kosmetický salon', 'HIFU facelift', 'Endos-roller', 'EMS', 'kosmetika Praha'],
  openGraph: {
    title: 'SW Beauty - Profesionální kosmetický salon',
    description: 'Moderní technologie HIFU, Endos-roller, EMS a profesionální kosmetika.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty - Profesionální kosmetický salon',
    description: 'Moderní technologie HIFU, Endos-roller, EMS a profesionální kosmetika.',
    images: ['/images/hero-image.jpg'],
  },
}
```

#### Stránky služeb
```typescript
// /sluzby/hifu-facelift
export const metadata = {
  title: 'HIFU 7D Facelift - Neinvazivní lifting obličeje | SW Beauty',
  description: 'HIFU 7D facelift - neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku. Okamžitý efekt, dlouhodobé výsledky bez operace. Cena od 5500 Kč.',
  keywords: ['HIFU facelift', 'neinvazivní lifting', 'omlazení obličeje', 'HIFU 7D'],
}
```

#### Blog články
```typescript
// /blog/hifu-7d-revoluce-v-omlazovani
export const metadata = {
  title: 'HIFU 7D - revoluce v omlazování | SW Beauty Blog',
  description: 'Zjistěte vše o HIFU 7D technologii - jak funguje, jaké má výhody a pro koho je vhodná. Neinvazivní lifting bez operace s okamžitým efektem.',
  keywords: ['HIFU 7D', 'omlazování', 'lifting', 'ultrazvuk'],
  openGraph: {
    type: 'article',
    publishedTime: '2025-01-15',
  },
}
```

---

## 4. Structured Data (JSON-LD)

### 4.1 Aktuální stav
**⚠️ CHYBÍ:** Žádná structured data

### 4.2 Doporučená implementace

#### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "SW Beauty",
  "image": "https://swbeauty.cz/images/hero-image.jpg",
  "description": "Profesionální kosmetický salon v Praze",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vaše ulice 123",
    "addressLocality": "Praha",
    "postalCode": "110 00",
    "addressCountry": "CZ"
  },
  "telephone": "+420123456789",
  "email": "info@swbeauty.cz",
  "url": "https://swbeauty.cz",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500"
  }
}
```

#### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "HIFU 7D Facelift",
  "provider": {
    "@type": "BeautySalon",
    "name": "SW Beauty"
  },
  "description": "Neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku",
  "offers": {
    "@type": "Offer",
    "price": "5500",
    "priceCurrency": "CZK"
  }
}
```

#### Article Schema (pro blog)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "HIFU 7D - revoluce v omlazování",
  "image": "https://swbeauty.cz/images/service-hifu.jpg",
  "datePublished": "2025-01-15",
  "author": {
    "@type": "Organization",
    "name": "SW Beauty"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SW Beauty",
    "logo": {
      "@type": "ImageObject",
      "url": "https://swbeauty.cz/logo.svg"
    }
  }
}
```

---

## 5. Obsah služeb

### 5.1 HIFU Facelift
**Délka:** ~800 slov

**Struktura:**
- Co je HIFU 7D (150 slov)
- Jak funguje (150 slov)
- Výhody (100 slov)
- Pro koho je vhodné (150 slov)
- Průběh ošetření (100 slov)
- Péče po ošetření (100 slov)
- Ceník (dynamický)

**✅ Dobré:**
- Dostatečná délka
- Informativní obsah
- Strukturované sekce
- Klíčová slova

**⚠️ Problémy:**
- Chybí FAQ sekce
- Chybí before/after fotky
- Chybí video

### 5.2 Ostatní služby
**Status:** Podobná struktura jako HIFU

**Doporučení:**
- Přidat unikátní obsah pro každou službu
- Přidat FAQ specifické pro službu
- Přidat fotogalerii

---

## 6. Blog obsah

### 6.1 Aktuální články
1. **HIFU 7D - revoluce v omlazování**
   - Délka: ~1000 slov
   - Kvalita: Dobrá
   - SEO: 5/10

2. **Jak funguje Endos-roller**
   - Délka: ~800 slov (odhad)
   - Kvalita: Dobrá
   - SEO: 5/10

3. **EMS budování svalů**
   - Délka: ~800 slov (odhad)
   - Kvalita: Dobrá
   - SEO: 5/10

### 6.2 Doporučení pro blog
1. **Přidat více článků:**
   - Péče o pleť v zimě
   - Jak se připravit na HIFU ošetření
   - Rozdíl mezi HIFU a botoxem
   - 5 tipů pro zdravou pleť
   - Jak vybrat správné kosmetické ošetření

2. **Optimalizace stávajících článků:**
   - Přidat meta description
   - Přidat internal links
   - Přidat related articles
   - Přidat CTA tlačítka

3. **Přidat funkce:**
   - Komentáře
   - Sdílení na sociálních sítích
   - Newsletter signup
   - Related posts

---

## 7. Internal Linking

### 7.1 Aktuální stav
**⚠️ Slabý internal linking**

**Existující linky:**
- Navbar → Homepage, Ceník, Služby (anchor links)
- Homepage → Služby (carousel cards)
- Homepage → Blog (3 články)
- Služby → Ceník
- Služby → Blog (related article)
- Blog → Ceník

**Chybí:**
- Blog → Služby
- Služby → Ostatní služby
- Footer → Všechny stránky
- Breadcrumbs

### 7.2 Doporučená struktura
```
Homepage
├── Služby
│   ├── HIFU Facelift → Blog HIFU
│   ├── Endos-roller → Blog Endos
│   ├── EMS → Blog EMS
│   ├── Kavitace
│   └── Kosmetika
├── Ceník
└── Blog
    ├── HIFU článek → HIFU služba
    ├── Endos článek → Endos služba
    └── EMS článek → EMS služba
```

---

## 8. Obrázky a multimedia

### 8.1 Obrázky
**Celkem:** ~20 obrázků

**Formáty:**
- JPG (fotografie salonu, služeb)
- PNG (ikony, loga)
- SVG (logo)

**✅ Dobré:**
- Next.js Image optimization
- Lazy loading
- Responsive images

**⚠️ Problémy:**
- Některé obrázky nemají alt text
- Chybí descriptive file names
- Možná velká velikost originálů

### 8.2 Alt texty
**Příklady:**
```tsx
// ✅ Dobré
<Image src="/images/service-hifu.jpg" alt="HIFU 7D Facelift" />

// ⚠️ Obecné
<Image src="/images/salon/recepce.jpg" alt="Client 1" />

// ✅ Mělo by být
<Image src="/images/salon/recepce.jpg" alt="Recepce SW Beauty salonu v Praze" />
```

### 8.3 Video
**Přítomno:** `hero_1.mp4` (nepoužito)

**Doporučení:**
- Použít video v hero sekci
- Přidat video testimonials
- Přidat video průvodce ošetřením

---

## 9. URL struktura

### 9.1 Aktuální struktura
```
✅ Dobré:
/                                    (homepage)
/cenik                              (ceník)
/sluzby/hifu-facelift              (služba)
/blog/hifu-7d-revoluce-v-omlazovani (článek)

⚠️ Dlouhé:
/sluzby/ems-budovani-svalu         → /sluzby/ems
/blog/hifu-7d-revoluce-v-omlazovani → /blog/hifu-7d
```

### 9.2 Doporučení
- URL jsou SEO-friendly (kebab-case, české znaky)
- Zvážit zkrácení některých URL
- Přidat trailing slash policy

---

## 10. Mobile SEO

### 10.1 Mobile-friendly
**✅ Dobré:**
- Responsive design
- Mobile menu
- Touch-friendly buttons
- Readable font sizes

**⚠️ Problémy:**
- Chybí viewport meta tag test
- Chybí mobile-specific optimizations

### 10.2 Core Web Vitals (odhad)
| Metrika | Odhad | Status |
|---------|-------|--------|
| LCP (Largest Contentful Paint) | ~2.5s | ⚠️ Střední |
| FID (First Input Delay) | <100ms | ✅ Dobrý |
| CLS (Cumulative Layout Shift) | <0.1 | ✅ Dobrý |

**Doporučení:**
- Optimalizovat hero obrázky
- Přidat priority loading pro above-the-fold obsah
- Implementovat loading skeletons

---

## 11. Lokální SEO

### 11.1 Aktuální stav
**⚠️ Chybí:**
- Google My Business integrace
- Lokální klíčová slova
- Mapy.cz integrace
- Firmy.cz profil

### 11.2 Doporučení
1. **Google My Business:**
   - Vytvořit profil
   - Přidat fotky
   - Sbírat recenze

2. **Lokální klíčová slova:**
   - "kosmetický salon Praha"
   - "HIFU facelift Praha"
   - "Endos-roller Praha"

3. **NAP konzistence:**
   - Name, Address, Phone stejné všude
   - Footer, kontakt, GMB

---

## 12. Konkurenční analýza

### 12.1 Klíčová slova konkurence
**Hlavní konkurenti:**
- Kosmetické salony v Praze
- HIFU kliniky
- Wellness centra

**Klíčová slova k cílení:**
- "nejlepší kosmetický salon Praha"
- "HIFU facelift cena Praha"
- "Endos-roller zkušenosti"
- "EMS budování svalů Praha"

### 12.2 Content gap analýza
**Chybějící témata:**
- Porovnání HIFU vs. botox
- Péče o pleť podle věku
- Jak se připravit na ošetření
- FAQ pro každou službu
- Cenové kalkulačky

---

## 13. Technické SEO

### 13.1 Robots.txt
**⚠️ Chybí:** `robots.txt` soubor

**Doporučený obsah:**
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://swbeauty.cz/sitemap.xml
```

### 13.2 Sitemap.xml
**⚠️ Chybí:** `sitemap.xml`

**Doporučení:**
- Použít Next.js sitemap generátor
- Automaticky generovat při buildu

### 13.3 Canonical URLs
**⚠️ Chybí:** Canonical tags

**Doporučení:**
```tsx
<link rel="canonical" href="https://swbeauty.cz/sluzby/hifu-facelift" />
```

---

## 14. Akční plán SEO

### 14.1 Priorita 1 (Kritické)
1. ✅ **Přidat metadata na všechny stránky**
   - Title tags
   - Meta descriptions
   - Open Graph tags

2. ✅ **Vytvořit robots.txt a sitemap.xml**

3. ✅ **Přidat structured data (JSON-LD)**
   - LocalBusiness
   - Service
   - Article

### 14.2 Priorita 2 (Důležité)
1. **Optimalizovat alt texty obrázků**
2. **Zlepšit internal linking**
3. **Přidat FAQ sekce na stránky služeb**
4. **Vytvořit Google My Business profil**

### 14.3 Priorita 3 (Nice-to-have)
1. **Přidat více blog článků**
2. **Implementovat breadcrumbs**
3. **Přidat video obsah**
4. **Vytvořit cenové kalkulačky**

---

## 15. Závěr

### Silné stránky:
- ✅ Kvalitní obsah
- ✅ Logická struktura
- ✅ SEO-friendly URLs
- ✅ Responsive design

### Slabé stránky:
- ❌ Žádná SEO metadata
- ❌ Chybí structured data
- ❌ Slabý internal linking
- ❌ Chybí robots.txt a sitemap

### Celkové SEO skóre: 4/10

**Hlavní doporučení:**
1. Okamžitě přidat metadata na všechny stránky
2. Implementovat structured data
3. Vytvořit robots.txt a sitemap.xml
4. Zlepšit internal linking
5. Vytvořit Google My Business profil

**Potenciál:** Po implementaci doporučení → 8-9/10