# SW Beauty - Architecture & Data Flow

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER (Next.js 15)                   │
├─────────────────────────────────────────────────────────────────┤
│  Pages:                 Components:              Hooks:           │
│  • /                    • Navbar                 • useGSAP        │
│  • /sluzby              • BookingForm            • useBookingModal │
│  • /sluzby/[kategorie]  • VoucherForm           • useVoucherModal │
│  • /cenik               • ContactForm           • Custom hooks    │
│  • /kontakt             • 60+ UI/Animation                        │
│  • /static pages        • Components            │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ (HTTP Requests)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API LAYER (Next.js Routes)                   │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/booking      ──► Rate Limit ──► Sanitize ──► Email  │
│  POST /api/voucher      ──► Rate Limit ──► Sanitize ──► Email  │
│  POST /api/contact      ──► Rate Limit ──► Sanitize ──► Email  │
│  POST /api/newsletter   ──► Rate Limit ──► Sanitize ──► Email  │
│  GET /api/services      ──► Load CSV ──► Parse ──► Return JSON │
│  GET /api/pricelist     ──► Load CSV ──► Parse ──► Return JSON │
└─────────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
   │  RESEND     │   │  CSV DATA    │   │   LIBRARIES  │
   │  Email API  │   │  (Pricelist) │   │   (Zod,      │
   │             │   │  (Services)  │   │    Sanitize) │
   └─────────────┘   └──────────────┘   └──────────────┘
```

---

## Data Flow Diagrams

### 1. Booking Flow

```
User fills form
    ↓
BookingForm validates (Zod)
    ↓
POST /api/booking
    ├─ Rate limit check
    ├─ Input sanitization
    └─ Email validation
    ↓
Generate HTML emails
    ├─ Customer confirmation email
    └─ Owner notification email
    ↓
Send via Resend API
    ├─ TO: info@swbeauty.cz (owner)
    └─ TO: customer@email.com (customer)
    ↓
Return { success: true }
    ↓
Show success message
Clear form
```

### 2. Service Data Loading

```
Page load (ServerComponent)
    ↓
GET /services or /sluzby
    ↓
services.ts: getAllServices()
    ├─ Check cache
    ├─ If empty:
    │  ├─ Read CSV files
    │  ├─ Parse with PapaParse
    │  └─ Build hierarchy (parent/child)
    ├─ Join with pricing data
    └─ Return to component
    ↓
Component renders service details
```

### 3. Voucher Order Flow

```
User fills form + selects design
    ├─ Live preview updates
    ├─ Recipient name shown
    └─ Amount displayed
    ↓
User clicks "Order"
    ↓
POST /api/voucher
    ├─ Rate limit check
    ├─ Input sanitization
    └─ Validation
    ↓
Generate email templates
    ├─ Elegantly styled HTML
    ├─ Include order details
    └─ Add salon contact info
    ↓
Send two emails
    ├─ TO: info@swbeauty.cz
    └─ TO: buyer@email.com
    ↓
Success message
Form reset
```

### 4. Services Data Structure (CSV → App)

```
CSV FILES (Source of Truth)
├── pricelist_updated - services.csv
│   ├─ service_id (unique key)
│   ├─ parent_id (for hierarchy)
│   ├─ name, descriptions
│   ├─ benefits, indications
│   └─ image paths
│
└── pricelist_updated - prices.csv
    ├─ serviceid (links to services)
    ├─ name (pricing variant)
    ├─ duration, sessions
    └─ price_in_czk

    ↓ (services.ts loads & parses)

PARSED DATA STRUCTURE
├─ MainService {
│  ├─ serviceId
│  ├─ name, slug
│  ├─ parentId (for subcategories)
│  ├─ subcategories: MainService[]
│  ├─ pricing: PricingItem[]
│  └─ images: string[]
│  }
└─ PricingItem {
   ├─ serviceId
   ├─ name, description
   ├─ duration, sessions
   └─ price, priceFormatted
   }

    ↓ (components use data)

DISPLAY LAYER
├─ ServicesLayout
│  ├─ ServiceSearch (filter)
│  ├─ Service List (sidebar)
│  └─ Service Details (main)
│
├─ CategoryPage
│  └─ Shows service with pricing
│
└─ PriceTable
   └─ Lists all pricing variants
```

---

## Component Hierarchy

```
Root Layout (layout.tsx)
├─ ModalProvider (Modal context)
├─ BrandProvider (Brand context)
├─ Navbar
├─ Main Content
│  ├─ Page component
│  │  ├─ PageLayout
│  │  ├─ SectionTitle
│  │  └─ Page-specific components
│  │
│  └─ Nested components
│     ├─ Forms (Booking, Contact, etc.)
│     ├─ Sections (Hero, Services, etc.)
│     └─ Animation components
│
└─ Footer

Forms & Modals
├─ BookingForm (client)
│  └─ BookingModal (wrapper)
├─ VoucherForm (client)
│  └─ VoucherModal (wrapper)
├─ ContactForm (client)
└─ SubscribeForm (client)

UI Components (shadcn/ui)
├─ Button
├─ Input
├─ Textarea
├─ Select
├─ Popover
├─ Calendar
└─ Custom: Container, Section, SectionTitle

Animation Components
├─ CharReveal
├─ WordReveal
├─ ScrollReveal
├─ ImageReveal
├─ FadeIn
└─ Others (10+ animation components)
```

---

## Request/Response Examples

### Booking Request
```http
POST /api/booking HTTP/1.1
Content-Type: application/json

{
  "service": "HIFU Facelift",
  "name": "Jana Nová",
  "email": "jana@example.com",
  "phone": "+420773577899",
  "preferredDate": "2024-11-15",
  "preferredTime": "14:00",
  "message": "Mám citlivou pleť"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true
}
```

### Services API Response
```http
GET /api/services HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "serviceId": "hifu-facelift",
    "parentId": null,
    "categoryName": "HIFU Facelift",
    "name": "HIFU Facelift",
    "slug": "hifu-facelift",
    "shortDescription": "Neinvazivní lifting pomocí ultrazvuku",
    "fullDescription": "HIFU (High Intensity Focused Ultrasound)...",
    "benefits": ["Zpevnění kontur", "Stimulace kolagenu", ...],
    "indications": ["Povislá pleť", "Vrásky a jemné linky", ...],
    "contraindications": ["Těhotenství", "Zánětlivé stavy", ...],
    "image": "/images/hifu/hifu-oblicej.jpeg",
    "images": ["/images/hifu/hifu-1.jpg", ...],
    "subcategories": [],
    "pricing": [
      {
        "serviceId": "hifu-facelift",
        "name": "HIFU Obličej - 1 sezení",
        "description": "Obličej",
        "duration": 30,
        "sessions": 1,
        "price": 2500,
        "priceFormatted": "2 500 Kč",
        "isPackage": false,
        "sortOrder": 1
      }
    ]
  }
]
```

---

## Database Schema (Recommended Future)

```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  service_id VARCHAR NOT NULL,
  service_name VARCHAR NOT NULL,
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR NOT NULL,
  customer_phone VARCHAR NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  message TEXT,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Voucher orders
CREATE TABLE vouchers (
  id UUID PRIMARY KEY,
  code VARCHAR UNIQUE NOT NULL,
  buyer_name VARCHAR NOT NULL,
  buyer_email VARCHAR NOT NULL,
  buyer_phone VARCHAR NOT NULL,
  recipient_name VARCHAR,
  recipient_message TEXT,
  amount INTEGER NOT NULL,
  design VARCHAR,
  status ENUM('pending', 'paid', 'delivered', 'used'),
  used_date TIMESTAMP,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  message TEXT NOT NULL,
  created_at TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  subscribed_at TIMESTAMP,
  unsubscribed_at TIMESTAMP
);
```

---

## Email System Architecture

```
┌─────────────────────────────────────────┐
│        API Routes (Next.js)              │
├─────────────────────────────────────────┤
│  POST /api/booking                      │
│  POST /api/voucher                      │
│  POST /api/contact                      │
│  POST /api/newsletter                   │
└─────────────────────────────────────────┘
            │
            ├─► Sanitize input
            ├─► Validate data
            ├─► Build HTML template
            │
            ▼
┌─────────────────────────────────────────┐
│      Resend Email Service API           │
│      (resend.emails.send())             │
└─────────────────────────────────────────┘
            │
            ├─► Email 1: To salon owner
            │   from: [service]@swbeauty.cz
            │   to: info@swbeauty.cz
            │   subject: [Action needed]
            │
            └─► Email 2: To customer
                from: [service]@swbeauty.cz
                to: customer_email
                subject: [Confirmation]

Email Addresses:
├─ rezervace@swbeauty.cz    (Bookings)
├─ poukazy@swbeauty.cz      (Vouchers)
├─ kontakt@swbeauty.cz      (Contact)
├─ newsletter@swbeauty.cz   (Newsletter)
└─ info@swbeauty.cz         (Owner - receives all)
```

---

## Security Layers

```
REQUEST ENTRY
    ↓
1. RATE LIMITING (lib/rateLimit.ts)
   ├─ Get client IP
   ├─ Check request count in last hour
   └─ Return 429 if exceeded
    ↓
2. INPUT VALIDATION (client-side with Zod)
   ├─ Check required fields
   ├─ Validate email format
   ├─ Validate phone format
   └─ Check field lengths
    ↓
3. SANITIZATION (lib/sanitize.ts)
   ├─ Remove HTML tags
   ├─ Escape special characters
   ├─ Validate email (again)
   └─ Validate phone (again)
    ↓
4. DATA PROCESSING
   ├─ Build email template
   ├─ Send via Resend API
   └─ Return response
    ↓
RESPONSE SENT

Security Libraries:
├─ DOMPurify (sanitization)
├─ Zod (validation)
├─ date-fns (date validation)
└─ Regex patterns (phone/email)
```

---

## Performance Optimization Strategy

```
1. DATA CACHING
   ├─ Services cached in memory
   ├─ CSV files read once at build
   └─ Automatic invalidation available

2. CODE SPLITTING
   ├─ Dynamic imports for heavy components
   ├─ Modal components lazy-loaded
   └─ Animation libraries on-demand

3. RENDERING OPTIMIZATION
   ├─ Static pages at build time
   ├─ ISR (Incremental Static Regeneration)
   ├─ Server components for data fetching
   └─ Client components for interactivity

4. ASSET OPTIMIZATION
   ├─ Next.js Image component
   ├─ SVG icons with Lucide
   ├─ CSS via Tailwind (purged)
   └─ Video compression

5. MONITORING
   ├─ Vercel Analytics
   ├─ Speed Insights
   └─ Error tracking
```

---

## Development Workflow

```
┌─────────────────────────────────────┐
│  Local Development                   │
├─────────────────────────────────────┤
│  bun run dev                         │
│  ├─ Starts Turbopack dev server     │
│  ├─ Hot reload on file changes      │
│  └─ API routes available at /api/*  │
└─────────────────────────────────────┘
            │
            ├─ Edit files
            ├─ Test in browser
            ├─ Check console
            └─ Review API responses
            ▼
┌─────────────────────────────────────┐
│  Code Quality                        │
├─────────────────────────────────────┤
│  bun run lint:fix                   │
│  ├─ Biome linting                   │
│  ├─ ESLint rules                    │
│  └─ Auto-formatting                 │
│                                     │
│  bun run format                     │
│  └─ Code formatting                 │
└─────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────┐
│  Build & Deploy                      │
├─────────────────────────────────────┤
│  bun run build                       │
│  ├─ TypeScript check                │
│  ├─ Next.js build                   │
│  ├─ Optimize assets                 │
│  └─ Generate static pages            │
│                                     │
│  Push to Git → Vercel Auto Deploy   │
└─────────────────────────────────────┘
```

---

## File I/O Operations

```
Server-side only (lib/server/*.ts):
├─ Read services CSV
│  └─ /public/services/pricelist_updated - services.csv
├─ Read pricing CSV
│  └─ /public/services/pricelist_updated - prices.csv
└─ Cache in memory

Never exposed to client:
├─ Database credentials
├─ API keys (server-only)
├─ Sensitive config
└─ Private customer data
```

---

**Last Updated:** November 12, 2024
