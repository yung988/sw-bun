# Design Patterns and Guidelines

## Animation Patterns
- GSAP for complex animations (timelines, ScrollTrigger)
- Lenis for smooth scrolling
- Custom animation components in `src/components/animations/`
- Animation hooks in `src/hooks/`

## Component Architecture
- Separation of UI components (`ui/`) and feature components
- Provider pattern for global state (BrandProvider, ModalProvider)
- Container/Presentational pattern where applicable

## Data Management
- Server components for data fetching
- Static data in `src/data/` files
- CSV-based service data with image resolution

## Responsive Design
- Mobile-first approach
- Different layouts for mobile/desktop (e.g., ServicesSection vs HorizontalScrollSection)
- Tailwind responsive utilities

## Performance
- Image optimization with Next.js
- Lazy loading for galleries
- Code splitting with dynamic imports where needed

## Accessibility
- Alt text for images (linted as error)
- Keyboard navigation support
- Semantic HTML structure