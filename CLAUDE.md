# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SW Beauty is a luxury cosmetics salon one-page website with an advanced booking system and gift voucher functionality. Built as a vanilla JavaScript application with Vercel serverless functions for backend operations.

**Tech Stack:**
- Frontend: Vanilla HTML/CSS/JS with Tailwind CSS (CDN)
- Backend: Vercel Serverless Functions (Node.js)
- Email: Resend API
- Storage: Vercel Blob Storage (for images)
- Data: CSV files (services.csv, prices.csv)
- Animations: GSAP + Lenis smooth scroll

## Development Commands

### Local Development

Frontend only (static server):
```bash
npx serve .
# or
python3 -m http.server 8000
```

Full stack with API functions:
```bash
npm run dev
# or
vercel dev
```

### Deployment

```bash
npm run deploy
# or
vercel --prod
```

## Architecture

### Data Flow

**Service & Price Data:**
- Services defined in `services.csv` with columns: service_id, category_name, short_description, full_description, benefits, indications, contraindications, image
- Prices defined in `prices.csv` with columns: service_id, service_type, name, duration_in_minutes, session, price_in_czk
- Frontend loads CSV files directly and parses them client-side using custom CSV parser in `app.js`
- Images stored on Vercel Blob Storage; CSV contains full URLs (semicolon-separated for multiple images)

**Booking Flow:**
1. Client submits form → `POST /api/booking-request`
2. Owner receives email with secure confirmation link
3. Client receives initial acknowledgment email
4. Owner clicks link → `GET /api/confirm-booking` (shows confirmation form)
5. Owner submits → `POST /api/confirm-booking`
6. Client receives final confirmation email

**Voucher Flow:**
1. Client submits voucher form → `POST /api/voucher-order`
2. Owner receives email with "Confirm Payment" link
3. Owner clicks after receiving payment → `GET /api/confirm-payment`
4. Client automatically receives voucher email

### Security

- All confirmation URLs use SHA-256 hash-based authentication
- Hash generation in `lib/utils/email-templates.js:generateHash()`
- Verifies hash matches email+amount+service+VOUCHER_SECRET
- HTML escaping on all user inputs to prevent XSS
- Environment variables for all secrets

### Email System

**Templates:**
- `lib/utils/email-templates.js` - Voucher email templates + hash utilities
- `lib/utils/booking-templates.js` - Booking email templates

**Resend Configuration:**
- From: `SW Beauty <noreply@swbeauty.cz>`
- Owner emails to: `info@swbeauty.cz`
- Uses professional HTML templates with inline CSS for email client compatibility

### Image Management

**Vercel Blob Storage:**
- Upload scripts: `upload-images.js`, `upload-portraits.js`, `upload-hydrafacial.js`, `upload-single-image.js`
- Update CSVs with blob URLs: `update-services.js`
- Images accessed via full HTTPS URLs stored in CSV
- Frontend helper `getImageUrl()` in `app.js` handles both blob URLs and local fallbacks

**Upload Process:**
```bash
# Upload images to Vercel Blob
node upload-images.js

# Update services.csv with new blob URLs
node update-services.js
```

### Frontend Structure

**app.js (~930 lines):**
- CSV parser (parseCSV, parseCSVLine)
- Service data loading and rendering
- Modal system (service details, booking, vouchers, price list)
- Image URL mapping and hover effects
- GSAP scroll animations and parallax effects
- Lenis smooth scrolling integration
- Auto-hide navbar on scroll

**index.html (~2447 lines):**
- Single-page layout with sections: Hero, About, Services, Contact
- Multi-step modals (booking, voucher)
- Inline styles for animations and custom components
- CDN dependencies (Tailwind, GSAP, Lucide icons)

## Environment Variables

Required in `.env.local` and Vercel dashboard:

```env
RESEND_API_KEY=re_xxxxx                    # Resend API key
VOUCHER_SECRET=min-20-znaku-random-string  # Secret for URL hash security
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx      # Vercel Blob storage token
```

## Important Notes

- **No build step required** - vanilla JS runs directly in browser
- **CSV as database** - services and prices stored in CSV files, not a traditional database
- **Serverless functions** are in `/api` directory, auto-deployed with Vercel
- **Email domain verified** - noreply@swbeauty.cz must be verified in Resend dashboard
- **Hash-based security** - never skip hash validation in confirmation endpoints
- **Mobile-first design** - breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop), >1920px (large)

## Common Tasks

### Adding a New Service

1. Add row to `services.csv` with unique service_id
2. Add corresponding prices to `prices.csv`
3. Upload service images to Vercel Blob
4. Run `node update-services.js` to update image URLs in CSV
5. Frontend automatically picks up changes (no rebuild needed)

### Modifying Email Templates

1. Edit templates in `lib/utils/email-templates.js` or `lib/utils/booking-templates.js`
2. Always use `escapeHtml()` for user-provided content
3. Test with `vercel dev` before deploying
4. Use inline CSS styles (email clients don't support external CSS)

### Debugging API Functions

```bash
# Check Vercel function logs
vercel logs

# Test locally with function logs in terminal
vercel dev
```

### Managing Images

- Images primarily stored on Vercel Blob Storage for performance and CDN benefits
- Local `/images` directory contains favicon and fallback images
- CSV files contain full blob URLs for each service (semicolon-separated for multiple images)
- Use provided upload scripts to maintain consistency

## Design System

**Typography:**
- Headers: Cormorant Garamond (serif, luxurious)
- Body: Inter (sans-serif, readable)
- Font loaded via Google Fonts

**Colors:**
- Primary background: #FDFBF7 (warm stone)
- Text: #1c1917 (stone-900)
- Accents: Stone palette (200-600)
- Luxurious, minimal aesthetic

**Components:**
- Auto-hide navbar with blur backdrop
- Modal system with backdrop blur
- Service cards with hover image transitions
- Multi-step forms with validation
- Sticky scroll sections with parallax effects
