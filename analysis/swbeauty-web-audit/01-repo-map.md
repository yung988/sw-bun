# Mapa repozitáře SW Beauty

**Datum analýzy:** 30. září 2025  
**Analyzovaný projekt:** swbeauty-bun  
**Verze:** 0.1.0

---

## 1. Přehled projektu

SW Beauty je moderní webová prezentace kosmetického salonu postavená na Next.js 15 s využitím App Routeru. Projekt je zaměřen na prezentaci služeb (HIFU, Endos-roller, EMS, kosmetika), ceník a blog s informačními články.

### Klíčové charakteristiky:
- **Framework:** Next.js 15.5.4 (App Router)
- **Runtime:** Bun (moderní JavaScript runtime)
- **Styling:** Tailwind CSS 4.1.0
- **Animace:** Framer Motion 12.23.22
- **Smooth scroll:** Lenis 1.3.11
- **Jazyk:** TypeScript 5
- **React verze:** 19.1.0

---

## 2. Struktura adresářů

```
swbeauty-bun/
├── public/                      # Statické soubory
│   ├── images/                  # Obrázky
│   │   ├── salon/              # Fotografie salonu (8 souborů)
│   │   ├── team/               # Fotografie týmu (1 soubor)
│   │   └── *.png, *.jpg        # Služby a hero obrázky
│   ├── screenshots/            # Screenshoty (2 soubory)
│   ├── hero_1.mp4             # Video pro hero sekci
│   ├── logo.svg               # Logo
│   └── pricelist.csv          # Ceník ve formátu CSV
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpointy
│   │   │   └── pricelist/     # API pro načítání ceníku
│   │   ├── blog/              # Blog články (3 články)
│   │   ├── cenik/             # Stránka ceníku
│   │   ├── sluzby/            # Detailní stránky služeb (5 služeb)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Globální styly
│   │
│   └── components/            # React komponenty (16 komponent)
│
├── package.json               # Závislosti projektu
├── next.config.ts            # Konfigurace Next.js
├── tailwind.config.ts        # Konfigurace Tailwind CSS
├── tsconfig.json             # Konfigurace TypeScript
└── README.md                 # Dokumentace projektu
```

---

## 3. Mapování komponent

### 3.1 Layout komponenty
| Komponenta | Účel | Závislosti |
|------------|------|------------|
| `Navbar.tsx` | Hlavní navigace, sticky header | Next.js Link, Image, useState, useEffect |
| `SmoothScroll.tsx` | Smooth scrolling efekt | Lenis |

### 3.2 Hero & Carousel komponenty
| Komponenta | Účel | Závislosti |
|------------|------|------------|
| `HeroCarousel.tsx` | Hlavní carousel s obrázky | Next.js Image, useState, useEffect |
| `Carousel.tsx` | Univerzální carousel pro produkty/testimonials | React Children API, useRef |
| `VideoHero.tsx` | Video hero sekce | - |

### 3.3 Content komponenty
| Komponenta | Účel | Závislosti |
|------------|------|------------|
| `SectionTitle.tsx` | Nadpisy sekcí | - |
| `BlogCard.tsx` | Karta blogu | Next.js Link, Image |
| `ProductCard.tsx` | Karta produktu | Next.js Link, Image |
| `ProductGridCard.tsx` | Karta produktu v gridu | Next.js Link, Image |
| `PriceCard.tsx` | Karta ceníku | - |
| `TestimonialCard.tsx` | Karta s referencí | - |
| `WhyCard.tsx` | Karta "Proč nás vybrat" | - |
| `RatingSummary.tsx` | Souhrn hodnocení | - |
| `PartnersStrip.tsx` | Pás s partnery | - |

### 3.4 Formuláře
| Komponenta | Účel | Závislosti |
|------------|------|------------|
| `ContactForm.tsx` | Kontaktní formulář | useState (mailto link) |
| `VoucherForm.tsx` | Formulář pro dárkové poukazy | useState |
| `SubscribeForm.tsx` | Newsletter formulář | useState |

### 3.5 Interaktivní komponenty
| Komponenta | Účel | Závislosti |
|------------|------|------------|
| `FAQ.tsx` | Často kladené otázky | - |

---

## 4. Routing struktura

### 4.1 Hlavní stránky
```
/ (homepage)                    → src/app/page.tsx
/cenik                         → src/app/cenik/page.tsx
```

### 4.2 Služby
```
/sluzby/hifu-facelift         → src/app/sluzby/hifu-facelift/page.tsx
/sluzby/endos-roller          → src/app/sluzby/endos-roller/page.tsx
/sluzby/ems-budovani-svalu    → src/app/sluzby/ems-budovani-svalu/page.tsx
/sluzby/kavitace              → src/app/sluzby/kavitace/page.tsx
/sluzby/kosmetika             → src/app/sluzby/kosmetika/page.tsx
```

### 4.3 Blog
```
/blog/hifu-7d-revoluce-v-omlazovani    → src/app/blog/hifu-7d-revoluce-v-omlazovani/page.tsx
/blog/jak-funguje-endos-roller         → src/app/blog/jak-funguje-endos-roller/page.tsx
/blog/ems-budovani-svalu               → src/app/blog/ems-budovani-svalu/page.tsx
```

### 4.4 API endpointy
```
/api/pricelist                → src/app/api/pricelist/route.ts (GET)
```

---

## 5. Datové toky

### 5.1 Ceník (Pricelist)
```
public/pricelist.csv
    ↓
/api/pricelist (GET)
    ↓ (fetch)
/cenik (stránka ceníku)
/sluzby/* (detailní stránky služeb)
```

**Formát dat:**
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

### 5.2 Statický obsah
- **Obrázky:** Načítány z `/public/images/` pomocí Next.js Image
- **Logo:** `/public/logo.svg`
- **Video:** `/public/hero_1.mp4` (připraveno, ale nepoužito)

### 5.3 Formuláře
Všechny formuláře používají **mailto:** protokol pro odeslání dat:
- ContactForm → `mailto:info@swbeauty.cz`
- VoucherForm → `mailto:info@swbeauty.cz`
- SubscribeForm → `mailto:info@swbeauty.cz`

---

## 6. Vlastníci modulů

| Modul | Typ | Komplexita | Poznámka |
|-------|-----|------------|----------|
| Homepage (`page.tsx`) | Stránka | Vysoká | 457 řádků, obsahuje veškerý obsah homepage |
| API Pricelist | Backend | Střední | Custom CSV parser |
| Carousel | Komponenta | Vysoká | Komplexní logika pro infinite scroll |
| HeroCarousel | Komponenta | Střední | Auto-play carousel s controls |
| SmoothScroll | Utility | Nízká | Wrapper pro Lenis |
| Formuláře | Komponenty | Nízká | Jednoduché mailto formuláře |

---

## 7. Coupling (Provázanost)

### 7.1 Vysoká provázanost
- **Homepage** je silně provázána s téměř všemi komponentami (16 importů)
- **Navbar** je použita na všech stránkách
- **SectionTitle** je sdílena napříč stránkami

### 7.2 Nízká provázanost
- Blog články jsou nezávislé
- Stránky služeb jsou nezávislé (kromě API ceníku)
- Komponenty jsou většinou self-contained

### 7.3 Závislosti na externích knihovnách
```
framer-motion      → Animace (zatím nepoužito v kódu)
lenis             → Smooth scroll (SmoothScroll.tsx)
next-themes       → Dark mode (zatím nepoužito)
papaparse         → CSV parsing (zatím nepoužito, custom parser)
```

---

## 8. Modularita

### ✅ Dobře modulární
- Komponenty jsou rozděleny do samostatných souborů
- Každá stránka služby má vlastní soubor
- API endpoint je oddělen od UI

### ⚠️ Možnosti zlepšení
- Homepage je příliš velká (457 řádků) - data by měla být v samostatných souborech
- Chybí sdílené typy (PriceItem je definován 3x)
- Chybí utility funkce pro opakující se logiku

---

## 9. Konfigurace

### Next.js (`next.config.ts`)
```typescript
- Povolené remote image domény:
  - images.unsplash.com
  - picsum.photos
  - cdn.pixabay.com
- Turbopack enabled (dev & build)
```

### Tailwind CSS (`tailwind.config.ts`)
```typescript
- Custom barvy: sand (#f8f6f2), graphite (#0f172a)
- Custom font families: sans, display
- Custom shadow: soft
- Custom border radius: xl, lg
```

### TypeScript (`tsconfig.json`)
```typescript
- Strict mode: enabled
- Path alias: @/* → ./src/*
- Target: ES2017
```

---

## 10. Metriky projektu

| Metrika | Hodnota |
|---------|---------|
| Počet stránek | 10 (1 homepage + 1 ceník + 5 služeb + 3 blog) |
| Počet komponent | 16 |
| Počet API endpointů | 1 |
| Počet obrázků | ~20 |
| Velikost homepage | 457 řádků |
| Závislosti (prod) | 6 |
| Závislosti (dev) | 10 |

---

## 11. Závěr

Projekt má **čistou a logickou strukturu** s dobře organizovanými komponentami. Využívá moderní Next.js 15 App Router a TypeScript. Hlavní oblasti pro zlepšení jsou:

1. **Refaktoring homepage** - rozdělit data do samostatných souborů
2. **Sdílené typy** - vytvořit centrální soubor s TypeScript typy
3. **Využití nepoužitých knihoven** - framer-motion, next-themes, papaparse
4. **Optimalizace obrázků** - některé obrázky mohou být velké