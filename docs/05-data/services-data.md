# Services Data Management

Komplexní dokumentace datového systému pro služby v SW Beauty projektu.

## Table of Contents

- [Přehled](#přehled)
- [Data Architecture](#data-architecture)
- [TypeScript Interfaces](#typescript-interfaces)
- [CSV Data Structure](#csv-data-structure)
- [Data Access Functions](#data-access-functions)
- [Kategorie a Subcategorie](#kategorie-a-subcategorie)
- [Image Management](#image-management)
- [Přidání Nové Služby](#přidání-nové-služby)
- [Data Flow](#data-flow)
- [Caching Strategy](#caching-strategy)
- [Best Practices](#best-practices)

---

## Přehled

SW Beauty používá **CSV-based data systém** pro správu služeb. Data jsou uložena v CSV souboru a transformována do TypeScript objektů za běhu.

### Klíčové Komponenty

1. **CSV File** - `/public/services/services.csv` - Source of truth
2. **Parser** - PapaParse - CSV parsing
3. **Data Layer** - `/src/lib/services.ts` - Business logic
4. **Type Definitions** - `/src/types/index.ts` - TypeScript types
5. **Cache** - In-memory caching pro performance

### Výhody CSV Systému

- **Snadná editace** - Excel, Google Sheets
- **Non-technical updates** - Klient může upravovat data
- **Version control** - Git tracking
- **Backup** - Jednoduché zálohy
- **Import/Export** - Snadná migrace

---

## Data Architecture

```
┌─────────────────────────────────────────────────┐
│  CSV File (public/services/services.csv)        │
│  - Source of truth                              │
│  - Editovatelný v Excel/Google Sheets           │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  PapaParse Parser (lib/services.ts)             │
│  - Parsuje CSV do objektů                       │
│  - Validace dat                                 │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Data Transformation (priceItemToService)       │
│  - Generuje slugy                               │
│  - Formátuje ceny                               │
│  - Přiřazuje obrázky                           │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  In-Memory Cache (servicesCache)                │
│  - Optimalizace performance                     │
│  - Automatické invalidation                     │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Data Access Functions                          │
│  - getAllServices()                             │
│  - getServiceBySlug()                           │
│  - getServicesByCategory()                      │
│  - getServiceCategories()                       │
└─────────────────────────────────────────────────┘
```

---

## TypeScript Interfaces

### PriceItem (Raw CSV Data)

```typescript
// src/types/index.ts
export type PriceItem = {
  category: string          // "Kosmetika", "HIFU Tvář", ...
  subcategory: string       // "Ošetření pleti", "Lifting", ...
  serviceType: string       // "single" | "package"
  name: string              // "Hydrafacial"
  shortDescription: string  // Krátký popis (1 věta)
  description: string       // Detailní popis (několik vět)
  duration: number          // Délka v minutách (0 = variabilní)
  sessions: number          // Počet sezení (0 = single)
  price: string             // Cena jako string "1500" nebo "1500-2000"
  benefits: string[]        // ["Benefit 1", "Benefit 2"]
  image: string             // Hlavní obrázek
  images?: string[]         // Galerie obrázků (optional)
}
```

### Service (Processed Data)

```typescript
// src/lib/services.ts
export type Service = {
  slug: string              // "kosmetika-hydrafacial"
  name: string              // "Hydrafacial"
  shortDescription: string  // Krátký popis
  description: string       // Detailní popis
  category: string          // "Kosmetika"
  categoryId: string        // "kosmetika" (slug)
  subcategory: string       // "Ošetření pleti"
  subcategoryId: string     // "osetreni-pleti" (slug)
  serviceType: string       // "single" | "package"
  duration: number | null   // 60 nebo null (variabilní)
  sessions: number | null   // 1 nebo null (single session)
  price: string             // "1 500 Kč" (formatted)
  priceNumber?: number      // 1500 (numeric pro sorting/filtering)
  benefits: string[]        // Pole benefitů
  image: string             // "/images/hydrafacial.jpg"
  images: string[]          // ["/images/hydrafacial-1.jpg", ...]
  isPackage: boolean        // true pokud je balíček
  isVariablePrice: boolean  // true pokud je rozsah cen
}
```

### ServiceCategory

```typescript
export type ServiceCategory = {
  id: string            // "kosmetika"
  name: string          // "Kosmetika"
  description: string   // Krátký popis kategorie
  priceRange: string    // "1 000 Kč – 5 000 Kč"
  slug: string          // "kosmetika" (stejné jako id)
  serviceCount: number  // Počet služeb v kategorii
}
```

### ServiceSubcategory

```typescript
export type ServiceSubcategory = {
  id: string            // "osetreni-pleti"
  categoryId: string    // "kosmetika"
  name: string          // "Ošetření pleti"
  description: string   // Krátký popis subcategorie
  priceRange: string    // "1 000 Kč – 3 000 Kč"
  serviceCount: number  // Počet služeb v subcategorii
}
```

---

## CSV Data Structure

### CSV File Location

```
public/services/services.csv
```

### CSV Headers (Columns)

| Header | Typ | Povinný | Popis | Příklad |
|--------|-----|---------|-------|---------|
| `Category` | string | Ano | Hlavní kategorie | "Kosmetika" |
| `Subcategory` | string | Ano | Podkategorie | "Ošetření pleti" |
| `ServiceType` | string | Ano | Typ služby | "single" nebo "package" |
| `Name` | string | Ano | Název služby | "Hydrafacial" |
| `ShortDescription` | string | Ano | Krátký popis | "Hloubkové čištění pleti" |
| `Description` | string | Ano | Detailní popis | "Kompletní popis..." |
| `Duration` | number | Ne | Délka v minutách | 60 |
| `Sessions` | number | Ne | Počet sezení | 1 |
| `Price` | string | Ano | Cena | "1500" |
| `Benefits` | string | Ne | Benefits (oddělené čárkami) | "Benefit1,Benefit2" |
| `Image` | string | Ne | Obrázek | "hydrafacial.jpg" |
| `Images` | string | Ne | Galerie (oddělené čárkami) | "img1.jpg,img2.jpg" |

### Example CSV Row

```csv
Category,Subcategory,ServiceType,Name,ShortDescription,Description,Duration,Sessions,Price,Benefits,Image,Images
Kosmetika,Ošetření pleti,single,Hydrafacial,Hloubkové čištění a hydratace pleti,Hydrafacial je pokročilá metoda hlubokého čištění...,60,1,1500,"Hloubkové čištění,Hydratace,Okamžité výsledky",hydrafacial.jpg,"hydrafacial-1.jpg,hydrafacial-2.jpg"
```

### Multiple Values

**Benefits** a **Images** jsou odděleny čárkami:

```csv
Benefits: "Benefit 1,Benefit 2,Benefit 3"
Images: "image1.jpg,image2.jpg,image3.jpg"
```

**Parser** je rozepíše do pole:

```typescript
benefits: ["Benefit 1", "Benefit 2", "Benefit 3"]
images: ["image1.jpg", "image2.jpg", "image3.jpg"]
```

### CSV Encoding

- **Encoding:** UTF-8 with BOM (Excel compatible)
- **Line Endings:** CRLF (`\r\n`) nebo LF (`\n`)
- **Quoted Fields:** Pokud obsahují čárky nebo nové řádky

---

## Data Access Functions

Všechny data access funkce jsou v `/src/lib/services.ts`.

### getAllServices()

Načte všechny služby z CSV.

```typescript
export async function getAllServices(): Promise<Service[]>
```

**Použití:**

```typescript
import { getAllServices } from '@/lib/services'

// V Server Component
const services = await getAllServices()
console.log(`Total services: ${services.length}`)
```

**Vrací:**
```typescript
[
  {
    slug: "kosmetika-hydrafacial",
    name: "Hydrafacial",
    category: "Kosmetika",
    categoryId: "kosmetika",
    price: "1 500 Kč",
    // ...
  },
  // ...
]
```

---

### getServiceBySlug()

Najde službu podle slug.

```typescript
export async function getServiceBySlug(slug: string): Promise<Service | null>
```

**Použití:**

```typescript
const service = await getServiceBySlug('kosmetika-hydrafacial')

if (service) {
  console.log(service.name)  // "Hydrafacial"
} else {
  console.log('Service not found')
}
```

**Slug Format:**
```
{categoryId}-{service-name-slug}

Examples:
- kosmetika-hydrafacial
- hifu-tvar-celkovy-lifting
- lpg-telo-celek
```

---

### getServicesByCategory()

Načte všechny služby v kategorii.

```typescript
export async function getServicesByCategory(
  categoryId: string
): Promise<Service[]>
```

**Použití:**

```typescript
const services = await getServicesByCategory('kosmetika')

console.log(`Services in Kosmetika: ${services.length}`)

for (const service of services) {
  console.log(`- ${service.name}`)
}
```

**Category IDs:**
- `kosmetika`
- `hifu-tvar`
- `hifu-telo`
- `endosphere`
- `kavitace`
- `lpg`
- `budovani-svalu`
- `ostatni-sluzby`
- `hydrafacial`

---

### getServicesBySubcategory()

Načte služby podle kategorie a subcategorie.

```typescript
export async function getServicesBySubcategory(
  categoryId: string,
  subcategoryId: string
): Promise<Service[]>
```

**Použití:**

```typescript
const services = await getServicesBySubcategory(
  'kosmetika',
  'osetreni-pleti'
)

console.log(`Services: ${services.length}`)
```

---

### getServiceCategories()

Načte všechny kategorie s metadata.

```typescript
export async function getServiceCategories(): Promise<ServiceCategory[]>
```

**Použití:**

```typescript
const categories = await getServiceCategories()

for (const category of categories) {
  console.log(`${category.name}: ${category.serviceCount} services`)
  console.log(`Price range: ${category.priceRange}`)
}
```

**Output:**

```
Kosmetika: 12 services
Price range: 800 Kč – 3 500 Kč

HIFU Tvář: 8 services
Price range: 2 500 Kč – 8 000 Kč
```

---

### getSubcategoriesByCategory()

Načte všechny subcategorie v kategorii.

```typescript
export async function getSubcategoriesByCategory(
  categoryId: string
): Promise<ServiceSubcategory[]>
```

**Použití:**

```typescript
const subcategories = await getSubcategoriesByCategory('kosmetika')

for (const sub of subcategories) {
  console.log(`${sub.name}: ${sub.serviceCount} services`)
}
```

---

### getMainServices()

Načte featured služby (jedna per kategorie).

```typescript
export async function getMainServices(): Promise<Service[]>
```

**Použití:**

```typescript
// Pro homepage featured services
const featured = await getMainServices()

// Returns max 8 services (jedna per kategorie)
```

---

### getCategories()

Načte seznam všech category IDs.

```typescript
export async function getCategories(): Promise<string[]>
```

**Použití:**

```typescript
const categories = await getCategories()
// ['kosmetika', 'hifu-tvar', 'hifu-telo', ...]
```

---

### getCategoryName()

Převede categoryId na human-readable název.

```typescript
export async function getCategoryName(categoryId: string): Promise<string>
```

**Použití:**

```typescript
const name = await getCategoryName('kosmetika')
console.log(name)  // "Kosmetika"
```

---

### formatPrice()

Formátuje cenu do českého formátu.

```typescript
export function formatPrice(price: number | string): string
```

**Použití:**

```typescript
formatPrice(1500)        // "1 500 Kč"
formatPrice("1500")      // "1 500 Kč"
formatPrice("Na dotaz")  // "Na dotaz"
```

---

## Kategorie a Subcategorie

### Hlavní Kategorie

| ID | Název | Popis |
|----|-------|-------|
| `kosmetika` | Kosmetika | Profesionální kosmetické ošetření |
| `hifu-tvar` | HIFU Tvář | Pokročilý HIFU lifting obličeje |
| `hifu-telo` | HIFU Tělo | Hloubkové HIFU tvarování těla |
| `endosphere` | Endosphere | Kompresní mikro-vibrace |
| `kavitace` | Kavitace | Ultrazvuková kavitace |
| `lpg` | LPG | Mechanická endermologie |
| `budovani-svalu` | Budování svalů | EMS tréninky |
| `hydrafacial` | Hydrafacial | Hloubkové čištění pleti |
| `ostatni-sluzby` | Ostatní služby | Doplňkové služby |

### Category Descriptions

Descriptions jsou definované v `CATEGORY_DESCRIPTIONS`:

```typescript
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  kosmetika: 'Profesionální kosmetické ošetření pro zdravou, jasnou pleť.',
  'hifu-tvar': 'Pokročilý HIFU lifting pro zpevnění kontur obličeje...',
  'hifu-telo': 'Hloubkové HIFU tvarování těla podle potřeb vaší postavy.',
  // ...
}
```

---

## Image Management

### Image Path Resolution

```typescript
function sanitizeImage(image: string): string {
  if (!image) return DEFAULT_IMAGE
  const trimmed = image.trim()
  if (!trimmed) return DEFAULT_IMAGE
  if (trimmed.startsWith('http')) return trimmed  // External URL
  return `/images/${trimmed}`  // Local path
}
```

### Default Image

```typescript
const DEFAULT_IMAGE = '/images/service-ostatni.jpg'
```

Použit, pokud:
- Image není specifikován v CSV
- Image path je prázdný
- Image soubor neexistuje

### Image Fallback System

1. **CSV Image** - Primární obrázek z CSV
2. **Category Mosaic** - Dynamické obrázky z `/public/images/`
3. **Default Image** - Fallback generic obrázek

### Category Mosaic

Automaticky načte obrázky pro kategorii:

```typescript
// Server-side image loading
const mosaic = await getCategoryMosaicServer(categoryId)

// mosaic = [
//   '/images/kosmetika-01.jpg',
//   '/images/kosmetika-02.jpg',
//   ...
// ]
```

### Image Naming Convention

```
/public/images/
├── service-kosmetika.jpg      # Default pro kategorii
├── kosmetika-01.jpg           # Mosaic image 1
├── kosmetika-02.jpg           # Mosaic image 2
├── hydrafacial-1.jpg          # Service-specific
└── hydrafacial-2.jpg          # Gallery image
```

---

## Přidání Nové Služby

### Krok 1: Přidání do CSV

Otevřete `/public/services/services.csv` a přidejte nový řádek:

```csv
Category,Subcategory,ServiceType,Name,ShortDescription,Description,Duration,Sessions,Price,Benefits,Image,Images
Kosmetika,Ošetření pleti,single,Nová služba,Krátký popis,Detailní popis služby...,45,1,1200,"Benefit1,Benefit2",nova-sluzba.jpg,""
```

### Krok 2: Přidání Obrázku (Optional)

Pokud máte vlastní obrázek:

1. Přidejte obrázek do `/public/images/`
2. Pojmenujte např. `nova-sluzba.jpg`
3. Specifikujte v CSV: `Image: "nova-sluzba.jpg"`

Pokud nemáte obrázek:
- Systém automaticky použije category mosaic
- Nebo default image

### Krok 3: Ověření

```bash
# Restart dev server
bun run dev

# Otevřete prohlížeč
# Přejděte na /sluzby/[kategorie]
# Zkontrolujte, že se služba zobrazuje
```

### Krok 4: Clear Cache (pokud potřeba)

```typescript
// V development console
import { clearServicesCache } from '@/lib/services'
clearServicesCache()
```

### Krok 5: Commit Changes

```bash
git add public/services/services.csv
git add public/images/nova-sluzba.jpg  # pokud přidáváte obrázek
git commit -m "feat: add Nová služba to Kosmetika category"
git push
```

---

## Data Flow

### 1. CSV Loading

```
/public/services/services.csv
    ↓
getPriceListFile() (server-side)
    ↓
CSV text content
```

### 2. Parsing

```
CSV text
    ↓
parseCSV() (PapaParse)
    ↓
PriceItem[]
```

### 3. Transformation

```
PriceItem[]
    ↓
priceItemToService() (for each)
    ↓
Service[]
```

### 4. Caching

```
Service[]
    ↓
servicesCache (in-memory)
    ↓
Cached for subsequent calls
```

### 5. Data Access

```
Cached Service[]
    ↓
Data Access Functions
    ↓
Components/Pages
```

---

## Caching Strategy

### In-Memory Cache

```typescript
let servicesCache: Service[] | null = null
let servicesLoading: Promise<Service[]> | null = null
```

**Benefits:**
- **Fast** - Žádné disk I/O po prvním načtení
- **Simple** - Žádná external cache (Redis, etc.)
- **Automatic** - Invalidace při restartu

**Limitations:**
- **Per-instance** - Každý server proces má vlastní cache
- **Cleared on restart** - Cache se vymaže při restartu serveru

### Cache Flow

```typescript
async function loadServices(): Promise<Service[]> {
  // 1. Return cached if available
  if (servicesCache) {
    return servicesCache
  }

  // 2. Prevent duplicate loading
  if (!servicesLoading) {
    servicesLoading = (async () => {
      const csvContent = await getPriceListFile()
      const items = parseCSV(csvContent)
      return Promise.all(items.map(priceItemToService))
    })()

    servicesCache = await servicesLoading
    servicesLoading = null
  }

  return servicesCache ?? []
}
```

### Manual Cache Clear

```typescript
export function clearServicesCache() {
  servicesCache = null
}

// Použití
import { clearServicesCache } from '@/lib/services'
clearServicesCache()
```

**Kdy použít:**
- Po aktualizaci CSV v development
- Po změně image paths
- Pro debugging

---

## Best Practices

### 1. CSV Editing

**✅ Good:**
- Editovat v Google Sheets nebo Excel
- Export jako UTF-8 CSV
- Testovat po každé změně

**❌ Bad:**
- Editovat přímo v text editoru (risk of syntax errors)
- Použít jiné encoding než UTF-8
- Nedělat backup

### 2. Image Paths

**✅ Good:**
```csv
Image: "hydrafacial.jpg"
Image: "/images/hydrafacial.jpg"
Image: "https://external.com/image.jpg"
```

**❌ Bad:**
```csv
Image: "images/hydrafacial.jpg"  # Missing leading /
Image: "../public/images/img.jpg"  # Relative path
```

### 3. Price Formatting

**✅ Good:**
```csv
Price: "1500"
Price: "1500-2000"
Price: "Na dotaz"
```

**❌ Bad:**
```csv
Price: "1 500"       # S mezerou
Price: "1500 Kč"     # S jednotkou (přidá se automaticky)
Price: "1,500"       # Čárka místo pomlčky
```

### 4. Benefits

**✅ Good:**
```csv
Benefits: "Benefit1,Benefit2,Benefit3"
Benefits: "Hloubkové čištění,Hydratace,Okamžité výsledky"
```

**❌ Bad:**
```csv
Benefits: "Benefit1; Benefit2"  # Středník místo čárky
Benefits: "Benefit1, Benefit2"  # Mezera po čárce (bude trimmed, ale lepší bez)
```

### 5. Data Access

**✅ Good:**
```typescript
// V Server Component
const services = await getAllServices()

// Cache se používá automaticky
const service = await getServiceBySlug(slug)
```

**❌ Bad:**
```typescript
// Opakované loading bez cachování
const services1 = await fetch('/api/pricelist').then(r => r.json())
const services2 = await fetch('/api/pricelist').then(r => r.json())
```

### 6. Type Safety

**✅ Good:**
```typescript
import type { Service, PriceItem } from '@/types'

function processService(service: Service) {
  console.log(service.name)  // Type-safe
}
```

**❌ Bad:**
```typescript
function processService(service: any) {
  console.log(service.name)  // No type checking
}
```

---

## Advanced Topics

### Custom Data Transformations

Pokud potřebujete upravit data transformation logic:

```typescript
// src/lib/services.ts

async function priceItemToService(item: PriceItem): Promise<Service> {
  // Custom logic here
  const categoryId = createSlug(item.category)

  // Add custom fields
  const customField = deriveCustomField(item)

  return {
    // ... standard fields
    customField,  // Add custom data
  }
}
```

### Dynamic Pricing

Pro dynamické ceny (např. sezonní):

```typescript
function calculateDynamicPrice(basePrice: number): string {
  const now = new Date()
  const month = now.getMonth()

  // Sezonní sleva v lednu
  if (month === 0) {
    return formatPrice(basePrice * 0.9)
  }

  return formatPrice(basePrice)
}
```

### Service Variants

Pro služby s variantami (různé délky, ceny):

```csv
Name,Duration,Price
Hydrafacial Basic,45,1200
Hydrafacial Premium,60,1800
Hydrafacial Deluxe,90,2500
```

Parser automaticky vytvoří 3 samostatné služby.

---

## Troubleshooting

### Problém: Služby se nenačítají

**Řešení:**

```bash
# Zkontrolujte existenci CSV
ls -la public/services/services.csv

# Zkontrolujte syntax
cat public/services/services.csv | head -5

# Clear cache
# V konzoli:
clearServicesCache()
```

### Problém: Obrázky se nezobrazují

**Řešení:**

```bash
# Zkontrolujte image paths
ls -la public/images/ | grep hydrafacial

# Ověřte path v CSV
cat public/services/services.csv | grep hydrafacial
```

### Problém: Nesprávné kategorie slugy

**Řešení:**

Zkontrolujte `createSlug()` funkci:

```typescript
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')           // Normalize unicode
    .replace(/[^\w\s-]/g, '')  // Remove special chars
    .replace(/\s+/g, '-')       // Spaces to hyphens
    .replace(/-+/g, '-')        // Multiple hyphens to single
    .replace(/^-+|-+$/g, '')    // Trim hyphens
}
```

---

## Summary

SW Beauty services data systém:

- **CSV-based** - Snadná editace dat
- **Type-safe** - TypeScript interfaces
- **Cached** - In-memory caching pro performance
- **Flexible** - Support pro kategorie, subcategorie, packages
- **Image-smart** - Automatické fallbacky a mosaic
- **Developer-friendly** - Intuitivní API

---

**Zpět na:** [Hlavní dokumentace](../README.md)
