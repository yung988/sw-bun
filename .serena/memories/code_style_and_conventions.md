# Code Style and Conventions

## TypeScript
- Strict mode enabled
- No explicit `any` types (warn level)
- Unused variables (warn level)
- Exhaustive dependencies in hooks (warn level)

## Formatting (Biome)
- Indent: 2 spaces
- Quote style: single quotes for JS, double for JSX
- Trailing commas: ES5 style
- Semicolons: as needed
- Arrow parentheses: always
- Line width: 120 characters
- Line ending: LF

## Linting Rules
- Recommended rules enabled
- Accessibility: use alt text (error), key with click events (warn)
- Style: use const (error), no unused template literals (warn)
- Correctness: no unused variables (warn), exhaustive dependencies (warn)
- Suspicious: no explicit any (warn), no array index key (warn)

## Naming Conventions
- Components: PascalCase (e.g., BookingForm.tsx)
- Files: PascalCase for components, camelCase for utilities
- Imports: Use @/* path alias for src directory

## Structure
- Pages in src/app/ (App Router)
- Components in src/components/
- Data in src/data/
- Utilities in src/lib/
- Types in src/types/

## Patterns
- Functional components with hooks
- TypeScript interfaces for props
- Zod schemas for form validation
- Framer Motion for animations
- Tailwind for styling