# Codebase Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── booking/       # Booking API
│   │   └── pricelist/     # Pricelist API
│   ├── cenik/            # Pricing page
│   ├── kontakt/          # Contact page
│   ├── o-salonu/         # About salon page
│   ├── obchodni-podminky/ # Terms page
│   ├── ochrana-osobnich-udaju/ # Privacy page
│   ├── poukazy/          # Vouchers page
│   ├── rezervace/        # Reservation page
│   ├── sluzby/           # Services pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles
│   └── favicon.ico
├── components/            # Reusable React components
│   ├── BookingForm.tsx
│   ├── ContactForm.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── PriceCard.tsx
│   ├── ServiceCard.tsx
│   ├── TestimonialCard.tsx
│   └── ...
├── data/                  # Static data files
│   ├── faq.ts
│   ├── highlights.ts
│   ├── instagram.ts
│   ├── testimonials.ts
│   └── why.ts
├── lib/                   # Utility functions
│   └── services.ts
└── types/                 # TypeScript type definitions
    └── index.ts
```

## Key Directories
- `app/`: Contains all page routes and API endpoints
- `components/`: Reusable UI components
- `data/`: Static content and configuration
- `lib/`: Business logic and utilities
- `types/`: TypeScript interfaces and types