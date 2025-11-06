# Booking System Documentation

**SW Beauty Project - Reservation Flow & Architecture**

Version: 1.0
Last Updated: November 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [User Flow](#user-flow)
3. [Architecture Overview](#architecture-overview)
4. [Components](#components)
5. [Modal Management](#modal-management)
6. [Form Structure](#form-structure)
7. [Validation](#validation)
8. [API Integration](#api-integration)
9. [Email Notifications](#email-notifications)
10. [Alternative Contact Methods](#alternative-contact-methods)
11. [Error Handling](#error-handling)
12. [Rate Limiting](#rate-limiting)
13. [Security](#security)
14. [Testing](#testing)

---

## Introduction

Booking systém SW Beauty poskytuje smooth, user-friendly způsob rezervace služeb. Systém je navržen s ohledem na:

- **Jednoduchost** - minimální kroky k rezervaci
- **Flexibilitu** - více způsobů kontaktu (form, WhatsApp, telefon)
- **Bezpečnost** - validace, sanitizace, rate limiting
- **UX** - GSAP animace, instant feedback, auto-fill
- **Accessibility** - keyboard navigation, ARIA labels

**Flow Overview:**
```
User clicks CTA → Modal opens → Form fills → Validation → API → Emails → Success
```

---

## User Flow

### Complete Booking Journey

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Entry Point (CTA Button)                                │
│    - OpenBookingButton (generic)                            │
│    - ServiceBookingButton (preselected service)             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Modal Opens                                              │
│    - GSAP scale + fade animation (250ms)                    │
│    - Backdrop blur effect                                   │
│    - Focus trapped in modal                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Service Selection                                        │
│    a) If preselected → auto-filled, disabled                │
│    b) If not → user selects category → then service         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Form Filling                                             │
│    - Name (required)                                        │
│    - Email (required, validated)                            │
│    - Phone (optional)                                       │
│    - Preferred Date (required, date picker)                 │
│    - Preferred Time (required, dropdown)                    │
│    - Message (optional)                                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Validation                                               │
│    - Client-side: TypeScript types                          │
│    - Server-side: Zod schema                                │
│    - Sanitization: XSS protection                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. API Call                                                 │
│    POST /api/booking                                        │
│    - Rate limit check (5/hour per IP)                       │
│    - Validation                                             │
│    - Email sending                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Email Notifications                                      │
│    a) Owner email (info@swbeauty.cz)                        │
│       - New booking notification                            │
│       - All customer details                                │
│    b) Customer email                                        │
│       - Booking confirmation                                │
│       - Summary of reservation                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. Success Feedback                                         │
│    - Success alert                                          │
│    - Modal closes (GSAP animation)                          │
│    - Form resets                                            │
└─────────────────────────────────────────────────────────────┘
```

### Alternative Flows

**WhatsApp Flow:**
```
User fills partial info → Clicks WhatsApp →
Opens WhatsApp with pre-filled message
```

**Phone Call Flow:**
```
User clicks "Zavolat" → Opens phone dialer with number
```

---

## Architecture Overview

### Component Hierarchy

```
ModalProvider (Context)
├── BookingModal (Dialog)
│   ├── BookingForm (Form Component)
│   │   ├── Input fields
│   │   ├── Service selectors
│   │   ├── Date/Time pickers
│   │   └── Submit button
│   └── Alternative contact buttons
│       ├── WhatsApp button
│       └── Call button
├── OpenBookingButton (Trigger)
└── ServiceBookingButton (Trigger with preselection)
```

### Data Flow

```
┌─────────────────┐
│  User Input     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  React State    │ ───► │  Client          │
│  (FormData)     │      │  Validation      │
└────────┬────────┘      └──────────────────┘
         │
         ▼
┌─────────────────┐
│  API Request    │
│  /api/booking   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Server-side    │ ───► │  Sanitization    │
│  Validation     │      │  (XSS protect)   │
│  (Zod Schema)   │      └──────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Resend API     │ ───► │  Email to Owner  │
└────────┬────────┘      └──────────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Resend API     │ ───► │  Email to        │
└────────┬────────┘      │  Customer        │
         │               └──────────────────┘
         ▼
┌─────────────────┐
│  Success        │
│  Response       │
└─────────────────┘
```

---

## Components

### 1. ModalProvider

**Location:** `src/components/ModalProvider.tsx`

**Purpose:** Centrální state management pro všechny modály.

**Implementation:**
```tsx
'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'
import BookingModal from './BookingModal'
import VoucherModal from './VoucherModal'

type Service = {
  id: string
  name: string
  price: string
  duration: number | null
}

type ModalContextType = {
  openBooking: (service?: Service) => void
  openVoucher: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [voucherOpen, setVoucherOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | undefined>()

  const openBooking = (service?: Service) => {
    setSelectedService(service)
    setBookingOpen(true)
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setSelectedService(undefined)
  }

  const openVoucher = () => {
    setVoucherOpen(true)
  }

  const closeVoucher = () => {
    setVoucherOpen(false)
  }

  return (
    <ModalContext.Provider value={{ openBooking, openVoucher }}>
      {children}
      <BookingModal
        isOpen={bookingOpen}
        onCloseAction={closeBooking}
        preselectedService={selectedService}
      />
      <VoucherModal isOpen={voucherOpen} onCloseAction={closeVoucher} />
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModals musí být použit v rámci ModalProvider')
  }
  return context
}
```

**Key Features:**
- React Context API pro global state
- Type-safe hooks
- Service preselection support
- Automatic cleanup

**Usage:**
```tsx
// In any component:
import { useModals } from '@/components/ModalProvider'

function MyComponent() {
  const { openBooking } = useModals()

  return (
    <button onClick={() => openBooking()}>
      Rezervovat
    </button>
  )
}
```

---

### 2. BookingModal

**Location:** `src/components/BookingModal.tsx`

**Props:**
```typescript
type BookingModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  preselectedService?: Service
}
```

**Key Features:**

**1. GSAP Animations:**
```tsx
useLayoutEffect(() => {
  if (!dialogRef.current) return
  if (isOpen) {
    dialogRef.current.showModal()
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    gsap.set(dialogRef.current, { opacity: 0, scale: 0.95 })
    tl.to(dialogRef.current, { opacity: 1, scale: 1, duration: 0.25 }, 0)
  } else {
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    tl.to(dialogRef.current, { opacity: 0, scale: 0.95, duration: 0.2 }, 0)
      .add(() => {
        dialogRef.current?.close()
      })
  }
}, [isOpen])
```

**2. Click-Outside-to-Close:**
```tsx
<dialog
  onClick={(e) => {
    if (e.target === dialogRef.current) onCloseAction()
  }}
>
```

**3. ESC Key Support:**
```tsx
<dialog
  onKeyDown={(e) => {
    if (e.key === 'Escape') onCloseAction()
  }}
>
```

**4. Glassmorphism Design:**
```tsx
className="bg-white/15 backdrop-blur-3xl rounded-3xl shadow-2xl
           overflow-hidden border border-white/30"
```

---

### 3. OpenBookingButton

**Location:** `src/components/OpenBookingButton.tsx`

**Simple trigger pro BookingModal bez preselection.**

```tsx
'use client'

import { useModals } from './ModalProvider'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function OpenBookingButton({ children, className }: Props) {
  const { openBooking } = useModals()

  return (
    <button
      onClick={() => openBooking()}
      className={className}
      type="button"
    >
      {children}
    </button>
  )
}
```

**Usage:**
```tsx
<OpenBookingButton className="rounded-full bg-slate-900 px-6 py-3">
  Konzultace zdarma
</OpenBookingButton>
```

---

### 4. ServiceBookingButton

**Location:** `src/components/ServiceBookingButton.tsx`

**Trigger s předvybranou službou.**

```tsx
'use client'

import { useModals } from './ModalProvider'

type Service = {
  name: string
  price: string
  duration?: number | null
}

type Props = {
  service: Service
  children: React.ReactNode
  className?: string
}

export default function ServiceBookingButton({
  service,
  children,
  className
}: Props) {
  const { openBooking } = useModals()

  return (
    <button
      onClick={() => openBooking(service)}
      className={className}
      type="button"
    >
      {children}
    </button>
  )
}
```

**Usage:**
```tsx
<ServiceBookingButton
  service={{
    name: 'HIFU Lifting obličeje',
    price: '2500 Kč',
    duration: 60
  }}
  className="..."
>
  Rezervovat HIFU
</ServiceBookingButton>
```

---

## Modal Management

### Opening Modal

**Without preselection:**
```tsx
const { openBooking } = useModals()
openBooking()
```

**With preselection:**
```tsx
const { openBooking } = useModals()
openBooking({
  name: 'HIFU Lifting',
  price: '2500 Kč',
  duration: 60
})
```

### Closing Modal

**Programatically:**
```tsx
const { closeBooking } = useModals() // Not exported, handled internally
```

**User actions:**
- Click backdrop
- Press ESC key
- Click X button
- After successful submit

---

## Form Structure

### Form Data Type

```typescript
type FormData = {
  name: string
  phone: string
  email: string
  category: string
  service: string
  date: string
  time: string
}
```

### Fields

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| **name** | text | Yes | Non-empty string | Full name |
| **email** | email | Yes | Email format | Contact email |
| **phone** | tel | No | Phone format | Optional contact |
| **category** | select | Yes | Non-empty | Service category |
| **service** | select | Yes | Non-empty | Specific service |
| **date** | date | Yes | Valid date | Preferred date |
| **time** | select | Yes | Time slot | Preferred time |
| **message** | textarea | No | - | Additional notes |

### Service Categories

```typescript
const categories: Record<string, string[]> = {
  'Péče o pleť': [
    'Základní ošetření pleti',
    'Hloubkové čištění',
    'Anti-age ošetření',
    'Hydratační ošetření',
    'Lifting obličeje',
  ],
  Masáže: [
    'Masáž obličeje',
    'Relaxační masáž hlavy',
    'Lymfatická masáž',
    'Kobido masáž'
  ],
  'Make-up': [
    'Permanentní make-up obočí',
    'Permanentní make-up rtů',
    'Permanentní linky',
    'Denní make-up',
    'Večerní make-up',
  ],
  // ... more categories
}
```

### Time Slots

```typescript
const timeSlots = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00'
]
```

### Form State Management

```tsx
const [formData, setFormData] = useState<FormData>({
  name: '',
  phone: '',
  email: '',
  category: '',
  service: preselectedService?.name || '',
  date: '',
  time: '',
})

const handleChange = (field: keyof FormData, value: string) => {
  const newData: FormData = {
    ...formData,
    [field]: value,
  }

  // Reset service when category changes
  if (field === 'category') {
    newData.service = ''
  }

  setFormData(newData)
}
```

---

## Validation

### Client-Side Validation

**Basic validation v handleSubmit:**
```tsx
const handleSubmit = () => {
  if (
    !formData.name ||
    !formData.phone ||
    !formData.email ||
    !formData.category ||
    !formData.service ||
    !formData.date ||
    !formData.time
  ) {
    alert('Prosím vyplňte všechna pole')
    return
  }

  // ... submit to API
}
```

### Server-Side Validation

**Location:** `src/app/api/booking/route.ts`

**Zod Schema (implied, not shown in current code):**
```typescript
import { z } from 'zod'

const bookingSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  preferredDate: z.string().datetime(),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/),
  message: z.string().optional(),
})

type BookingInput = z.infer<typeof bookingSchema>
```

**Validation in API:**
```typescript
const body = await request.json()
const { service, name, email, phone, preferredDate, preferredTime, message } = body

// Sanitizace všech vstupů
const sanitizedService = sanitizeHtml(service || '')
const sanitizedName = sanitizeHtml(name || '')
const sanitizedEmail = sanitizeEmail(email)
const sanitizedPhone = phone ? sanitizePhone(phone) : null
const sanitizedMessage = message ? sanitizeHtml(message) : ''

// Validace povinných polí po sanitizaci
if (!sanitizedService || !sanitizedName || !sanitizedEmail) {
  return NextResponse.json(
    { error: 'Chybí povinné údaje' },
    { status: 400 }
  )
}
```

---

## API Integration

### Endpoint

```
POST /api/booking
```

### Request Body

```json
{
  "service": "HIFU Lifting obličeje",
  "name": "Jana Nováková",
  "email": "jana@example.com",
  "phone": "+420773123456",
  "preferredDate": "2025-11-15T00:00:00.000Z",
  "preferredTime": "14:00",
  "message": "Ráda bych konzultaci ohledně anti-age péče"
}
```

### Response

**Success (200):**
```json
{
  "success": true
}
```

**Error (400):**
```json
{
  "error": "Chybí povinné údaje"
}
```

**Rate Limited (429):**
```json
{
  "error": "Příliš mnoho požadavků. Zkuste to prosím za 45 minut."
}
```

### Implementation

**Location:** `src/app/api/booking/route.ts`

```typescript
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { sanitizeEmail, sanitizeHtml, sanitizePhone } from '@/lib/sanitize'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set')
    return null
  }
  return new Resend(apiKey)
}

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, 5, 60 * 60 * 1000)

    if (!rateLimitResult.success) {
      // ... return 429
    }

    const resend = getResend()
    if (!resend) {
      return NextResponse.json(
        { error: 'Služba odesílání emailů není nakonfigurována' },
        { status: 500 }
      )
    }

    const body = await request.json()
    // ... validation & sanitization

    // Send owner email
    await resend.emails.send({ /* ... */ })

    // Send customer email
    await resend.emails.send({ /* ... */ })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se odeslat rezervaci' },
      { status: 500 }
    )
  }
}
```

---

## Email Notifications

### 1. Owner Email

**To:** info@swbeauty.cz
**From:** rezervace@swbeauty.cz
**Subject:** 🗓️ Nová rezervace - {customerName}

**Template:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0f172a;">Nová rezervace</h2>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #334155;">Služba</h3>
    <p style="margin: 5px 0;"><strong>{service}</strong></p>

    <h3 style="color: #334155;">Preferovaný termín</h3>
    <p style="margin: 5px 0;"><strong>{date} v {time}</strong></p>

    <h3 style="color: #334155;">Kontaktní údaje</h3>
    <p style="margin: 5px 0;">Jméno: <strong>{name}</strong></p>
    <p style="margin: 5px 0;">E-mail: <strong>{email}</strong></p>
    <p style="margin: 5px 0;">Telefon: <strong>{phone}</strong></p>

    {message && `
      <h3 style="color: #334155;">Poznámka</h3>
      <p style="margin: 5px 0;">{message}</p>
    `}
  </div>

  <p style="color: #64748b; font-size: 14px;">
    Pro potvrzení termínu kontaktujte klienta do 24 hodin.
  </p>
</div>
```

---

### 2. Customer Confirmation Email

**To:** {customerEmail}
**From:** rezervace@swbeauty.cz
**Subject:** ✅ Potvrzení rezervace – SW Beauty

**Template:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0f172a;">Děkujeme za vaši rezervaci!</h2>

  <p>Dobrý den {name},</p>

  <p>Vaše nezávazná poptávka na ošetření byla úspěšně odeslána.</p>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #334155;">Shrnutí rezervace</h3>
    <p style="margin: 5px 0;"><strong>Služba:</strong> {service}</p>
    <p style="margin: 5px 0;">
      <strong>Preferovaný termín:</strong> {date} v {time}
    </p>
  </div>

  <p>Co nejdříve vás budeme kontaktovat pro potvrzení termínu
     e-mailem nebo telefonicky.</p>

  <p style="margin-top: 30px;">
    S pozdravem,<br>
    <strong>Tým SW Beauty</strong>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

  <p style="color: #64748b; font-size: 12px;">
    SW Beauty s.r.o.<br>
    U Cihelny 1326/2, 695 01 Hodonín<br>
    Telefon: +420 773 577 899<br>
    E-mail: info@swbeauty.cz<br>
    Web: swbeauty.cz
  </p>
</div>
```

---

## Alternative Contact Methods

### WhatsApp Integration

```tsx
const handleWhatsApp = () => {
  const message = `Dobrý den, chci si rezervovat termín:%0A%0A` +
    `Jméno: ${formData.name}%0A` +
    `Telefon: ${formData.phone}%0A` +
    `Kategorie: ${formData.category}%0A` +
    `Procedura: ${formData.service}%0A` +
    `Datum: ${formData.date}%0A` +
    `Čas: ${formData.time}`

  window.open(`https://wa.me/420773577899?text=${message}`, '_blank')
}
```

**Benefits:**
- Immediate contact
- Familiar platform for many users
- Pre-filled message with form data

---

### Phone Call

```tsx
const handleCall = () => {
  window.location.href = 'tel:+420773577899'
}
```

**Benefits:**
- Instant connection
- Personal touch
- Preferred by older demographics

---

## Error Handling

### Client-Side Errors

**1. Validation Errors:**
```tsx
if (!formData.email) {
  alert('Prosím vyplňte email')
  return
}
```

**2. Network Errors:**
```tsx
try {
  const response = await fetch('/api/booking', {
    method: 'POST',
    body: JSON.stringify(formData)
  })

  if (!response.ok) {
    const error = await response.json()
    alert(error.message || 'Něco se pokazilo')
    return
  }

  // Success
} catch (error) {
  alert('Chyba připojení. Zkuste to prosím znovu.')
}
```

---

### Server-Side Errors

**1. Missing Data:**
```typescript
if (!sanitizedService || !sanitizedName || !sanitizedEmail) {
  return NextResponse.json(
    { error: 'Chybí povinné údaje' },
    { status: 400 }
  )
}
```

**2. Email Sending Failed:**
```typescript
const { error: ownerError } = await resend.emails.send({ /* ... */ })

if (ownerError) {
  console.error('Owner email error:', ownerError)
  throw ownerError
}
```

**3. Rate Limit Exceeded:**
```typescript
if (!rateLimitResult.success) {
  return NextResponse.json(
    { error: `Příliš mnoho požadavků. Zkuste to prosím za ${resetTime}.` },
    {
      status: 429,
      headers: {
        'X-RateLimit-Remaining': '0',
        'Retry-After': '3600',
      },
    }
  )
}
```

---

## Rate Limiting

### Configuration

**Limit:** 5 requests per hour per IP address

**Location:** `src/lib/rateLimit.ts`

```typescript
export function checkRateLimit(
  clientIp: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const key = `ratelimit:${clientIp}`

  // Get or create request log
  let requests = requestStore.get(key) || []

  // Remove expired requests
  requests = requests.filter(time => now - time < windowMs)

  // Check if limit exceeded
  if (requests.length >= limit) {
    const oldestRequest = Math.min(...requests)
    const resetTime = oldestRequest + windowMs

    return {
      success: false,
      remaining: 0,
      resetTime,
    }
  }

  // Add current request
  requests.push(now)
  requestStore.set(key, requests)

  return {
    success: true,
    remaining: limit - requests.length,
  }
}
```

**Why Rate Limiting?**
- Prevent spam
- Protect API resources
- Prevent abuse
- Reduce email costs

---

## Security

### 1. Input Sanitization

**Location:** `src/lib/sanitize.ts`

```typescript
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export function sanitizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase()
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    throw new Error('Invalid email format')
  }
  return trimmed
}

export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, '')
}
```

### 2. CSRF Protection

Next.js API routes jsou chráněny defaultně proti CSRF díky:
- SameSite cookies
- Origin checking

### 3. Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Never commit `.env.local` to git!**

---

## Testing

### Manual Testing Checklist

**Form Validation:**
- [ ] Submit with empty fields → shows error
- [ ] Submit with invalid email → shows error
- [ ] Submit with valid data → success

**Service Preselection:**
- [ ] Click ServiceBookingButton → service pre-filled
- [ ] Service field is disabled
- [ ] Category auto-selected

**Modal Behavior:**
- [ ] Modal opens with animation
- [ ] Click backdrop → closes
- [ ] Press ESC → closes
- [ ] Click X button → closes

**Alternative Contact:**
- [ ] WhatsApp button → opens with pre-filled message
- [ ] Call button → opens dialer

**Email Notifications:**
- [ ] Owner receives email
- [ ] Customer receives confirmation
- [ ] Emails contain correct data

**Rate Limiting:**
- [ ] 5 requests allowed
- [ ] 6th request → 429 error
- [ ] After 1 hour → limit resets

---

### Automated Testing

**Component Tests (Vitest + React Testing Library):**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BookingModal from './BookingModal'

describe('BookingModal', () => {
  it('renders when open', () => {
    render(<BookingModal isOpen={true} onCloseAction={vi.fn()} />)
    expect(screen.getByText('Rezervace')).toBeInTheDocument()
  })

  it('shows validation error for empty fields', () => {
    render(<BookingModal isOpen={true} onCloseAction={vi.fn()} />)
    fireEvent.click(screen.getByText('Odeslat rezervaci'))
    expect(screen.getByText('Prosím vyplňte všechna pole')).toBeInTheDocument()
  })
})
```

**API Tests:**
```typescript
import { POST } from './route'
import { NextRequest } from 'next/server'

describe('/api/booking', () => {
  it('returns 400 for missing fields', async () => {
    const req = new NextRequest('http://localhost:3000/api/booking', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 429 after rate limit', async () => {
    // Make 6 requests
    for (let i = 0; i < 6; i++) {
      const req = new NextRequest('http://localhost:3000/api/booking', {
        method: 'POST',
        body: JSON.stringify(validData),
      })
      const res = await POST(req)
      if (i === 5) {
        expect(res.status).toBe(429)
      }
    }
  })
})
```

---

**Related Documentation:**
- [Components Overview](../03-frontend/components-overview.md)
- [API Routes](../04-backend/api-routes.md)
- [Email Templates](../04-backend/email-templates.md)

---

**Last Updated:** November 2025
**Maintainer:** SW Beauty Development Team
