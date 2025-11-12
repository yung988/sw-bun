# SW Beauty - Codebase Overview & Implementation Status

**Project Date:** November 2024
**Framework:** Next.js 15.5.4 with React 19.1.0
**Type Safety:** 100% TypeScript
**Package Manager:** Bun
**Deployment:** Vercel-optimized

---

## 1. PROJECT STRUCTURE & TECHNOLOGY STACK

### Core Framework & Runtime
- **Next.js 15.5.4** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React with Server Components
- **TypeScript 5** - Full type safety
- **Bun** - Fast JavaScript runtime and package manager

### UI & Styling
- **Tailwind CSS 4.1.0** - Utility-first CSS framework
- **Radix UI** - Headless components (Popover, Select, Slot)
- **shadcn/ui** - Pre-built components based on Radix
- **Lucide React** - Modern icon library

### Animations & Interactions
- **GSAP 3.13.0** - Professional-grade animations
- **Lenis 1.3.11** - Smooth scroll effects
- **Custom Animation Components** - CharReveal, WordReveal, ScrollReveal, PinSection, etc.

### Forms & Data
- **React Hook Form 7.63.0** - High-performance form management
- **Zod 4.1.11** - Schema validation
- **@hookform/resolvers** - Integration bridge
- **PapaParse 5.5.3** - CSV parsing for service data
- **date-fns 4.1.0** - Modern date utilities

### Backend & Communication
- **Resend 6.1.2** - Transactional email API (configured for Czech domain)
- **@react-email/components** - React email templates
- **@react-email/render** - Email rendering

### Monitoring & Analytics
- **@vercel/analytics** - Web analytics integration
- **@vercel/speed-insights** - Performance monitoring

### Development Tools
- **Biome 1.9.4** - Linting, formatting, and code quality
- **Sharp 0.34.4** - Image processing

---

## 2. PROJECT DIRECTORY STRUCTURE

```
/src
├── /app                              # Next.js App Router
│   ├── /api                          # API routes
│   │   ├── /booking                  # Booking reservations API
│   │   ├── /contact                  # Contact form API
│   │   ├── /newsletter               # Newsletter subscription
│   │   ├── /pricelist                # Price list export
│   │   ├── /services                 # Services data API
│   │   └── /voucher                  # Gift card orders
│   ├── /sluzby                       # Services pages
│   │   ├── /[kategorie]              # Category/service detail page
│   │   ├── /[kategorie]/[slug]       # Legacy route (redirects)
│   │   └── page.tsx                  # Services listing page
│   ├── /kontakt                      # Contact page
│   ├── /cenik                        # Price list page
│   ├── /ochrana-osobnich-udaju       # Privacy policy
│   ├── /obchodni-podminky            # Terms of service
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   ├── error.tsx                     # Error page
│   ├── globals.css                   # Global styles
│   ├── robots.ts                     # SEO robots config
│   └── sitemap.ts                    # Dynamic sitemap
├── /components                       # React components
│   ├── /ui                           # Base UI components
│   │   ├── Container.tsx             # Layout container
│   │   ├── Section.tsx               # Section wrapper
│   │   ├── button.tsx                # Button component
│   │   ├── input.tsx                 # Input field
│   │   ├── textarea.tsx              # Textarea field
│   │   ├── calendar.tsx              # Date picker calendar
│   │   ├── select.tsx                # Select dropdown
│   │   └── popover.tsx               # Popover component
│   ├── /animations                   # Animation components
│   │   ├── CharReveal.tsx            # Character animation
│   │   ├── WordReveal.tsx            # Word animation
│   │   ├── ScrollReveal.tsx          # Scroll-triggered reveal
│   │   ├── ImageReveal.tsx           # Image reveal effect
│   │   ├── NumberCounter.tsx         # Number counting animation
│   │   ├── FadeIn.tsx                # Fade-in animation
│   │   ├── SplitReveal.tsx           # Split text reveal
│   │   ├── PinSection.tsx            # Pin on scroll
│   │   ├── HorizontalScroll.tsx      # Horizontal scroll effect
│   │   └── index.ts                  # Animation exports
│   ├── BookingForm.tsx               # Booking form (main form)
│   ├── BookingModal.tsx              # Booking modal wrapper
│   ├── VoucherForm.tsx               # Gift card form
│   ├── VoucherModal.tsx              # Gift card modal
│   ├── ContactForm.tsx               # Contact form
│   ├── ServiceSearch.tsx             # Service search/filter
│   ├── ServicesLayout.tsx            # Services list layout
│   ├── CategoryHero.tsx              # Category header
│   ├── Hero.tsx                      # Hero section
│   ├── Navbar.tsx                    # Navigation bar
│   ├── Footer.tsx                    # Footer
│   ├── PageLayout.tsx                # Page wrapper
│   ├── ModalProvider.tsx             # Modal context provider
│   ├── BrandProvider.tsx             # Brand context
│   ├── and 50+ other components...   # Various sections and features
│
├── /lib                              # Utility functions
│   ├── services.ts                   # Service loading & parsing
│   ├── price.ts                      # Price formatting
│   ├── utils.ts                      # General utilities
│   ├── gsap.ts                       # GSAP configuration
│   ├── analytics.ts                  # Analytics helpers
│   ├── rateLimit.ts                  # Rate limiting utility
│   ├── sanitize.ts                   # Input sanitization
│   └── /server                       # Server-side utilities
│       ├── csv.ts                    # CSV parsing
│       └── images.ts                 # Image management
├── /data                             # Static data
│   ├── faq.ts                        # FAQ content
│   ├── features.tsx                  # Feature list
│   ├── highlights.ts                 # Highlight content
│   ├── testimonials.ts               # Testimonials
│   ├── why.ts                        # Why choose us content
│   ├── instagram.ts                  # Instagram feed data
│   └── imagesManifest.ts             # Image manifest
├── /hooks                            # Custom React hooks
│   ├── useGSAP.ts                    # GSAP animation hook
│   └── useIntroEvents.ts             # Intro animation events
├── /styles                           # Global styles
│   └── loader.css                    # Loading animation styles
├── /types                            # TypeScript type definitions
│   └── index.ts                      # Global types
└── middleware.ts                     # Next.js middleware

/public
├── /services                         # Service data CSVs
│   ├── pricelist_updated - services.csv  # Service definitions
│   └── pricelist_updated - prices.csv    # Pricing information
├── /images                           # Image assets
│   ├── /kosmetika                    # Cosmetics images
│   ├── /hifu                         # HIFU treatment images
│   ├── /ems                          # EMS treatment images
│   ├── /lpg                          # LPG treatment images
│   ├── /kavitace                     # Cavitation images
│   ├── /salon                        # Salon photos
│   ├── /team                         # Team photos
│   └── ...other categories           # Service-specific images
├── /movies                           # Video assets
│   ├── hero_1.mp4                    # Hero background video
│   ├── animated_fluid_bg.mp4         # Background animation
│   └── oko-rasy-detail.mp4           # Service detail video
├── logo.svg                          # Main logo
└── favicon.ico                       # Favicon

```

---

## 3. SERVICES & PRODUCTS IMPLEMENTATION

### Service Data Structure

**Location:** `/public/services/pricelist_updated - services.csv`

Service data is stored in two CSV files:

#### Services CSV (`services.csv`)
Columns:
- `service_id` - Unique identifier (e.g., "hifu-facelift")
- `parent_id` - For subcategories (e.g., "kosmetika-osetreni" has parent "kosmetika")
- `category_name` - Display category name
- `name` - Service name
- `short_description` - Brief description
- `full_description` - Detailed description
- `benefits` - Comma-separated benefits
- `indications` - When to use (comma-separated)
- `contraindications` - When NOT to use (comma-separated)
- `image` - Primary image path(s)

**Example Services:**
1. **HIFU Facelift** (hifu-facelift) - Non-invasive ultrasound lifting
2. **Endos-roller** (endos) - Lymphatic drainage and cellulite reduction
3. **Budování svalů (EMS)** (ems) - Muscle building via electrostimulation
4. **Kavitace** (kavitace) - Ultrasonic fat reduction
5. **LPG Endermologie** (lpg) - Mechanical skin firming
6. **Kosmetika** (kosmetika) - Professional skincare (parent category)
   - Ošetření pleti (kosmetika-osetreni) - Facial treatments
   - Dermapen (dermapen) - Microneedling
   - Obočí a řasy (oboci-a-rasy) - Eyebrows and lashes
   - Hydrafacial (hydrafacial) - Deep cleansing and hydration
7. **Péče o vlasy** (vlasy) - Hair care services

#### Pricing CSV (`prices.csv`)
Columns:
- `serviceid` - Links to service_id
- `category` - Category name
- `subcategory` - Subcategory/package type
- `service_type` - "single" or "package"
- `name` - Pricing item name
- `duration_in_minutes` - Session duration
- `session` - Number of sessions in package
- `price_in_czk` - Price in Czech crowns

### Service Loading & Parsing

**File:** `/src/lib/services.ts`

Key exports:
```typescript
getAllServices(): Promise<MainService[]>
getServiceById(serviceId: string): Promise<MainService | null>
getServiceBySlug(slug: string): Promise<MainService | null>
getCategories(): Promise<string[]>
getCategoryName(categoryId: string): Promise<string>
clearServicesCache(): void
```

Data types:
```typescript
type MainService = {
  serviceId: string
  parentId: string | null
  categoryName: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  benefits: string[]
  indications: string[]
  contraindications: string[]
  image: string
  images: string[]
  subcategories: MainService[]  // For parent categories
  pricing: PricingItem[]
}

type PricingItem = {
  serviceId: string
  name: string
  description: string
  duration: number
  sessions: number
  price: number
  priceFormatted: string
  isPackage: boolean
  sortOrder: number
}
```

### Service Display Pages

#### 1. Services Listing Page
**Route:** `/sluzby`
**File:** `/src/app/sluzby/page.tsx`
- Displays all main services
- Uses `getAllServices()`
- Component: `ServicesLayout` (left sidebar + detail view)

#### 2. Category/Service Detail Page
**Route:** `/sluzby/[kategorie]`
**File:** `/src/app/sluzby/[kategorie]/page.tsx`
- Shows single service or category with subcategories
- Uses `getServiceBySlug(kategorie)`
- Static generation with `generateStaticParams()`
- Displays hierarchically:
  - Current service/category in list
  - Subcategories below (if parent)
  - Siblings (if child)
  - All top-level services (fallback)

#### 3. Legacy Detail Route (Deprecated)
**Route:** `/sluzby/[kategorie]/[slug]`
**File:** `/src/app/sluzby/[kategorie]/[slug]/page.tsx`
- Returns empty for `generateStaticParams()`
- Redirects to parent category page for actual requests

### Service Components

**ServicesLayout.tsx** - Main layout component
- Two-column responsive layout
- Left: Service list with search
- Right: Detailed view with pricing, benefits, indications
- Booking button integration

**ServiceSearch.tsx** - Search/filter functionality
- Searches across service names and descriptions
- Instant filtering
- Results count display

**PriceTable.tsx** - Displays pricing items
- Shows all pricing variants for a service
- Duration, sessions, and formatted prices
- Package vs. single session indicators

**RelatedServices.tsx** - Shows related services
- Links to other services in same category
- Contextual navigation

---

## 4. RESERVATIONS (BOOKING) FUNCTIONALITY

### Status: COMPLETED ✓

### Booking Form Component
**File:** `/src/components/BookingForm.tsx`

Features:
- Service selection dropdown (auto-populated from API)
- Date picker with disabled past dates and Sundays
- Time slot selection based on day
  - Monday-Friday: 9:00 - 20:00
  - Saturday: 10:00 - 18:00
  - Sunday: Closed (disabled)
- Contact information collection (name, email, phone)
- Optional notes/message field
- Zod schema validation for all fields
- Czech phone number validation

Form validation schema:
```typescript
{
  service: string (required)
  name: string (min 2 chars)
  email: string (valid email)
  phone: string (Czech format: +420XXXXXXXXX or XXXXXXXXX, 9 digits)
  preferredDate: string (required, no past, no Sundays)
  preferredTime: string (required, based on selected date)
  message: string (optional)
}
```

### Booking API Route
**File:** `/src/app/api/booking/route.ts`

POST endpoint: `POST /api/booking`

Features:
- Rate limiting: 5 requests per hour per IP
- Input sanitization (XSS protection)
- Email validation and phone validation
- Sends two emails via Resend:
  1. **To salon owner** (info@swbeauty.cz)
     - Full booking details
     - Customer contact info
     - Action needed message
  2. **To customer** (confirmation)
     - Booking summary
     - Confirmation that they'll be contacted
- Graceful error handling

Request body:
```json
{
  "service": "HIFU Facelift",
  "name": "Jana Nová",
  "email": "jana@example.com",
  "phone": "+420773577899",
  "preferredDate": "2024-11-15",
  "preferredTime": "14:00",
  "message": "Optional note"
}
```

Response:
```json
{ "success": true }
```

### Booking Modal Integration
**File:** `/src/components/BookingModal.tsx`

Features:
- GSAP Apple-style animations (scale + fade + smooth movement)
- Backdrop blur effect
- Dynamic category and service selection
- Date and time pickers
- WhatsApp and phone call quick contact buttons
- Pre-selectable service via props

Hook for easy integration:
```typescript
const { isOpen, open, close, service } = useBookingModal()
```

### Booking UI Components
- **BookingForm** - Main form (standalone, can be used in pages)
- **BookingModal** - Modal wrapper with animations
- Uses shadcn/ui components:
  - Calendar (date picker)
  - Input, Select, Textarea
  - Popover (for calendar)

### Integration Points
1. Service detail pages - "Book now" buttons
2. Homepage CTA sections
3. Modal provider in root layout
4. Open booking via context/props

---

## 5. GIFT CARDS (VOUCHERS) FUNCTIONALITY

### Status: COMPLETED ✓

### Voucher Form Component
**File:** `/src/components/VoucherForm.tsx`

Features:
- **Design Selection**
  - Light (subtle colors)
  - Dark (luxury black)
  
- **Amount Selection**
  - Predefined: 500 Kč, 1,000 Kč, 2,000 Kč, 3,000 Kč, 5,000 Kč
  - Custom amount input
  
- **Personalization**
  - Recipient name
  - Personal message
  - Design selection
  
- **Live Preview**
  - Toggle preview button
  - Shows voucher design with entered data
  - Elegant or modern design preview
  
- **Contact Information**
  - Buyer name, email, phone (required)
  - Recipient name (required)
  - Message (optional)

Form validation:
```typescript
{
  name: string (required)
  email: string (required, valid)
  phone: string (required, Czech format)
  amount: string (required, or custom amount)
  customAmount: string (if amount === "custom")
  recipient: string (optional)
  message: string (optional)
  design: "elegant" | "modern"
}
```

### Voucher API Route
**File:** `/src/app/api/voucher/route.ts`

POST endpoint: `POST /api/voucher`

Features:
- Rate limiting: 5 requests per hour per IP
- Input sanitization
- Sends two emails:
  1. **To salon owner** (info@swbeauty.cz)
     - Voucher amount
     - Buyer and recipient info
     - Action needed message
  2. **To buyer** (confirmation)
     - Voucher summary
     - Validity information
     - Contact instructions

Request body:
```json
{
  "name": "Jan Novák",
  "email": "jan@example.com",
  "phone": "+420773577899",
  "amount": "1000",
  "customAmount": null,
  "recipient": "Jméno obdarovaného",
  "message": "S láskou...",
  "design": "elegant"
}
```

Response:
```json
{ "success": true }
```

### Voucher Modal
**File:** `/src/components/VoucherModal.tsx`

Features:
- GSAP animations (Apple style)
- Two-column layout (form + preview)
- Live preview of voucher design
- Design selection with color preview
- Four design options with gradients

Modal hook:
```typescript
const { isOpen, open, close } = useVoucherModal()
```

### Voucher CTA Section
**File:** `/src/components/VoucherCTASection.tsx`

Call-to-action section for gift cards across the site.

---

## 6. CONTACT & NEWSLETTER FUNCTIONALITY

### Status: COMPLETED ✓

### Contact Form
**File:** `/src/components/ContactForm.tsx`

Route: `/kontakt` page

Features:
- Name, email, phone, message fields
- Zod validation
- Rate limited API
- Sends emails to both salon and sender

### Contact API
**File:** `/src/app/api/contact/route.ts`

POST endpoint: `POST /api/contact`
- Rate limiting: 5 requests per hour per IP
- Input sanitization
- Sends confirmation email to sender
- Sends notification to salon owner

### Newsletter Subscription
**File:** `/src/components/SubscribeForm.tsx`

Features:
- Email input
- Subscribe button
- Success/error messages

### Newsletter API
**File:** `/src/app/api/newsletter/route.ts`

POST endpoint: `POST /api/newsletter`
- Rate limiting: 10 requests per hour per IP
- Email validation
- Sends welcome email with 10% discount offer
- Sends notification to salon owner

---

## 7. PRICE LIST & CENÍK PAGE

### Status: COMPLETED ✓

**Route:** `/cenik`
**File:** `/src/app/cenik/page.tsx`

Features:
- Displays all services with pricing
- Organized by category
- Expandable service details
- Table format with columns:
  - Service name
  - Duration
  - Price
  - Benefits summary
  - Indications/benefits

**Price List Export API**
**File:** `/src/app/api/pricelist/route.ts`

GET endpoint: `GET /api/pricelist`
- Returns JSON array of all price items
- Used by booking form to populate service list
- Legacy support for old CSV structure

---

## 8. SECURITY & VALIDATION

### Rate Limiting
**File:** `/src/lib/rateLimit.ts`

Implemented on all API endpoints:
- **Booking:** 5 requests/hour per IP
- **Contact:** 5 requests/hour per IP
- **Newsletter:** 10 requests/hour per IP
- **Voucher:** 5 requests/hour per IP

In-memory storage with automatic cleanup.

### Input Sanitization
**File:** `/src/lib/sanitize.ts`

Functions:
- `sanitizeHtml()` - Removes dangerous HTML/JS
- `sanitizeEmail()` - Validates and cleans email
- `sanitizePhone()` - Validates Czech phone format

Used in all API routes to prevent XSS attacks.

### Form Validation
- **Zod** for schema validation
- Client-side validation with error messages
- Server-side validation on API routes
- Czech phone number format enforcement

---

## 9. EMAIL SERVICE INTEGRATION

### Resend Configuration
**Service:** Resend 6.1.2
**Domain:** swbeauty.cz

Email addresses configured:
- `rezervace@swbeauty.cz` - Booking notifications
- `poukazy@swbeauty.cz` - Voucher orders
- `kontakt@swbeauty.cz` - Contact form
- `newsletter@swbeauty.cz` - Newsletter

**Owner contact:** `info@swbeauty.cz`

### Email Templates
- Booking confirmation (customer & owner)
- Voucher order confirmation
- Contact form confirmation
- Newsletter subscription welcome
- All templates include:
  - Salon contact info
  - Professional formatting
  - Clear call-to-action
  - Brand colors and styling

---

## 10. INCOMPLETE/TODO ITEMS

### Identified Gaps:

1. **Payment Integration**
   - No payment processing for vouchers
   - Manual payment coordination currently
   - Could integrate with Stripe/PayPal

2. **Admin Dashboard**
   - No backend interface for managing bookings/orders
   - No statistics or analytics dashboard
   - Manual email management only

3. **Booking Confirmation System**
   - No confirmation emails from salon
   - No booking status tracking
   - No cancellation system

4. **Gift Card Tracking**
   - No voucher code generation
   - No redemption system
   - No tracking of used vs. unused vouchers

5. **Advanced Features**
   - No availability calendar (shows all time slots)
   - No automatic unavailability blocking
   - No customer account/login system
   - No order history tracking

6. **Mobile Optimization**
   - Forms work on mobile but could be optimized
   - Modal animations may need mobile refinement

7. **Database**
   - Currently no persistent database
   - All data is CSV-based
   - Consider adding database for:
     - Bookings
     - Orders
     - Customer data
     - Availability

---

## 11. KEY FILES & COMPONENTS SUMMARY

### Page Routes
| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/` | `page.tsx` | Homepage | Complete |
| `/sluzby` | `sluzby/page.tsx` | Service listing | Complete |
| `/sluzby/[kategorie]` | `sluzby/[kategorie]/page.tsx` | Service detail | Complete |
| `/cenik` | `cenik/page.tsx` | Price list | Complete |
| `/kontakt` | `kontakt/page.tsx` | Contact page | Complete |
| `/ochrana-osobnich-udaju` | `ochrana-osobnich-udaju/page.tsx` | Privacy | Complete |
| `/obchodni-podminky` | `obchodni-podminky/page.tsx` | Terms | Complete |

### API Routes
| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `POST /api/booking` | `api/booking/route.ts` | Booking submission | Complete |
| `POST /api/voucher` | `api/voucher/route.ts` | Voucher order | Complete |
| `POST /api/contact` | `api/contact/route.ts` | Contact form | Complete |
| `POST /api/newsletter` | `api/newsletter/route.ts` | Newsletter signup | Complete |
| `GET /api/services` | `api/services/route.ts` | Service data (JSON) | Complete |
| `GET /api/pricelist` | `api/pricelist/route.ts` | Price list (JSON) | Complete |

### Core Components
| Component | File | Purpose |
|-----------|------|---------|
| BookingForm | `BookingForm.tsx` | Main booking form |
| BookingModal | `BookingModal.tsx` | Booking modal wrapper |
| VoucherForm | `VoucherForm.tsx` | Gift card form |
| VoucherModal | `VoucherModal.tsx` | Gift card modal |
| ContactForm | `ContactForm.tsx` | Contact form |
| SubscribeForm | `SubscribeForm.tsx` | Newsletter form |
| ServicesLayout | `ServicesLayout.tsx` | Service list layout |
| Navbar | `Navbar.tsx` | Navigation |
| Footer | `Footer.tsx` | Footer |

### Utility Libraries
| File | Purpose |
|------|---------|
| `lib/services.ts` | Service data loading |
| `lib/price.ts` | Price formatting |
| `lib/rateLimit.ts` | Rate limiting |
| `lib/sanitize.ts` | Input sanitization |
| `lib/gsap.ts` | GSAP animations |
| `lib/analytics.ts` | Analytics integration |

---

## 12. STYLING & DESIGN SYSTEM

### Design Approach
- **Quiet Luxury** aesthetic with subtle GSAP animations
- **Tailwind CSS 4.1.0** for all styling
- **No custom CSS modules** - utilities only
- **Slate color palette** for professional look
- **Rounded corners** (xl, 2xl, 3xl) for modern feel

### Spacing Conventions
- Horizontal padding: `px-4 md:px-6 lg:px-8`
- Vertical padding: `py-24 md:py-28` for sections
- Container max-width: `max-w-[1920px]`

### Typography
- Light font weights for luxury feel
- Serif italics for highlights: `<em className="italic">`
- SectionTitle component for consistent headers

### Component Library
- **Container** - Layout container with consistent padding
- **Section** - Section wrapper with vertical spacing
- **SectionTitle** - Header with eyebrow, title, subtitle
- All shadcn/ui components available

---

## 13. PERFORMANCE OPTIMIZATIONS

- **Image optimization** via Next.js Image component
- **Code splitting** via dynamic imports
- **Server-side rendering** for static pages
- **Turbopack** for fast development builds
- **Analytics and speed insights** via Vercel
- **CSV caching** in services.ts
- **Rate limiting** for API protection

---

## 14. DEPLOYMENT & HOSTING

- **Vercel** (recommended, zero-config)
- **Environment variables needed:**
  - `RESEND_API_KEY` - Email service key
  - `NEXT_PUBLIC_SITE_URL` - Site URL for analytics
  - `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Analytics ID (optional)

---

## 15. NEXT STEPS & RECOMMENDATIONS

### Short-term (High Priority)
1. Set up database for persistent booking storage
2. Implement admin dashboard for booking management
3. Add payment integration for vouchers
4. Create booking confirmation system
5. Set up availability calendar

### Medium-term
1. Implement customer accounts/login
2. Add order history tracking
3. Create voucher redemption system
4. Set up email notifications for availability changes
5. Implement automated confirmations

### Long-term
1. CMS integration for service management
2. Advanced analytics and reporting
3. SMS notifications
4. Calendar synchronization with salon booking systems
5. Mobile app

---

**Last Updated:** November 12, 2024
**Reviewed by:** Claude Code AI
**Status:** Production-ready core, enhancements pending
