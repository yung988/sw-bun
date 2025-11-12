# Booking System - Issues Summary & Action Items

## Quick Reference

This document summarizes known issues in the SW Beauty booking system and recommendations for fixing them.

---

## CRITICAL ISSUES (Must Fix)

### 1. No Database Persistence

**Problem:**
- Bookings are ONLY sent via email
- No permanent record of bookings
- If email fails, booking is lost completely
- No booking history or tracking

**Impact:**
- Owner cannot view past bookings
- No way to check double-bookings
- Customers cannot track booking status
- Manual follow-up required for all bookings

**Fix Recommendation (Priority: HIGH):**
```typescript
// Implement one of:
// Option A: Supabase (PostgreSQL) - Recommended for small business
// Option B: MongoDB - Flexible schema
// Option C: Firebase Firestore - Serverless

// Add table/collection:
Bookings {
  id: string (UUID)
  serviceId: string
  serviceName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  preferredDate: Date
  preferredTime: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}
```

---

### 2. No Conflict Detection

**Problem:**
- Same date/time can be booked multiple times
- No check for double-bookings
- No service duration consideration
- 1-hour slots don't match service lengths (many are 90+ minutes)

**Impact:**
- Overbooking
- Customer disappointment
- Manual conflict resolution
- Lost time

**Fix Recommendation (Priority: HIGH):**
```typescript
// Before confirming booking, check:
1. Service duration (from pricelist)
2. Existing bookings in that time window
3. Add buffer time (e.g., 15 min between bookings)

// Example:
const serviceData = await getServiceInfo(serviceName)
const duration = serviceData.duration // e.g., 90 minutes
const endTime = parseTime(preferredTime) + duration

// Check for conflicts
const conflicts = await db.bookings.findMany({
  where: {
    preferredDate: data.preferredDate,
    preferredTime: { between: startTime - buffer, endTime + buffer }
    status: { in: ['pending', 'confirmed'] }
  }
})

if (conflicts.length > 0) {
  return 400 { error: "Time slot not available" }
}
```

---

### 3. Email Service Critical Dependency

**Problem:**
- System breaks completely if RESEND_API_KEY is missing
- No fallback email service
- Expensive (Resend charges per email)
- No email queueing/retry mechanism

**Impact:**
- Bookings fail silently if API key expires
- No graceful degradation
- High cost if abused

**Fix Recommendation (Priority: HIGH):**
```typescript
// Option 1: Add fallback email service
const getEmailService = () => {
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY)
  }
  if (process.env.SENDGRID_API_KEY) {
    return new SendGrid(process.env.SENDGRID_API_KEY)
  }
  // Option 3: Queue for manual processing
  return null
}

// Option 2: Queue emails instead of sending directly
// Use: Bull (Redis), SQS, or database queue
// Allows retry, prevents loss

// Option 3: Add cost limiting
// Track emails sent per day
// Alert when threshold reached
```

---

## HIGH PRIORITY ISSUES (Fix Soon)

### 4. No Booking Confirmation Number

**Problem:**
- Customers get no confirmation code
- Cannot reference booking without email
- No unique identifier in system

**Impact:**
- Customer confusion
- Hard to track which booking
- Poor customer experience

**Fix Recommendation:**
```typescript
// Generate UUID or short code on booking creation
const confirmationCode = generateCode() // e.g., "SW-20251112-ABC123"

// Include in both emails:
// - Owner email: "Reference: SW-20251112-ABC123"
// - Customer email: "Your booking code: SW-20251112-ABC123"

// Store in database for lookup
await db.bookings.create({
  confirmationCode,
  ...data
})
```

---

### 5. Two Competing Implementations

**Problem:**
- `BookingForm.tsx` (new) - fully working with API
- `BookingModal.tsx` (old) - no API integration
- Code duplication and confusion
- Different validation rules

**Impact:**
- Maintenance nightmare
- Inconsistent behavior
- Dead code

**Fix Recommendation:**
```bash
# Action items:
1. Audit all pages to see which component is actually used
2. Delete BookingModal.tsx completely
3. Replace all BookingModal usage with BookingForm
4. Update ModalProvider to use BookingForm
5. Remove useBookingModal() hook if no longer needed
```

---

### 6. Date/Time Format Fragility

**Problem:**
- Client sends: `yyyy-MM-dd` string
- Server parses: `new Date(preferredDate).toLocaleDateString('cs-CZ')`
- Timezone handling could break
- No explicit validation of date format

**Impact:**
- Dates could be off by 1 day in some timezones
- Unclear format in database

**Fix Recommendation:**
```typescript
// Use ISO 8601 consistently
// Client sends: "2025-11-20T14:00:00Z"
// Server stores as ISO string

// Better approach: use date library
import { parse, format } from 'date-fns'

const parsedDate = parse(data.preferredDate, 'yyyy-MM-dd', new Date())
const isoString = parsedDate.toISOString()

// Validate explicitly
if (isNaN(parsedDate.getTime())) {
  return 400 { error: "Invalid date format" }
}
```

---

### 7. No Rate Limit on Email Sending

**Problem:**
- API has rate limit (5 req/hour per IP)
- But no limit on emails sent to Resend
- Resend charges per email
- Could be abused

**Impact:**
- Unexpected costs
- Account limits hit
- Email service disruption

**Fix Recommendation:**
```typescript
// Add secondary rate limit for emails
// Track emails sent per email address
const emailRateLimit = await checkEmailRateLimit(
  customerEmail,
  limit = 1, // max 1 booking per customer per day
  window = 24 * 60 * 60 * 1000
)

// Or add cost tracking
const bookingsToday = await db.bookings.count({
  where: { createdAt: { gte: today } }
})

if (bookingsToday > dailyLimit) {
  // Alert admin or queue for manual review
}
```

---

## MEDIUM PRIORITY ISSUES

### 8. No Admin Dashboard

**Problem:**
- Owner only sees emails
- No way to manage bookings
- No way to see all bookings at once
- No way to modify or confirm bookings

**Impact:**
- Hard to manage
- No visibility
- Customer follow-up painful

**Fix Recommendation:**
```typescript
// Create admin page at /admin/bookings
// Features:
// - List all bookings (filters: date, status, service)
// - View booking details
// - Mark as confirmed
// - Mark as completed
// - Add notes
// - Cancel/reschedule
// - Export to calendar (iCal)

// Protected route with authentication
// Use middleware to check admin role
```

---

### 9. No Customer Notifications Beyond Email

**Problem:**
- Only email sent to customer
- No SMS/WhatsApp reminder
- No automated follow-up
- No confirmation callback

**Impact:**
- Low response rate
- High no-show rate
- Wasted time

**Fix Recommendation:**
```typescript
// Add SMS notifications (use Twilio)
// Add WhatsApp integration
// Add reminder at T-24h, T-1h

// Example with Twilio:
const twilio = require('twilio')(accountSid, authToken)
await twilio.messages.create({
  body: `Ověření: ${confirmationCode}`,
  from: process.env.TWILIO_PHONE,
  to: customerPhone
})

// Schedule reminders
// Use cron job or cloud scheduler
```

---

### 10. Service Duration Not Used

**Problem:**
- Pricelist has service duration (e.g., 90 min)
- Form shows 1-hour slots
- No duration passed to form
- Time slots too simplistic

**Impact:**
- Overbooking likely
- Wrong time slots offered

**Fix Recommendation:**
```typescript
// 1. Get service duration from form
const service = await getServiceData(data.service)
const duration = service.duration // e.g., 90

// 2. Generate time slots based on duration
const generateTimeSlots = (date, duration) => {
  // Saturday: 10:00-18:00
  // Other: 9:00-20:00
  // Slots every 30 min (not 1 hour)
  
  const slots = []
  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += 30) {
      const endTime = h * 60 + m + duration
      if (endTime <= closeHour * 60) {
        slots.push(`${h}:${m.toString().padStart(2, '0')}`)
      }
    }
  }
  return slots
}

// 3. Check availability for selected slot + duration
const checkAvailability = async (date, time, duration) => {
  const endTime = parseTime(time) + duration
  const conflicts = await db.bookings.findMany({
    where: {
      date,
      time: { between: startTime - buffer, endTime + buffer }
    }
  })
  return conflicts.length === 0
}
```

---

### 11. No Persistent Logging

**Problem:**
- Errors only logged to console
- No audit trail
- Hard to debug production issues
- Data loss on server restart

**Impact:**
- Can't trace errors
- No compliance records
- Hard to improve

**Fix Recommendation:**
```typescript
// Use service like: LogRocket, Sentry, or DataDog

import * as Sentry from "@sentry/nextjs"

Sentry.captureException(error, {
  contexts: {
    booking: {
      customerEmail: sanitizedEmail,
      service: sanitizedService,
      dateTime: `${preferredDate} ${preferredTime}`
    }
  }
})

// Or use database logging
await db.logs.create({
  level: 'error',
  message: error.message,
  context: { booking: {...} },
  timestamp: new Date()
})
```

---

## LOWER PRIORITY ISSUES

### 12. Incomplete Validation Mismatch

**Problem:**
- Client validates phone with regex: `^(\+420)?[0-9]{9}$`
- Server sanitizes but doesn't fully validate format
- No server-side time format validation
- No date format validation

**Fix Recommendation:**
```typescript
// Add Zod schema to API route
const bookingSchema = z.object({
  service: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^(\+420)?[0-9]{9}$/, 'Invalid phone'),
  preferredDate: z.string().refine(
    (d) => !isNaN(new Date(d).getTime()),
    'Invalid date'
  ),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time'),
  message: z.string().optional()
})

// Parse and validate
const validatedData = bookingSchema.parse(body)
```

---

### 13. No GDPR/Privacy Handling

**Problem:**
- No data deletion policy
- No consent management
- Email addresses stored indefinitely
- No "right to be forgotten" implementation

**Impact:**
- GDPR non-compliance
- Privacy concerns
- Legal risk

**Fix Recommendation:**
```typescript
// Add consent checkbox to form
// "I agree to contact via email/SMS"

// Add data retention policy
// Auto-delete after 1 year by default

// Add unsubscribe link in emails
// Implement DELETE endpoint

// Store consent status
Bookings {
  ...
  consentEmail: boolean
  consentSMS: boolean
  createdAt: Date
  expiresAt: Date (createdAt + 1 year)
}
```

---

### 14. Time Slot Generation Not Exported

**Problem:**
- `generateTimeSlots()` duplicated in BookingForm.tsx
- Could be shared function

**Fix Recommendation:**
```typescript
// Create /src/lib/timeSlots.ts
export function generateTimeSlots(date: Date, serviceDuration: number = 60): string[] {
  const day = date.getDay()
  const openHour = day === 6 ? 10 : 9
  const closeHour = day === 6 ? 18 : 20

  const slots: string[] = []
  for (let h = openHour; h < closeHour - (serviceDuration / 60); h++) {
    slots.push(`${h}:00`)
  }
  return slots
}

// Use everywhere needed
import { generateTimeSlots } from '@/lib/timeSlots'
```

---

## TESTING GAPS

### What's NOT tested:
- [ ] Email sending (manual testing only)
- [ ] Rate limiting (no automated tests)
- [ ] Sanitization (no test cases)
- [ ] Date/time edge cases
- [ ] Sunday validation
- [ ] Phone number validation (Czech format)
- [ ] API error scenarios
- [ ] Database conflicts (if DB added)

**Action Item:**
```bash
# Create test files:
src/app/api/booking/__tests__/route.test.ts
src/components/__tests__/BookingForm.test.tsx
src/lib/__tests__/sanitize.test.ts
src/lib/__tests__/rateLimit.test.ts

# Run:
npm test
```

---

## IMPLEMENTATION ROADMAP

### Week 1: Critical Fixes
- [ ] Add database (Supabase recommended)
- [ ] Implement booking persistence
- [ ] Add confirmation code generation
- [ ] Remove BookingModal.tsx

### Week 2: Data Integrity
- [ ] Implement conflict detection
- [ ] Add availability checking
- [ ] Add service duration support
- [ ] Fix date/time handling

### Week 3: User Experience
- [ ] Build admin dashboard
- [ ] Add booking confirmation page
- [ ] Add email/SMS reminders
- [ ] Add booking history for customers

### Week 4: Monitoring & Polish
- [ ] Add logging (Sentry)
- [ ] Add error tracking
- [ ] Write tests
- [ ] Add GDPR compliance

---

## QUICK WINS (Easy to Implement)

These can be done in 1-2 hours each:

1. **Add confirmation code** (30 min)
   - Generate UUID
   - Include in emails
   - Show on success page

2. **Fix date format** (45 min)
   - Use ISO 8601 consistently
   - Add explicit validation
   - Add timezone handling

3. **Export generateTimeSlots** (15 min)
   - Create utility function
   - Reuse everywhere
   - Add service duration support

4. **Add Zod validation to API** (30 min)
   - Copy schema from component
   - Validate all fields
   - Return detailed errors

5. **Add error boundary** (30 min)
   - Wrap form in error boundary
   - Show friendly error message
   - Prevent white screen crashes

---

## DEPENDENCIES TO ADD

If implementing all recommendations:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.0.0",
    "sentry/nextjs": "^7.0.0",
    "twilio": "^4.0.0",
    "bull": "^4.0.0",
    "node-cron": "^3.0.0"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0"
  }
}
```

---

## SUCCESS METRICS

After implementing fixes, measure:

1. **Booking completion rate** (target: 80%+)
   - Bookings received / bookings started

2. **Customer satisfaction** (target: 4.5+/5)
   - Add feedback form post-booking

3. **No-show rate** (target: <10%)
   - Bookings not completed

4. **System uptime** (target: 99.9%+)
   - Monitor API health

5. **Email delivery rate** (target: 95%+)
   - Track bounces/failures

---

**Last Updated:** November 12, 2025
**Status:** In Review
**Next Review:** December 12, 2025
