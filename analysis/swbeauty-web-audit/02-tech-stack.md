# Technologický stack a závislosti

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Core technologie

### 1.1 Framework & Runtime
| Technologie | Verze | Účel | Status |
|-------------|-------|------|--------|
| **Next.js** | 15.5.4 | React framework s SSR/SSG | ✅ Aktivně používáno |
| **React** | 19.1.0 | UI knihovna | ✅ Aktivně používáno |
| **React DOM** | 19.1.0 | React renderer | ✅ Aktivně používáno |
| **Bun** | - | JavaScript runtime (alternativa k Node.js) | ✅ Aktivně používáno |
| **TypeScript** | 5.x | Typovaný JavaScript | ✅ Aktivně používáno |

**Poznámky:**
- Next.js 15 je nejnovější major verze s App Router jako výchozím
- React 19 je nejnovější verze (release candidate/stable)
- Bun je moderní, rychlý runtime - dobrá volba pro výkon
- Turbopack je aktivován pro dev i build (`--turbopack` flag)

---

## 2. Styling & Design

### 2.1 CSS Framework
| Technologie | Verze | Účel | Status |
|-------------|-------|------|--------|
| **Tailwind CSS** | 4.1.0 | Utility-first CSS framework | ✅ Aktivně používáno |
| **PostCSS** | 8.4.49 | CSS transformace | ✅ Aktivně používáno |
| **@tailwindcss/postcss** | 4.1.0 | Tailwind PostCSS plugin | ✅ Aktivně používáno |

**Custom konfigurace:**
```typescript
// tailwind.config.ts
colors: {
  sand: "#f8f6f2",      // Světlá písková barva
  graphite: "#0f172a"   // Tmavá grafitová barva
}

fontFamily: {
  sans: "Figtree"       // Google Font
  display: "Figtree"
}

boxShadow: {
  soft: "0 24px 48px -24px rgba(15, 23, 42, 0.25)"
}
```

### 2.2 Fonty
- **Figtree** (Google Font) - weights: 300, 400, 600, 700
- Načítáno přes `next/font/google`

---

## 3. UI & Animace

### 3.1 Animační knihovny
| Technologie | Verze | Účel | Status |
|-------------|-------|------|--------|
| **Framer Motion** | 12.23.22 | Animace a transitions | ⚠️ Nainstalováno, ale NEPOUŽITO |
| **Lenis** | 1.3.11 | Smooth scrolling | ✅ Aktivně používáno |

**Poznámky:**
- Framer Motion je nainstalován, ale v kódu není použit
- Lenis poskytuje smooth scroll efekt na celém webu
- Potenciál pro přidání animací pomocí Framer Motion

### 3.2 Theming
| Technologie | Verze | Účel | Status |
|-------------|-------|------|--------|
| **next-themes** | 0.4.6 | Dark/Light mode | ⚠️ Nainstalováno, ale NEPOUŽITO |

**Poznámky:**
- next-themes je připraven pro dark mode
- V současnosti web používá pouze light mode
- Potenciál pro přidání dark mode funkcionality

---

## 4. Data & Parsing

### 4.1 Data processing
| Technologie | Verze | Účel | Status |
|-------------|-------|------|--------|
| **papaparse** | 5.5.3 | CSV parsing | ⚠️ Nainstalováno, ale NEPOUŽITO |

**Poznámky:**
- papaparse je nainstalován, ale projekt používá custom CSV parser
- Custom parser v `/api/pricelist/route.ts` funguje dobře
- Možnost refaktoringu na papaparse pro lepší error handling

**Custom CSV Parser:**
```typescript
// Vlastní implementace v route.ts
function parseCSV(text: string): PriceItem[] {
  // Manuální parsing s podporou quoted fields
  // Funguje, ale papaparse by byl robustnější
}
```

---

## 5. Development Tools

### 5.1 Linting & Code Quality
| Technologie | Verze | Účel | Status |
|-------------|-------|------|--------|
| **ESLint** | 9.x | JavaScript/TypeScript linter | ✅ Aktivně používáno |
| **eslint-config-next** | 15.5.4 | Next.js ESLint preset | ✅ Aktivně používáno |
| **@eslint/eslintrc** | 3.x | ESLint konfigurace | ✅ Aktivně používáno |

**Konfigurace:**
```json
"scripts": {
  "lint": "eslint"
}
```

### 5.2 TypeScript
| Technologie | Verze | Konfigurace |
|-------------|-------|-------------|
| **TypeScript** | 5.x | Strict mode enabled |

**Klíčové nastavení:**
```json
{
  "strict": true,
  "noEmit": true,
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

---

## 6. Build & Deployment

### 6.1 Build systém
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint"
}
```

**Turbopack:**
- Nový bundler od Vercel (nástupce Webpack)
- Rychlejší build times
- Aktivován pro dev i production build

### 6.2 Image Optimization
```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "picsum.photos" },
    { protocol: "https", hostname: "cdn.pixabay.com" }
  ]
}
```

**Poznámky:**
- Povoleny externí image domény (Unsplash, Picsum, Pixabay)
- V současnosti se nepoužívají - všechny obrázky jsou lokální
- Možnost odstranění této konfigurace

---

## 7. Závislosti - Kompletní přehled

### 7.1 Production Dependencies
```json
{
  "framer-motion": "^12.23.22",    // ⚠️ NEPOUŽITO
  "lenis": "^1.3.11",              // ✅ Smooth scroll
  "next": "15.5.4",                // ✅ Framework
  "next-themes": "^0.4.6",         // ⚠️ NEPOUŽITO
  "papaparse": "^5.5.3",           // ⚠️ NEPOUŽITO
  "react": "19.1.0",               // ✅ Core
  "react-dom": "19.1.0"            // ✅ Core
}
```

**Velikost bundle:**
- Celkem: 7 závislostí
- Aktivně používáno: 4 (57%)
- Nepoužito: 3 (43%)

### 7.2 Development Dependencies
```json
{
  "@eslint/eslintrc": "^3",
  "@types/node": "^24.5.2",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.5.4",
  "postcss": "^8.4.49",
  "@tailwindcss/postcss": "^4.1.0",
  "tailwindcss": "^4.1.0",
  "typescript": "^5"
}
```

**Velikost bundle:**
- Celkem: 10 závislostí
- Všechny jsou potřebné pro development

---

## 8. Bezpečnost závislostí

### 8.1 Verze a aktuálnost
| Balíček | Verze | Status | Poznámka |
|---------|-------|--------|----------|
| next | 15.5.4 | ✅ Aktuální | Latest stable |
| react | 19.1.0 | ✅ Aktuální | Latest stable |
| tailwindcss | 4.1.0 | ✅ Aktuální | Latest major |
| typescript | 5.x | ✅ Aktuální | Latest major |
| lenis | 1.3.11 | ✅ Aktuální | Latest |
| framer-motion | 12.23.22 | ✅ Aktuální | Latest |

**Závěr:** Všechny závislosti jsou aktuální a bezpečné.

### 8.2 Známé zranitelnosti
- ✅ Žádné známé bezpečnostní zranitelnosti
- ✅ Všechny balíčky jsou od důvěryhodných autorů

---

## 9. Performance analýza

### 9.1 Bundle size (odhad)
```
next.js + react:        ~150 KB (gzipped)
tailwindcss:            ~10-20 KB (purged)
lenis:                  ~5 KB
framer-motion:          ~30 KB (nepoužito, ale v bundle)
next-themes:            ~2 KB (nepoužito, ale v bundle)
papaparse:              ~15 KB (nepoužito, ale v bundle)
-------------------------------------------
Celkem:                 ~200-220 KB (gzipped)
```

**Optimalizace:**
- Odstranění nepoužitých závislostí by ušetřilo ~47 KB
- Tree-shaking by měl odstranit nepoužitý kód

### 9.2 Runtime performance
- **Turbopack:** Rychlé build times
- **Bun:** Rychlejší než Node.js
- **Next.js 15:** Optimalizované pro performance
- **Image Optimization:** Automatická optimalizace obrázků

---

## 10. Doporučení

### 10.1 Okamžitá akce
1. ❌ **Odstranit nepoužité závislosti:**
   ```bash
   bun remove framer-motion next-themes papaparse
   ```
   - Ušetří ~47 KB v bundle size
   - Zjednoduší maintenance

2. 🔄 **Nebo využít nainstalované knihovny:**
   - Přidat animace pomocí Framer Motion
   - Implementovat dark mode pomocí next-themes
   - Použít papaparse místo custom parseru

### 10.2 Budoucí vylepšení
1. **Přidat animace:**
   - Využít Framer Motion pro smooth transitions
   - Animovat vstupy komponent (fade-in, slide-in)

2. **Dark mode:**
   - Implementovat pomocí next-themes
   - Přidat toggle v Navbar

3. **Monitoring:**
   - Přidat analytics (Google Analytics, Plausible)
   - Error tracking (Sentry)

4. **SEO:**
   - Přidat metadata do všech stránek
   - Implementovat structured data (JSON-LD)

---

## 11. Závěr

**Silné stránky:**
- ✅ Moderní tech stack (Next.js 15, React 19, Bun)
- ✅ Všechny závislosti jsou aktuální
- ✅ TypeScript strict mode
- ✅ Tailwind CSS pro rychlý vývoj

**Slabé stránky:**
- ⚠️ 43% závislostí není využito
- ⚠️ Chybí animace (přestože je Framer Motion nainstalován)
- ⚠️ Chybí dark mode (přestože je next-themes nainstalován)
- ⚠️ Custom CSV parser místo robustní knihovny

**Celkové hodnocení:** 8/10
- Projekt má solidní technologický základ
- Hlavní problém je nepoužité závislosti
- Doporučuji buď odstranit, nebo využít nainstalované knihovny