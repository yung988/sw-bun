# SW Beauty - Quick Reference Summary

## What's Already Built (COMPLETED)

### Core Platform Features
- Full Next.js 15 + React 19 application
- 7+ pages with responsive design
- Quiet luxury aesthetic with GSAP animations
- Service management from CSV data

### Service Management (COMPLETE)
- 7 main service categories with multiple subcategories
- Hierarchical service structure (parent/child relationships)
- Service details pages with:
  - Full descriptions
  - Benefits & indications
  - Contraindications
  - Multiple images per service
  - Pricing information
  - Related services

### Reservations/Bookings (COMPLETE)
- **BookingForm.tsx** - Standalone form component
- **BookingModal.tsx** - Modal wrapper with animations
- **POST /api/booking** - API endpoint
- Features:
  - Service selection
  - Date picker (disables past dates & Sundays)
  - Time slot selection (9-20:00 weekdays, 10-18:00 Saturday)
  - Contact information collection
  - Zod validation
  - Email confirmations to both customer and owner
  - Rate limiting (5 req/hr per IP)

### Gift Cards/Vouchers (COMPLETE)
- **VoucherForm.tsx** - Standalone form with live preview
- **VoucherModal.tsx** - Modal with animations
- **POST /api/voucher** - API endpoint
- Features:
  - Predefined amounts (500-5000 Kč) + custom
  - Two design options (light/dark)
  - Personalization (recipient, message)
  - Live preview with real data
  - Email confirmations
  - Rate limiting (5 req/hr per IP)

### Contact & Newsletter (COMPLETE)
- Contact form on `/kontakt` page
- POST /api/contact endpoint
- Newsletter subscription with welcome email
- POST /api/newsletter endpoint
- All with rate limiting and input sanitization

### Security (IMPLEMENTED)
- Input sanitization for all forms
- XSS protection
- Rate limiting on all APIs
- Czech phone number validation
- Email validation
- Zod schema validation

### Email Service (CONFIGURED)
- Resend 6.1.2 integration
- Multiple email addresses per service:
  - `rezervace@swbeauty.cz` - Bookings
  - `poukazy@swbeauty.cz` - Vouchers
  - `kontakt@swbeauty.cz` - Contact
  - `newsletter@swbeauty.cz` - Newsletter
- Professional HTML email templates
- Confirmation emails to customers
- Notification emails to salon owner

---

## What's Missing (TODO)

### Critical for Production
1. **Database** - Currently no persistent storage
   - Bookings stored only in email
   - No order history
   - No availability tracking

2. **Payment Integration**
   - Vouchers can't be purchased
   - No payment processing
   - Manual payment coordination

3. **Admin Dashboard**
   - No way to view bookings/orders
   - No management interface
   - No statistics/analytics

4. **Booking Management**
   - No confirmation from salon
   - No booking status tracking
   - No cancellation system
   - No automatic reminders

### Nice-to-Have Features
1. Customer login/accounts
2. Availability calendar
3. Voucher redemption codes
4. SMS notifications
5. Calendar integration (Google, Outlook)
6. Advanced analytics
7. Mobile app

---

## File Locations - Most Important Files

### To Modify Services
```
/public/services/pricelist_updated - services.csv    # Service definitions
/public/services/pricelist_updated - prices.csv      # Pricing data
/src/lib/services.ts                                  # Service loader
```

### To Modify Bookings
```
/src/components/BookingForm.tsx          # Form UI
/src/app/api/booking/route.ts            # API endpoint
```

### To Modify Vouchers
```
/src/components/VoucherForm.tsx          # Form UI with preview
/src/app/api/voucher/route.ts            # API endpoint
```

### To Modify Contact/Newsletter
```
/src/components/ContactForm.tsx          # Contact form
/src/components/SubscribeForm.tsx        # Newsletter form
/src/app/api/contact/route.ts            # Contact API
/src/app/api/newsletter/route.ts         # Newsletter API
```

### To Add New Pages
```
/src/app/[page-name]/page.tsx            # Create new page file
```

---

## Quick API Reference

### Booking API
```
POST /api/booking
{
  "service": "HIFU Facelift",
  "name": "Jana Nová",
  "email": "jana@example.com",
  "phone": "+420773577899",
  "preferredDate": "2024-11-15",
  "preferredTime": "14:00",
  "message": "Optional note"
}
Returns: { "success": true }
```

### Voucher API
```
POST /api/voucher
{
  "name": "Jan Novák",
  "email": "jan@example.com",
  "phone": "+420773577899",
  "amount": "1000",      // or "custom"
  "customAmount": null,  // if amount === "custom"
  "recipient": "Recipient name",
  "message": "Message",
  "design": "elegant"    // or "modern"
}
Returns: { "success": true }
```

### Services API
```
GET /api/services
Returns: [MainService[], MainService[], ...]
```

### Pricelist API
```
GET /api/pricelist
Returns: [PriceItem[], PriceItem[], ...]
```

---

## Development Commands

```bash
bun run dev              # Start dev server with Turbopack
bun run build            # Build for production
bun run start            # Start production server
bun run lint:fix         # Lint and fix code
bun run format           # Format code with Biome
```

---

## Tech Stack Summary

- **Frontend:** Next.js 15, React 19, TypeScript 5
- **Styling:** Tailwind CSS 4.1, Radix UI, shadcn/ui
- **Forms:** React Hook Form, Zod
- **Animations:** GSAP 3.13, Lenis 1.3
- **Email:** Resend 6.1.2
- **Data:** CSV files (PapaParse)
- **Hosting:** Vercel (recommended)

---

## Environment Variables Needed

```
RESEND_API_KEY=re_xxxxx...           # Email service API key
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxx  # Optional
```

---

## Next Steps to Launch

1. Set up Resend API key
2. Configure environment variables
3. Deploy to Vercel
4. Test all forms and APIs
5. Consider adding:
   - Database for bookings
   - Payment integration
   - Admin dashboard

---

**Last Updated:** November 12, 2024
