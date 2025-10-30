# Code Style and Conventions

## Formatting (Biome)
- Indent: 2 spaces
- Line width: 120 characters
- Quotes: Single for JS, double for JSX
- Trailing commas: ES5 style
- Semicolons: As needed
- Arrow parentheses: Always

## TypeScript
- Strict mode enabled
- Path aliases: `@/*` for `./src/*`
- Target: ES2017
- Module resolution: Bundler

## Linting Rules (Biome)
- Recommended rules enabled
- Custom rules:
  - `noExplicitAny`: Warn
  - `noArrayIndexKey`: Warn
  - `useConst`: Error
  - `noUnusedTemplateLiteral`: Warn
  - `noUnusedVariables`: Warn
  - `useExhaustiveDependencies`: Warn
  - `useKeyWithClickEvents`: Warn
  - `useAltText`: Error

## Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Files: kebab-case for components, camelCase for utilities
- Hooks: camelCase with `use` prefix (e.g., `useGSAP.ts`)
- Types: PascalCase interfaces, camelCase types

## Import Organization
- External imports first, then internal with `@/*` aliases
- Group by type: React, third-party, internal
- Organize imports automatically with Biome

## Component Patterns
- Functional components with hooks
- TypeScript interfaces for props
- Default exports for components
- Named exports for utilities/hooks