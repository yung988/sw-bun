# SW Beauty Project Overview

## Purpose
SW Beauty is a professional cosmetic salon website located in Hodonín, Czech Republic. The site showcases cosmetic services using modern technologies like HIFU, Endosphere, and EMS. It includes booking functionality, service listings, pricing, testimonials, and contact information.

## Tech Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **Frontend**: React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4.1.0
- **Animations**: GSAP 3.13.0, Lenis 1.3.11 for smooth scrolling
- **UI Components**: Radix UI, Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Email**: Resend for contact/newsletter
- **Analytics**: Vercel Analytics and Speed Insights
- **Build Tool**: Bun
- **Linting/Formatting**: Biome 1.9.4

## Codebase Structure
- `src/app/` - Next.js app router pages and API routes
- `src/components/` - Reusable React components
  - `animations/` - Custom animation components (GSAP-based)
  - `ui/` - UI primitives (buttons, inputs, etc.)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility libraries and server functions
- `src/data/` - Static data files
- `src/types/` - TypeScript type definitions

## Key Features
- Service booking system
- Dynamic service categories and listings
- Image galleries and mosaics
- Testimonials and FAQ
- Newsletter subscription
- Contact forms
- Voucher system
- Instagram integration
- Responsive design with mobile/desktop variants