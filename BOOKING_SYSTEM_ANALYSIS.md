# SW Beauty Booking System - Comprehensive Analysis

## Overview

The booking system is a **stateless, email-based reservation flow** built with Next.js, React, and TypeScript. It uses **Resend** for email notifications and implements **client-side form validation** with **Zod schemas**. Bookings are NOT stored in a database - they are only sent via email and partially tracked through the form UI.

---

## 1. BOOKING FORM COMPONENT

**Location:** `/Users/jangajdos/Desktop/SWBEUATY/src/components/BookingForm.tsx`

### Structure
- **Type:** React Client Component (`'use client'`)
- **State Management:** React hooks (useState, useForm from react-hook-form)
- **Validation Library:** Zod schema validation
- **UI Components:** Shadcn/ui (Button, Input, Calendar, Select, Textarea, Popover)

### Key Features

#### 1.1 Form Fields & Validation
```typescript
const bookingSchema = z.object({
  service: z.string().min(1, 'Vyberte prosím službu'),
  name: z.string().min(2, 'Zadejte prosím jméno'),
  email: z.string().email('Zadejte prosím platný email'),
  phone: z
    .string()
    .min(9, 'Zadejte prosím platné telefonní číslo')
    .regex(/^(\+420)?[0-9]{9}$/, 'Zadejte platné české telefonní číslo'),
  preferredDate: z.string().min(1, 'Vyberte prosím datum'),
  preferredTime: z.string().min(1, 'Vyberte prosím čas'),
  message: z.string().optional(),
})
```

**Validation Rules:**
- **Service:** Required, minimum 1 character
- **Name:** Required, minimum 2 characters
- **Email:** Required, must be valid email format
- **Phone:** Required, min 9 digits, Czech format validation (+420XXXXXXXXX or XXXXXXXXX)
- **Preferred Date:** Required, must be selected
- **Preferred Time:** Required, must be selected
- **Message:** Optional

#### 1.2 Dynamic Date/Time Selection
- **Calendar Component:** Shows calendar with disabled Sundays and past dates
- **Time Slots:** Generated based on day of week:
  - **Saturday:** 10:00-18:00 (1-hour slots)
  - **Other days:** 9:00-20:00 (1-hour slots)
  - **Sunday:** Disabled (salon closed)

#### 1.3 Service Loading
- Fetches services from `/api/pricelist` on component mount
- Maps CSV data to form options
- Supports service preselection via props

#### 1.4 Form State Management
```typescript
const [isSubmitting, setIsSubmitting] = useState(false)      // API call in progress
const [isSuccess, setIsSuccess] = useState(false)            // Form submission successful
const [errorMessage, setErrorMessage] = useState<string>('') // Error display
const [allServices, setAllServices] = useState<ServiceFromAPI[]>([])
const [selectedDate, setSelectedDate] = useState<Date>()
const [timeSlots, setTimeSlots] = useState<string[]>([])
```

#### 1.5 Form Submission Flow
```
User Fills Form
    ↓
Client-Side Zod Validation (react-hook-form)
    ↓
Sunday Check (if Sunday, show error)
    ↓
setIsSubmitting(true)
    ↓
POST /api/booking with FormData
    ↓
Check Response Status (200 OK or 202 Accepted)
    ↓
If Success: Show success alert → Reset form → Auto-clear after 6s
If Error: Show error message
    ↓
setIsSubmitting(false)
```

#### 1.6 Error Handling
- **Local validation errors:** Show inline via react-hook-form
- **Sunday validation:** Custom error message before API call
- **API errors (400-500):** Show error message in red alert
- **Network errors:** Catch and display generic message
- **202 Accepted:** Booking accepted but email failed - show warning

#### 1.7 UI Feedback
- **Success message:** Displays in green alert box for 6 seconds
- **Error message:** Displays in red alert box with detailed text
- **Submit button:** Disabled during submission, shows "Odesílám..."
- **Validation errors:** Show below each field in red text

---

## 2. BOOKING API ROUTE

**Location:** `/Users/jangajdos/Desktop/SWBEUATY/src/app/api/booking/route.ts`

### Flow Diagram
```
POST /api/booking
    ↓
1. Rate Limit Check (5 requests/hour per IP)
    ├─ If exceeded → return 429
    └─ Otherwise continue
    ↓
2. Initialize Resend Email Service
    ├─ Check RESEND_API_KEY environment variable
    └─ If missing → return 500
    ↓
3. Parse Request Body
    ├─ Extract: service, name, email, phone, preferredDate, preferredTime, message
    ↓
4. Sanitize All Inputs
    ├─ sanitizeHtml() → Escape HTML chars
    ├─ sanitizeEmail() → Validate and lowercase
    ├─ sanitizePhone() → Remove non-digits
    └─ Check for required fields
    ↓
5. Send Owner Email (to info@swbeauty.cz)
    ├─ Subject: 🗓️ Nová rezervace - {name}
    ├─ From: rezervace@swbeauty.cz
    └─ Contains full booking details
    ↓
6. Send Customer Email (to customer)
    ├─ Subject: ✅ Potvrzení rezervace – SW Beauty
    ├─ From: rezervace@swbeauty.cz
    └─ Confirmation with booking summary
    ↓
7. Response
    ├─ If both emails succeed → return 200 { success: true }
    ├─ If customer email fails → return 202 { error: "...", partial: true }
    └─ If error thrown → return 500 { error: "..." }
```

### Rate Limiting
**Configuration:** 5 requests per hour per IP address

```typescript
const rateLimitResult = checkRateLimit(clientIp, 5, 60 * 60 * 1000)

if (!rateLimitResult.success) {
  return 429 with error: "Příliš mnoho požadavků. Zkuste to prosím za..."
}
```

**Implementation:** In-memory store (Map) with timestamp tracking
- Tracks requests by IP address
- Filters out requests older than 1 hour window
- Returns reset time (milliseconds until limit resets)

### Input Sanitization

**Sanitization Functions** (from `/src/lib/sanitize.ts`):

1. **sanitizeHtml(input)**
   - Escapes: &, <, >, ", ', /
   - Prevents XSS attacks in HTML context
   - Returns: sanitized string

2. **sanitizeEmail(email)**
   - Validates email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Trims and lowercases
   - Returns: null if invalid

3. **sanitizePhone(phone)**
   - Removes non-digit characters (keeps +)
   - Checks minimum 9 digits
   - Returns: null if invalid

### Email Templates

#### Owner Email (to info@swbeauty.cz)
```
Subject: 🗓️ Nová rezervace - {name}
From: rezervace@swbeauty.cz

Content:
- Service name
- Preferred date and time
- Customer contact info (name, email, phone)
- Optional message
- Note to contact customer within 24 hours
```

#### Customer Email (to customer@email.com)
```
Subject: ✅ Potvrzení rezervace – SW Beauty
From: rezervace@swbeauty.cz

Content:
- Thank you message
- Booking summary (service, date, time)
- Confirmation that salon will contact within 24 hours
- Business details (address, phone, email, website)
```

### HTTP Status Codes

| Status | Meaning | Response |
|--------|---------|----------|
| **200** | Success | `{ success: true }` |
| **202** | Partial Success | `{ error: "Email failed", partial: true }` |
| **400** | Validation Error | `{ error: "Missing required fields" }` |
| **429** | Rate Limited | `{ error: "Too many requests..." }` |
| **500** | Server Error | `{ error: "Failed to send booking" }` |

### Error Logging

All errors logged to console:
```typescript
console.warn('RESEND_API_KEY not set')
console.warn(`Rate limit exceeded for IP: ${clientIp}`)
console.error('Owner email error:', ownerError)
console.error('Client email error:', clientError)
console.log('✅ Booking email sent successfully')
console.error('❌ Booking API error:', error)
```

---

## 3. DATABASE & STORAGE

**Status:** NONE - No database implementation

### Key Finding
The system has **NO database** for storing bookings:
- Bookings are **NOT persisted** anywhere
- Only sent via email to owner and customer
- No booking history, no confirmation records
- No appointment tracking or calendar integration

### Implications
- Owner must manually manage bookings (via emails)
- No automated conflict detection
- No SMS/WhatsApp notifications to customer
- No booking confirmation or rescheduling system
- Bookings can be lost if emails fail

---

## 4. EMAIL FUNCTIONALITY

**Email Service:** Resend (via `resend` npm package)

### Configuration
```typescript
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set')
    return null
  }
  return new Resend(apiKey)
}
```

**Environment Variable:**
- File: `.env.local`
- Key: `RESEND_API_KEY=re_GfXksYLj_CASEqXdMEhnHWnrA5uxLKXea`

### Email Sending Process

**Owner Email:**
```typescript
const { error: ownerError } = await resend.emails.send({
  from: 'SW Beauty Rezervace <rezervace@swbeauty.cz>',
  to: 'info@swbeauty.cz',
  subject: `🗓️ Nová rezervace - ${sanitizedName}`,
  html: '...' // HTML template with booking details
})

if (ownerError) {
  console.error('Owner email error:', ownerError)
  throw ownerError // Stops processing
}
```

**Customer Email:**
```typescript
const { error: clientError } = await resend.emails.send({
  from: 'SW Beauty <rezervace@swbeauty.cz>',
  to: sanitizedEmail,
  subject: '✅ Potvrzení rezervace – SW Beauty',
  html: '...' // HTML template with confirmation
})

if (clientError) {
  console.error('Client email error:', clientError)
  return NextResponse.json({
    error: 'Vaše rezervace byla přijata, ale nepodařilo se poslat potvrzovací email. Kontaktujeme vás.',
    partial: true
  }, { status: 202 })
}
```

### Error Scenarios

1. **RESEND_API_KEY not set**
   - Returns: 500 error
   - Message: "Služba odesílání emailů není nakonfigurována"

2. **Owner email fails**
   - Throws error → returns 500
   - Message: "Nepodařilo se odeslat rezervaci"

3. **Customer email fails** (NEW behavior)
   - Returns: 202 Accepted status
   - Message: "Vaše rezervace byla přijata, ale nepodařilo se poslat potvrzovací email"
   - Reason: Owner was notified, booking "accepted" even if customer email fails

---

## 5. ERROR HANDLING & LOGGING

### Client-Side Error Handling (BookingForm.tsx)

```typescript
try {
  const response = await fetch('/api/booking', { ... })
  const responseData = await response.json()

  if (response.ok || response.status === 202) {
    // 200 OK or 202 Accepted
    setIsSuccess(true)
    if (responseData.error) {
      setErrorMessage(responseData.error) // Show warning
    }
  } else {
    // 400, 429, 500, etc.
    setErrorMessage(responseData.error || 'Chyba při odesílání...')
  }
} catch (error) {
  console.error('Booking error:', error)
  setErrorMessage('Nastala chyba při odesílání...')
} finally {
  setIsSubmitting(false)
}
```

**User-Facing Messages:**
- Success: "Rezervace odeslána!" (green alert, 6s timeout)
- Validation error: "Salon je v neděli zavřený..."
- Rate limit: "Příliš mnoho požadavků. Zkuste to..."
- Email error: "Vaše rezervace byla přijata, ale email selhал..."
- Network error: "Nastala chyba při odesílání..."

### Server-Side Logging (booking/route.ts)

**Console Logs:**
```
✅ Successful:
  - console.log('✅ Booking email sent successfully')

⚠️ Warnings:
  - console.warn('RESEND_API_KEY not set')
  - console.warn(`Rate limit exceeded for IP: ${clientIp}`)

❌ Errors:
  - console.error('Owner email error:', ownerError)
  - console.error('Client email error:', clientError)
  - console.error('❌ Booking API error:', error)
```

**Note:** Errors logged to browser console only - no persistent logging system

---

## 6. POTENTIAL ISSUES & WHAT MIGHT BE BROKEN

### Critical Issues

1. **No Booking Persistence**
   - If email service fails, booking is lost
   - No retry mechanism
   - No backup storage

2. **Email Rate Limiting Gap**
   - API has rate limiting (5/hour per IP)
   - But no limit on email sending to Resend
   - Could get expensive if spammed

3. **Date Format Issue**
   - Form sends: `yyyy-MM-dd` string from calendar
   - API tries to parse: `new Date(preferredDate).toLocaleDateString('cs-CZ')`
   - This could fail if timezone handling is wrong

### Medium Issues

4. **Environment Variable Not Set**
   - If RESEND_API_KEY not in `.env.local`, returns 500
   - No graceful degradation (e.g., fallback email)

5. **Incomplete Validation**
   - Client-side Zod schema exists
   - But API doesn't validate dates/times format
   - Phone validation regex different on client vs server

6. **No Booking Status Tracking**
   - No way to check if booking was received
   - No confirmation code or reference number
   - No receipt for customer

7. **Modal vs Form Mismatch**
   - Two different booking implementations exist:
     - `BookingForm.tsx` (newer, with proper validation)
     - `BookingModal.tsx` (older, without API integration)
   - Modal has basic form with no API submission

### Minor Issues

8. **Missing Phone on Preselection**
   - `ServiceBookingButton` doesn't include phone in service object
   - Phone becomes empty on preselected bookings

9. **Time Slots Hardcoded**
   - Times are 1-hour slots (9:00, 10:00, etc.)
   - No consideration for service duration
   - Could double-book if service takes 90 minutes

10. **No Availability Checking**
    - Any date/time can be selected
    - No check if salon is already booked
    - Owner must manually check conflicts

11. **Error Messages in Czech Only**
    - Some validation errors are client-side only
    - Good for CZ market, but limits internationalization

---

## 7. COMPONENT DEPENDENCIES

### BookingForm.tsx Dependencies
```
├── react (hooks: useState, useEffect, useCallback, useRef)
├── react-hook-form (form management)
├── zod (schema validation)
├── @hookform/resolvers/zod
├── UI Components
│   ├── Button (shadcn/ui)
│   ├── Calendar (shadcn/ui)
│   ├── Input (shadcn/ui)
│   ├── Popover (shadcn/ui)
│   ├── Select (shadcn/ui)
│   └── Textarea (shadcn/ui)
├── date-fns (date formatting)
├── lucide-react (icons)
└── lib/utils (cn helper)
```

### API Route Dependencies
```
├── next/server (NextResponse)
├── resend (email service)
├── lib/rateLimit (checkRateLimit, getClientIp, formatResetTime)
└── lib/sanitize (sanitizeHtml, sanitizeEmail, sanitizePhone)
```

---

## 8. RECENT CHANGES (From git diff)

### Changes Made to BookingForm.tsx
1. Added `errorMessage` state for error display
2. Changed from `alert()` to `setErrorMessage()` for Sunday validation
3. Added error clearing on form submission
4. Now handles 202 status (partial success)
5. Shows error message even on success if present
6. Added 6s timeout to clear success/error messages
7. Added detailed error messaging for API failures
8. Added try/catch for network errors

### Changes Made to booking/route.ts
1. Changed client email error handling:
   - **Before:** Threw error (returned 500)
   - **After:** Returns 202 Accepted status
2. Added success logging: `console.log('✅ Booking email sent successfully')`
3. Added error emoji to error log: `console.error('❌ Booking API error:', error)`

**Impact:** More graceful handling of email failures - booking accepted even if customer email fails

---

## 9. ARCHITECTURE COMPARISON: BookingForm vs BookingModal

| Feature | BookingForm.tsx | BookingModal.tsx |
|---------|-----------------|-----------------|
| **Type** | Updated, production | Older, incomplete |
| **Validation** | Zod + react-hook-form | Basic manual |
| **API Integration** | ✅ Full POST /api/booking | ❌ No API (console.log only) |
| **Error Handling** | ✅ Detailed error messages | ❌ Basic alert() |
| **Date Picker** | ✅ Calendar component | ❌ Native input type="date" |
| **Time Slots** | ✅ Dynamic generation | ❌ Hardcoded array |
| **Services** | ✅ Fetch from /api/pricelist | ✅ Fetch from /api/services |
| **Email** | ✅ Sends to both owner & customer | ❌ No email |
| **Status** | Production-ready | Draft/legacy |

**Recommendation:** Use BookingForm.tsx only. BookingModal.tsx appears to be an older version.

---

## 10. TESTING CHECKLIST

### Functional Tests
- [ ] Form validation (all fields required)
- [ ] Sunday date rejection
- [ ] Past date rejection
- [ ] Time slot generation (Saturday vs other days)
- [ ] Phone validation (Czech format)
- [ ] Email format validation
- [ ] Preselected service display
- [ ] API call on submit
- [ ] Success message display (6s timeout)
- [ ] Error message display

### Email Tests
- [ ] Owner email sent successfully
- [ ] Customer confirmation email sent
- [ ] HTML formatting correct in emails
- [ ] Sanitized data in email content
- [ ] 202 response when customer email fails

### Rate Limiting Tests
- [ ] 5 successful requests allowed
- [ ] 6th request returns 429
- [ ] Reset time calculated correctly
- [ ] Different IPs get separate limits

### Integration Tests
- [ ] Services load from /api/pricelist
- [ ] All form data sent to API
- [ ] Modal opens/closes properly
- [ ] Success clears form state

---

## 11. SUMMARY OF FINDINGS

### What Works Well
✅ Client-side validation with Zod
✅ Proper input sanitization
✅ Rate limiting per IP
✅ Email service integration (Resend)
✅ Graceful handling of partial failures (202 status)
✅ Good UX feedback (success/error messages)
✅ Czech language support
✅ Accessible form components

### What Needs Improvement
❌ No database/persistence layer
❌ No booking history or tracking
❌ No conflict detection for double-booking
❌ No SMS/WhatsApp confirmation to customer
❌ No booking rescheduling
❌ Date format parsing could be fragile
❌ Service duration not considered in time slots
❌ No logging beyond console
❌ Two competing booking implementations (cleanup needed)

### Recommended Fixes (Priority Order)
1. **High:** Add database (Supabase, MongoDB, etc.) to persist bookings
2. **High:** Implement booking conflict detection
3. **High:** Add confirmation code/reference number
4. **Medium:** Add admin dashboard to view/manage bookings
5. **Medium:** Implement SMS notifications (Twilio, etc.)
6. **Medium:** Add booking rescheduling functionality
7. **Low:** Replace BookingModal with BookingForm
8. **Low:** Add persistent logging system

---

**Last Updated:** November 12, 2025
**Files Analyzed:**
- `/Users/jangajdos/Desktop/SWBEUATY/src/components/BookingForm.tsx`
- `/Users/jangajdos/Desktop/SWBEUATY/src/app/api/booking/route.ts`
- `/Users/jangajdos/Desktop/SWBEUATY/src/lib/sanitize.ts`
- `/Users/jangajdos/Desktop/SWBEUATY/src/lib/rateLimit.ts`
- `/Users/jangajdos/Desktop/SWBEUATY/src/components/BookingModal.tsx`
- `/Users/jangajdos/Desktop/SWBEUATY/src/app/api/contact/route.ts`

