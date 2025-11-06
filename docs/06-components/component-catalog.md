# Component Catalog

> Kompletní abecední katalog všech komponent v SW Beauty projektu

## Table of Contents

- [Animation Components](#animation-components)
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Provider Components](#provider-components)
- [Modal Components](#modal-components)

---

## Animation Components

### **CharReveal**

**Cesta:** `src/components/animations/CharReveal.tsx`
**Typ:** Client Component
**Účel:** Character-by-character text reveal animation při scrollování

**Props Interface:**
```typescript
type CharRevealProps = {
  children: string
  delay?: number       // Default: 0
  stagger?: number     // Default: 0.02
  className?: string
}
```

**Použití:**
```tsx
import CharReveal from '@/components/animations/CharReveal'

<CharReveal delay={0.2} stagger={0.03} className="text-4xl">
  Váš krásný text zde
</CharReveal>
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger plugin

**Poznámky:**
- Respektuje `prefers-reduced-motion`
- Text se rozděluje na jednotlivé znaky a každý se animuje s drobným zpožděním
- Ideální pro nadpisy a zvýrazněné texty

---

### **WordReveal**

**Cesta:** `src/components/animations/WordReveal.tsx`
**Typ:** Client Component
**Účel:** Word-by-word text reveal animation při scrollování

**Props Interface:**
```typescript
type WordRevealProps = {
  children: string
  delay?: number       // Default: 0
  stagger?: number     // Default: 0.05
  className?: string
}
```

**Použití:**
```tsx
import WordReveal from '@/components/animations/WordReveal'

<WordReveal stagger={0.08} className="text-2xl">
  Každé slovo se objeví postupně
</WordReveal>
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger plugin

**Poznámky:**
- Podobné jako CharReveal, ale animuje po slovech místo po znacích
- Vhodnější pro delší texty a odstavce

---

### **ScrollReveal**

**Cesta:** `src/components/animations/ScrollReveal.tsx`
**Typ:** Client Component
**Účel:** Univerzální scroll-triggered reveal animace s různými směry

**Props Interface:**
```typescript
type ScrollRevealProps = {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate'  // Default: 'up'
  delay?: number          // Default: 0
  duration?: number       // Default: 1
  className?: string
  triggerOnce?: boolean   // Default: true
}
```

**Použití:**
```tsx
import ScrollReveal from '@/components/animations/ScrollReveal'

<ScrollReveal direction="up" duration={1.2}>
  <div>Obsah, který se má odhalit</div>
</ScrollReveal>
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger plugin

**Poznámky:**
- Nejuniverzálnější animační komponenta
- Podporuje 6 různých směrů animace
- `triggerOnce` určuje, zda se animace spustí pouze jednou nebo při každém scrollu

---

### **HorizontalScroll**

**Cesta:** `src/components/animations/HorizontalScroll.tsx`
**Typ:** Client Component
**Účel:** Horizontální scroll sekce - scrolluje vodorovně při svislém scrollování

**Props Interface:**
```typescript
type HorizontalScrollProps = {
  children: ReactNode
  speed?: number      // Default: 1 (multiplikátor rychlosti)
  className?: string
}
```

**Použití:**
```tsx
import HorizontalScroll from '@/components/animations/HorizontalScroll'

<HorizontalScroll speed={1.5}>
  <div className="flex gap-8">
    {/* Horizontálně uspořádaný obsah */}
  </div>
</HorizontalScroll>
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger plugin (s pin funkcí)

**Poznámky:**
- Sekce se "připne" (pin) a scrolluje horizontálně
- `speed` určuje, jak rychle se scrolluje horizontálně vzhledem k vertikálnímu scrollu
- Ideální pro časové osy, portfolia, karousely služeb

---

### **ImageReveal**

**Cesta:** `src/components/animations/ImageReveal.tsx`
**Typ:** Client Component
**Účel:** Obrázek reveal animace s clip-path efektem

**Props Interface:**
```typescript
type ImageRevealProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}
```

**Použití:**
```tsx
import ImageReveal from '@/components/animations/ImageReveal'

<ImageReveal
  src="/images/hero.jpg"
  alt="Hero image"
  priority
/>
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger
- Next.js Image

**Poznámky:**
- Obrázek se postupně odhaluje pomocí clip-path
- Doporučuje se použít `priority` pro hero images

---

### **NumberCounter**

**Cesta:** `src/components/animations/NumberCounter.tsx`
**Typ:** Client Component
**Účel:** Animované počítadlo čísel při scrollování do viewportu

**Props Interface:**
```typescript
type NumberCounterProps = {
  target: number         // Cílové číslo
  duration?: number      // Default: 2
  suffix?: string        // Např. "+" nebo "Kč"
  prefix?: string
  className?: string
}
```

**Použití:**
```tsx
import NumberCounter from '@/components/animations/NumberCounter'

<NumberCounter target={500} suffix="+" duration={2.5} />
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger

**Poznámky:**
- Ideální pro statistiky ("500+ klientů", "10+ let zkušeností")
- Animace se spustí při scrollu do viewportu

---

### **PinSection**

**Cesta:** `src/components/animations/PinSection.tsx`
**Typ:** Client Component
**Účel:** Přilepená sekce s pokročilými scroll efekty

**Props Interface:**
```typescript
type PinSectionProps = {
  children: ReactNode
  duration?: number     // Jak dlouho zůstane přilepená
  className?: string
}
```

**Použití:**
```tsx
import PinSection from '@/components/animations/PinSection'

<PinSection duration={2}>
  <div>Obsah, který se přilepí při scrollu</div>
</PinSection>
```

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger (pin feature)

---

### **SplitReveal**

**Cesta:** `src/components/animations/SplitReveal.tsx`
**Typ:** Client Component
**Účel:** Rozdělený reveal efekt - obsah se rozdělí a odhalí

**Props Interface:**
```typescript
type SplitRevealProps = {
  children: ReactNode
  splitType?: 'vertical' | 'horizontal'  // Default: 'vertical'
  className?: string
}
```

**Použití:**
```tsx
import SplitReveal from '@/components/animations/SplitReveal'

<SplitReveal splitType="horizontal">
  <h1>Efektní nadpis</h1>
</SplitReveal>
```

**Dependencies:**
- GSAP 3.13.0

---

### **FadeIn**

**Cesta:** `src/components/animations/FadeIn.tsx`
**Typ:** Client Component
**Účel:** Jednoduchý fade in efekt při scrollu

**Props Interface:**
```typescript
type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}
```

**Použití:**
```tsx
import FadeIn from '@/components/animations/FadeIn'

<FadeIn delay={0.3} duration={1}>
  <p>Text, který se pozvolna zobrazí</p>
</FadeIn>
```

---

## UI Components

### **Button**

**Cesta:** `src/components/ui/button.tsx`
**Typ:** Server/Client Component
**Účel:** Univerzální tlačítko s variant patterns (shadcn/ui style)

**Props Interface:**
```typescript
type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
  asChild?: boolean  // Pro použití s Radix Slot
}
```

**Použití:**
```tsx
import { Button } from '@/components/ui/button'

<Button variant="outline" size="lg">
  Klikněte zde
</Button>

// AsChild pattern (použití s Link)
<Button asChild>
  <Link href="/rezervace">Rezervovat</Link>
</Button>
```

**Dependencies:**
- Radix UI Slot
- class-variance-authority (CVA)
- Tailwind CSS

**Poznámky:**
- Používá CVA pro type-safe varianty
- Podporuje všechny standardní button atributy
- `asChild` umožňuje použít Button styling s jinými komponenty

---

### **Container**

**Cesta:** `src/components/ui/Container.tsx`
**Typ:** Server Component
**Účel:** Obalový kontejner pro konzistentní max-width a padding

**Props Interface:**
```typescript
type ContainerProps = {
  children: React.ReactNode
  className?: string
}
```

**Použití:**
```tsx
import Container from '@/components/ui/Container'

<Container>
  <h1>Obsah v kontejneru</h1>
</Container>

<Container className="py-24">
  {/* Custom styling */}
</Container>
```

**Poznámky:**
- Default: `max-w-[1250px] mx-auto px-6`
- Konzistentní napříč celou aplikací
- Kombinuje se s `cn()` utility pro custom třídy

---

### **Section**

**Cesta:** `src/components/ui/Section.tsx`
**Typ:** Server Component
**Účel:** Sémantická sekce s konzistentním paddingem

**Props Interface:**
```typescript
type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}
```

**Použití:**
```tsx
import Section from '@/components/ui/Section'

<Section id="o-nas" className="bg-white">
  <Container>
    {/* Obsah sekce */}
  </Container>
</Section>
```

---

### **Input**

**Cesta:** `src/components/ui/input.tsx`
**Typ:** Server/Client Component
**Účel:** Stylovaný input field (shadcn/ui style)

**Props Interface:**
```typescript
type InputProps = React.ComponentProps<'input'>
```

**Použití:**
```tsx
import { Input } from '@/components/ui/input'

<Input
  type="email"
  placeholder="váš@email.cz"
  {...register('email')}
/>
```

**Poznámky:**
- Plně kompatibilní s React Hook Form
- Podporuje všechny HTML input atributy

---

### **Textarea**

**Cesta:** `src/components/ui/textarea.tsx`
**Typ:** Server/Client Component
**Účel:** Stylovaný textarea (shadcn/ui style)

**Props Interface:**
```typescript
type TextareaProps = React.ComponentProps<'textarea'>
```

**Použití:**
```tsx
import { Textarea } from '@/components/ui/textarea'

<Textarea
  rows={4}
  placeholder="Vaše zpráva..."
  {...register('message')}
/>
```

---

### **Calendar**

**Cesta:** `src/components/ui/calendar.tsx`
**Typ:** Client Component
**Účel:** Interaktivní kalendář pro výběr data (Radix UI)

**Props Interface:**
```typescript
// Z react-day-picker
type CalendarProps = {
  mode: 'single' | 'multiple' | 'range'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  locale?: Locale
  // ... další props z react-day-picker
}
```

**Použití:**
```tsx
import { Calendar } from '@/components/ui/calendar'
import { cs } from 'date-fns/locale'

const [date, setDate] = useState<Date>()

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(date) => date < new Date()}
  locale={cs}
/>
```

**Dependencies:**
- react-day-picker 9.11.1
- date-fns 4.1.0
- Radix UI Popover

**Poznámky:**
- Používá se v BookingForm
- Podporuje české locale
- Lze zakázat konkrétní dny (např. neděle)

---

### **Select**

**Cesta:** `src/components/ui/select.tsx`
**Typ:** Client Component
**Účel:** Přístupný select dropdown (Radix UI)

**Props Interface:**
```typescript
// Radix UI Select
SelectTrigger, SelectContent, SelectItem, SelectValue
```

**Použití:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select onValueChange={field.onChange} value={field.value}>
  <SelectTrigger>
    <SelectValue placeholder="Vyberte službu" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="kosmetika">Kosmetika</SelectItem>
    <SelectItem value="hifu">HIFU Lifting</SelectItem>
  </SelectContent>
</Select>
```

**Dependencies:**
- Radix UI Select 2.2.6

---

### **Popover**

**Cesta:** `src/components/ui/popover.tsx`
**Typ:** Client Component
**Účel:** Popover kontejner (Radix UI)

**Použití:**
```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button>Otevřít</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Obsah popoveru</p>
  </PopoverContent>
</Popover>
```

**Dependencies:**
- Radix UI Popover 1.1.15

---

## Layout Components

### **Navbar**

**Cesta:** `src/components/Navbar.tsx`
**Typ:** Client Component
**Účel:** Hlavní navigační lišta s glassmorphism efektem

**Props:** Žádné (používá usePathname, useBrand)

**Použití:**
```tsx
import Navbar from '@/components/Navbar'

// V layoutu
<Navbar />
```

**Features:**
- Glassmorphism efekt s backdrop-blur
- Mění se při scrollu (scrolled state)
- Responzivní mobilní menu (slide-in z pravé strany)
- GSAP animace pro otevírání/zavírání menu
- Integrace s BrandProvider pro logo

**Dependencies:**
- GSAP 3.13.0
- Next.js navigation hooks
- lucide-react icons
- BrandProvider, ModalProvider

**Poznámky:**
- Fixed position s z-index 50
- Mobilní menu se animuje pomocí GSAP
- Links jsou dynamicky aktivní podle pathname

---

### **Footer**

**Cesta:** `src/components/Footer.tsx`
**Typ:** Client Component
**Účel:** Patička stránky s odkazy, kontakty, sociálními sítěmi

**Props:** Žádné (používá useModals, useBrand)

**Použití:**
```tsx
import Footer from '@/components/Footer'

<Footer />
```

**Features:**
- 4-column grid layout (responsive)
- Navigační odkazy
- Kategorie služeb
- Kontaktní informace
- Otevírací doba
- Sociální sítě (Facebook, Instagram)
- Copyright a právní odkazy

**Dependencies:**
- Next.js Image, Link
- BrandProvider
- ModalProvider

---

### **MainContent**

**Cesta:** `src/components/MainContent.tsx`
**Typ:** Client Component
**Účel:** Wrapper pro hlavní obsah s animacemi při načtení

**Props Interface:**
```typescript
type MainContentProps = {
  children: React.ReactNode
}
```

**Použití:**
```tsx
import MainContent from '@/components/MainContent'

<MainContent>
  {/* Obsah stránky */}
</MainContent>
```

**Poznámky:**
- Používá se v layout.tsx
- Animuje děti při mount

---

## Feature Components

### **AboutUsSection**

**Cesta:** `src/components/AboutUsSection.tsx`
**Typ:** Server Component
**Účel:** "O nás" sekce s hero statement a storytelling

**Props:** Žádné

**Použití:**
```tsx
import AboutUsSection from '@/components/AboutUsSection'

<AboutUsSection />
```

**Features:**
- Velkoplošný hero s překryvem a background image
- Statement text s em/italic elementy
- Grid layout s obrázkem Sabiny
- Floating stats cards (10+ let, 500+ klientek, 98% spokojenost)
- Story text s highlighted klíčovými slovy

**Dependencies:**
- Next.js Image
- Container, Section UI komponenty

**Poznámky:**
- Používá font-serif pro italic text
- Obrázky: `/images/salon/kreslomistnostnaprocedury.jpg`, `/images/team/sabina-main.jpeg`

---

### **GallerySection**

**Cesta:** `src/components/GallerySection.tsx`
**Typ:** Client Component
**Účel:** Pokročilá galerie s GSAP scroll animacemi a grid layoutem

**Props Interface:**
```typescript
type GallerySectionProps = {
  images?: {
    hero: { src: string; alt: string }
    layer1: Array<{ src: string; alt: string }>  // 6 obrázků
    layer2: Array<{ src: string; alt: string }>  // 6 obrázků
    layer3: Array<{ src: string; alt: string }>  // 2 obrázky
  } | null
  initialImages?: Array<{ src: string; alt: string; category?: string }>
}
```

**Použití:**
```tsx
import GallerySection from '@/components/GallerySection'

<GallerySection images={{
  hero: { src: '/images/hero.jpg', alt: 'Hero' },
  layer1: [...],
  layer2: [...],
  layer3: [...]
}} />
```

**Features:**
- 3-layer grid system (5 columns × 3 rows)
- Hlavní obrázek (scaler) uprostřed - mění velikost ze fullscreen na normální
- Layer 1: vnější sloupce (1 a 5) - 6 obrázků
- Layer 2: střední sloupce (2 a 4) - 6 obrázků
- Layer 3: centrální sloupec (3) - 2 obrázky
- Scroll-triggered animace pro každou vrstvu (opacity + scale)
- Sticky container pro plynulý scroll efekt
- "fin." sekce na konci

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger (s scrub)
- Next.js Image

**Poznámky:**
- Celá sekce má min-height 240vh
- Používá sticky positioning
- Podporuje backward-compat s `initialImages`
- Gap mezi obrázky: `clamp(10px, 7.35vw, 80px)`

---

### **BookingModal**

**Cesta:** `src/components/BookingModal.tsx`
**Typ:** Client Component
**Účel:** Modal pro rezervaci termínu

**Props Interface:**
```typescript
type BookingModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  preselectedService?: {
    id?: string
    name: string
    price?: string
    duration?: number | null
  }
}
```

**Použití:**
```tsx
import BookingModal from '@/components/BookingModal'

const [isOpen, setIsOpen] = useState(false)

<BookingModal
  isOpen={isOpen}
  onCloseAction={() => setIsOpen(false)}
  preselectedService={{ name: 'HIFU Lifting', price: '2000 Kč' }}
/>
```

**Features:**
- Glassmorphism design (backdrop-blur-3xl)
- GSAP animace pro otevření/zavření (fade + scale)
- Formulář s kategoriemi a službami (kaskádové selecty)
- Výběr data a času
- WhatsApp a telefonní tlačítka
- Validace povinných polí

**Dependencies:**
- GSAP 3.13.0
- lucide-react (Icons)

**Poznámky:**
- Používá native `<dialog>` element
- Kategorie a služby jsou hardcoded (mělo by se načítat z API)
- WhatsApp link: `https://wa.me/420773577899`

---

### **BookingForm**

**Cesta:** `src/components/BookingForm.tsx`
**Typ:** Client Component
**Účel:** Komplexní rezervační formulář s validací (Zod + React Hook Form)

**Props Interface:**
```typescript
type Props = {
  preselectedService?: {
    id: string
    name: string
    price: string
    duration: number
  }
}
```

**Použití:**
```tsx
import BookingForm from '@/components/BookingForm'

<BookingForm preselectedService={service} />
```

**Features:**
- Zod schema validace
- React Hook Form integrace
- Calendar picker s českým locale
- Dynamické časové sloty (9-20h všední dny, 10-18h sobota, neděle zavřeno)
- Automatické načítání služeb z `/api/pricelist`
- Success state s auto-hide po 5 sekundách
- Validace telefonního čísla (české číslo)

**Form Schema:**
```typescript
{
  service: string (required)
  name: string (min 2 chars)
  email: string (email format)
  phone: string (Czech phone regex: /^(\+420)?[0-9]{9}$/)
  preferredDate: string (required)
  preferredTime: string (required)
  message: string (optional)
}
```

**Dependencies:**
- React Hook Form 7.63.0
- Zod 4.1.11
- @hookform/resolvers
- date-fns 4.1.0
- UI komponenty (Calendar, Select, Input, Textarea, Button)

**API Endpoint:**
- POST `/api/booking` - odesílá rezervační data

**Poznámky:**
- Zakazuje výběr nedělí
- Zakazuje výběr dnů v minulosti
- Generuje časové sloty dynamicky podle dne v týdnu

---

### **VoucherModal**

**Cesta:** `src/components/VoucherModal.tsx`
**Typ:** Client Component
**Účel:** Modal pro objednání dárkového poukazu

**Props Interface:**
```typescript
type VoucherModalProps = {
  isOpen: boolean
  onCloseAction: () => void
}
```

**Použití:**
```tsx
import VoucherModal from '@/components/VoucherModal'

<VoucherModal isOpen={isOpen} onCloseAction={() => setIsOpen(false)} />
```

**Features:**
- 2-column layout (formulář + live preview)
- Výběr hodnoty poukazu (500, 1000, 1500, 2000, 3000 Kč nebo custom)
- 4 designové varianty (rose, purple, gold, elegant)
- Live preview dárkového poukazu
- Osobní vzkaz
- GSAP animace otevření/zavření

**Form Fields:**
```typescript
{
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  recipientName: string
  message: string (optional)
  value: string
  customValue: string
  design: string
}
```

**Design Variants:**
```typescript
designs = [
  { id: 'rose', gradient: 'from-pink-300 via-rose-300 to-pink-400' },
  { id: 'purple', gradient: 'from-purple-300 via-pink-300 to-purple-400' },
  { id: 'gold', gradient: 'from-amber-200 via-yellow-200 to-amber-300' },
  { id: 'elegant', gradient: 'from-gray-200 via-gray-100 to-gray-200' },
]
```

**Dependencies:**
- GSAP 3.13.0
- lucide-react

**API Endpoint:**
- POST `/api/send-gift-card`

---

### **PriceTable**

**Cesta:** `src/components/PriceTable.tsx`
**Typ:** Client Component
**Účel:** Interaktivní ceník s vyhledáváním a filtrováním

**Props Interface:**
```typescript
type Props = {
  services: Service[]
}
```

**Použití:**
```tsx
import PriceTable from '@/components/PriceTable'

<PriceTable services={allServices} />
```

**Features:**
- Search bar (vyhledávání podle názvu, popisu, kategorie)
- Kategoriální filtry (tabs)
- URL parametry persistence (`?category=hifu&search=lifting`)
- Desktop: Table view
- Mobile: Card view
- Empty state s možností resetu filtrů
- Link na detail služby
- Zobrazení obrázku, kategorie, délky, sezení, ceny
- Package badge

**Dependencies:**
- Next.js useSearchParams, useRouter
- formatPrice utility

**Poznámky:**
- Synchronizuje stav s URL
- Responsive design (hidden lg:block pro table, lg:hidden pro cards)

---

### **ServiceCard**

**Cesta:** `src/components/ServiceCard.tsx`
**Typ:** Client Component
**Účel:** Karta služby s 3D tilt efektem

**Props Interface:**
```typescript
type Props = {
  title: string
  description: string
  price: string
  category: string
  href: string
  image?: string
  compact?: boolean  // Pro použití v carouselu
}
```

**Použití:**
```tsx
import ServiceCard from '@/components/ServiceCard'

<ServiceCard
  title="HIFU Lifting"
  description="Neinvazivní lifting obličeje"
  price="2000 Kč"
  category="Anti-age"
  href="/sluzby/hifu/hifu-lifting"
  image="/images/hifu.jpg"
/>
```

**Features:**
- 3D perspective tilt efekt při hoveru
- Image preview (pouze v compact módu)
- Kategorie badge
- Cena prominent display
- Arrow hover animation
- Line-clamp pro text overflow

**Dependencies:**
- Next.js Image, Link
- React useState, useRef

**Poznámky:**
- `compact` mód pro carousel (fixed width 320px, s obrázkem)
- Non-compact mód pro grid layout (bez obrázku)
- 3D efekt: `perspective(1000px) rotateX() rotateY()`

---

### **CategoryHero**

**Cesta:** `src/components/CategoryHero.tsx`
**Typ:** Client Component
**Účel:** Hero sekce pro kategorie služeb s parallax efektem

**Props Interface:**
```typescript
type CategoryHeroProps = {
  title: string
  description: string
  heroImage: string
  subheroImages: string[]  // min 3 obrázky
}
```

**Použití:**
```tsx
import CategoryHero from '@/components/CategoryHero'

<CategoryHero
  title="Kosmetika"
  description="Profesionální kosmetické ošetření pro zdravou, jasnou pleť"
  heroImage="/images/kosmetika-hero.jpg"
  subheroImages={[
    '/images/kosmetika-1.jpg',
    '/images/kosmetika-2.jpg',
    '/images/kosmetika-3.jpg',
  ]}
/>
```

**Features:**
- Fullscreen hero (h-screen)
- Parallax scroll efekt na hero image
- Dark gradient overlay (from-black/40 to-black/70)
- Breadcrumb navigace
- Fade-in animace pro content
- Grid 3 subhero obrázků s hover scale
- Scroll indicator (bounce animation)

**Dependencies:**
- GSAP 3.13.0
- ScrollTrigger
- Next.js Image

**Poznámky:**
- Hero image má height 120% pro parallax efekt
- Subhero obrázky se animují s stagger delay
- Breadcrumb: "Služby / {title}"

---

### **CategoryMosaic**

**Cesta:** `src/components/CategoryMosaic.tsx`
**Typ:** Client Component
**Účel:** Mozaikový grid kategorií služeb

**Props Interface:**
```typescript
type Props = {
  categories: Array<{
    id: string
    name: string
    description: string
    priceRange: string
    slug: string
    serviceCount: number
  }>
}
```

**Použití:**
```tsx
import CategoryMosaic from '@/components/CategoryMosaic'

<CategoryMosaic categories={serviceCategories} />
```

**Features:**
- Masonry-like grid layout
- Hover scale + overlay efekt
- Category badge
- Počet služeb
- Price range

---

### **LoadingScreen**

**Cesta:** `src/components/LoadingScreen.tsx`
**Typ:** Client Component
**Účel:** Intro loading animace s číselným counterem a logo reveal

**Props:** Žádné

**Použití:**
```tsx
import LoadingScreen from '@/components/LoadingScreen'

<LoadingScreen />
```

**Animation Timeline:**
1. Číselný counter (00 → 27 → 65 → 98 → 99) - každé číslo se animuje digit-by-digit
2. Spinner fade out
3. Logo reveal - S zespodu, W shora
4. Divider line (scaleY)
5. Logo exit - S dolů, W nahoru
6. Page split - levá polovina dolů, pravá nahoru
7. Fade out + setIntroComplete(true)

**Dependencies:**
- GSAP 3.13.0
- CustomEase plugin
- IntroProvider context
- `/s.svg`, `/w.svg` (logo parts)
- `/styles/loader.css`

**Poznámky:**
- Custom ease: `hop` = `0.9, 0, 0.1, 1`
- Fixed position, z-index 9999
- Rozdělené na dvě poloviny (block-left, block-right)
- Po dokončení se komponenta unmountuje (isVisible = false)

---

### **ModalProvider**

**Cesta:** `src/components/ModalProvider.tsx`
**Typ:** Client Component (Provider)
**Účel:** Context provider pro globální správu modálů

**Props Interface:**
```typescript
type ModalProviderProps = {
  children: ReactNode
}
```

**Použití:**
```tsx
import { ModalProvider, useModals } from '@/components/ModalProvider'

// V layoutu
<ModalProvider>
  {children}
</ModalProvider>

// V komponentě
function MyComponent() {
  const { openBooking, openVoucher } = useModals()

  return (
    <button onClick={() => openBooking({ name: 'HIFU' })}>
      Rezervovat
    </button>
  )
}
```

**Context API:**
```typescript
type ModalContextType = {
  openBooking: (service?: Service) => void
  openVoucher: () => void
}
```

**Features:**
- Centralizovaná správa BookingModal a VoucherModal
- State management pro isOpen a selectedService
- Custom hook `useModals()` pro snadné použití

**Dependencies:**
- React Context API
- BookingModal
- VoucherModal

---

### **BrandProvider**

**Cesta:** `src/components/BrandProvider.tsx`
**Typ:** Client Component (Provider)
**Účel:** Context provider pro brand assets (logo)

**Props Interface:**
```typescript
type BrandProviderProps = {
  children: ReactNode
  logoSrc?: string  // Default: '/logo.svg'
}
```

**Použití:**
```tsx
import { BrandProvider, useBrand } from '@/components/BrandProvider'

// V layoutu
<BrandProvider logoSrc="/logo.svg">
  {children}
</BrandProvider>

// V komponentě
function Navbar() {
  const { logoSrc } = useBrand()
  return <Image src={logoSrc} alt="Logo" />
}
```

**Context API:**
```typescript
type BrandContextType = {
  logoSrc: string
}
```

---

### **IntroProvider**

**Cesta:** `src/components/IntroProvider.tsx`
**Typ:** Client Component (Provider)
**Účel:** Context pro sledování intro animace completion

**Props Interface:**
```typescript
type IntroProviderProps = {
  children: ReactNode
}
```

**Context API:**
```typescript
type IntroContext = [
  boolean,  // introComplete
  (value: boolean) => void  // setIntroComplete
]
```

**Použití:**
```tsx
import { IntroProvider, useIntroCompleteContext } from '@/components/IntroProvider'

// V layoutu
<IntroProvider>
  {children}
</IntroProvider>

// V komponentě
function MyComponent() {
  const [introComplete, setIntroComplete] = useIntroCompleteContext()

  // Spustí se pouze po dokončení intro animace
  useEffect(() => {
    if (introComplete) {
      // Vaše animace
    }
  }, [introComplete])
}
```

---

### **ContactForm**

**Cesta:** `src/components/ContactForm.tsx`
**Typ:** Client Component
**Účel:** Kontaktní formulář s validací

**Dependencies:**
- React Hook Form
- Zod validace

---

### **FAQSection**

**Cesta:** `src/components/FAQSection.tsx`
**Typ:** Client Component
**Účel:** Sekce s často kladenými dotazy (accordion)

---

### **TestimonialsSection**

**Cesta:** `src/components/TestimonialsSection.tsx`
**Typ:** Client Component
**Účel:** Sekce s recenzemi klientů

---

### **ServiceBookingButton**

**Cesta:** `src/components/ServiceBookingButton.tsx`
**Typ:** Client Component
**Účel:** Tlačítko pro otevření booking modalu s předvybranou službou

**Props Interface:**
```typescript
type Props = {
  service: {
    id: string
    name: string
    price: string
    duration: number | null
  }
  className?: string
  children?: ReactNode
}
```

**Použití:**
```tsx
import ServiceBookingButton from '@/components/ServiceBookingButton'

<ServiceBookingButton service={serviceData}>
  Rezervovat HIFU
</ServiceBookingButton>
```

**Dependencies:**
- useModals hook (ModalProvider)

---

### **OpenBookingButton**

**Cesta:** `src/components/OpenBookingButton.tsx`
**Typ:** Client Component
**Účel:** Univerzální tlačítko pro otevření booking modalu (bez předvýběru)

**Props Interface:**
```typescript
type Props = {
  className?: string
  children?: ReactNode
}
```

**Použití:**
```tsx
import OpenBookingButton from '@/components/OpenBookingButton'

<OpenBookingButton className="btn-primary">
  Rezervovat termín
</OpenBookingButton>
```

---

### **OpenVoucherButton**

**Cesta:** `src/components/OpenVoucherButton.tsx`
**Typ:** Client Component
**Účel:** Tlačítko pro otevření voucher modalu

**Props Interface:**
```typescript
type Props = {
  className?: string
  children?: ReactNode
}
```

**Použití:**
```tsx
import OpenVoucherButton from '@/components/OpenVoucherButton'

<OpenVoucherButton>
  Koupit dárkový poukaz
</OpenVoucherButton>
```

---

### **ServiceSearch**

**Cesta:** `src/components/ServiceSearch.tsx`
**Typ:** Client Component
**Účel:** Vyhledávací komponenta pro služby

---

### **HorizontalScrollSection**

**Cesta:** `src/components/HorizontalScrollSection.tsx`
**Typ:** Client Component
**Účel:** Wrapper pro horizontal scroll s předpřipraveným obsahem

---

### **LenisScroll**

**Cesta:** `src/components/LenisScroll.tsx`
**Typ:** Client Component
**Účel:** Smooth scroll provider (Lenis)

**Props Interface:**
```typescript
type LenisScrollProps = {
  children: ReactNode
}
```

**Použití:**
```tsx
import LenisScroll from '@/components/LenisScroll'

<LenisScroll>
  {children}
</LenisScroll>
```

**Dependencies:**
- Lenis 1.3.11
- GSAP ScrollTrigger integrace

**Poznámky:**
- Poskytuje smooth scroll efekt
- Integruje se s GSAP ScrollTrigger
- Používat v root layoutu

---

### **ScrollProgress**

**Cesta:** `src/components/ScrollProgress.tsx`
**Typ:** Client Component
**Účel:** Indikátor pokroku scrollování

---

### **PageTransition**

**Cesta:** `src/components/PageTransition.tsx`
**Typ:** Client Component
**Účel:** Animace přechodů mezi stránkami

---

## Utility Hooks

### **useGsapReveal**

**Cesta:** `src/components/animations/useGsapReveal.ts`
**Typ:** Custom Hook
**Účel:** Reusable GSAP reveal hook

**Použití:**
```typescript
import { useGsapReveal } from '@/components/animations/useGsapReveal'

function MyComponent() {
  const ref = useGsapReveal<HTMLDivElement>({
    y: 50,
    opacity: 0,
    duration: 1
  })

  return <div ref={ref}>Animovaný obsah</div>
}
```

---

### **useGsapParallax**

**Cesta:** `src/components/animations/useGsapParallax.ts`
**Typ:** Custom Hook
**Účel:** Reusable parallax efekt hook

**Použití:**
```typescript
import { useGsapParallax } from '@/components/animations/useGsapParallax'

function MyComponent() {
  const ref = useGsapParallax<HTMLDivElement>({ yPercent: 30, scrub: 1 })

  return <div ref={ref}>Parallax element</div>
}
```

---

## Best Practices

### Použití animačních komponent

1. **Vždy respektovat prefers-reduced-motion:**
   - Všechny animační komponenty to už mají zabudované
   - Pro custom animace použít:
     ```typescript
     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
     if (prefersReducedMotion) return
     ```

2. **GSAP Cleanup:**
   - Vždy používat `gsap.context()` a returnovat `ctx.revert()`
   - Prevence memory leaks

3. **Lazy Loading:**
   - Heavy komponenty jako GallerySection dynamicky importovat:
     ```typescript
     const GallerySection = dynamic(() => import('@/components/GallerySection'))
     ```

### Styling Patterns

1. **Konzistentní spacing:** Používat Container pro horizontal padding
2. **Glassmorphism:** `backdrop-blur-3xl` + `bg-white/25` + `border border-white/40`
3. **Shadows:** Používat `shadow-2xl` pro elevation
4. **Rounded corners:** `rounded-2xl` nebo `rounded-3xl` pro kartičky a sekce

### Form Patterns

1. **Vždy používat Zod + React Hook Form**
2. **Error messages:** Zobrazovat pod inputem s role="alert"
3. **Success states:** Auto-hide po 5 sekundách
4. **Loading states:** Disable button + "Odesílám..." text

---

## Závěr

Tento katalog obsahuje všechny hlavní komponenty SW Beauty projektu. Pro detailní implementaci konkrétní komponenty vždy nahlédněte do jejího zdrojového kódu.

**Další dokumentace:**
- [Styling Guide](/docs/03-frontend/styling-guide.md)
- [Architecture Overview](/docs/02-architecture/overview.md)
- [Development Guide](/docs/09-development/code-style.md)
