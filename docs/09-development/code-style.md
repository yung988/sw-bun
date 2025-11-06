# Code Style Guidelines

> SW Beauty coding standards a best practices

## TypeScript Guidelines

### Strict Mode
```typescript
// tsconfig.json - ALWAYS strict
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

### Explicit Return Types
```typescript
// ✅ Explicit
function getServices(): Promise<Service[]> {
  return getAllServices()
}

// ❌ Implicit
function getServices() {
  return getAllServices()  // Inference OK, ale explicit je lepší
}
```

### Interface vs Type
```typescript
// ✅ Interface pro object shapes (extendable)
interface Service {
  slug: string
  name: string
}

interface ExtendedService extends Service {
  category: string
}

// ✅ Type pro unions, primitives, utilities
type Status = 'pending' | 'completed' | 'error'
type Props = ComponentProps<'button'> & { variant: string }
```

### Avoid `any`
```typescript
// ❌ BAD
function process(data: any) {}

// ✅ GOOD - Use generics
function process<T>(data: T) {}

// ✅ GOOD - Use unknown + type guard
function process(data: unknown) {
  if (typeof data === 'string') {
    // data is string here
  }
}
```

---

## React Guidelines

### Functional Components
```tsx
// ✅ Function declaration (preferovaný)
export default function MyComponent({ prop }: Props) {
  return <div>{prop}</div>
}

// ✅ Arrow function (OK pro malé komponenty)
const MyComponent = ({ prop }: Props) => <div>{prop}</div>

// ❌ Vyhýbat se class components
class MyComponent extends React.Component {}  // NO
```

### Server Components Best Practices
```tsx
// ✅ Server Component (default v App Router)
export default async function Page() {
  const data = await fetchData()  // Server-side fetch
  return <Client data={data} />
}

// ✅ Data v props, ne v children
<ClientComponent data={serverData} />  // YES
<ClientComponent>{serverData}</ClientComponent>  // Avoid
```

### Client Components Best Practices
```tsx
'use client'

// ✅ Minimalizovat Client Components
// - Pouze kde je potřeba interaktivita
// - Co nejhlouběji v tree (ne celá page)

// ✅ Extract hooks
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }
}

// ✅ Memoize expensive computations
const filtered = useMemo(() =>
  items.filter(item => item.name.includes(search)),
  [items, search]
)
```

### Hooks Patterns
```tsx
// ✅ Hooks na TOP level (ne v conditions)
function MyComponent() {
  const [state, setState] = useState('')  // TOP

  if (condition) {
    // ❌ NEVER hooks zde
  }

  return <div />
}

// ✅ Dependency arrays
useEffect(() => {
  // Effect code
}, [dep1, dep2])  // ALWAYS specify deps (or [])

// ✅ Cleanup
useEffect(() => {
  const sub = subscribe()
  return () => sub.unsubscribe()  // Cleanup
}, [])
```

---

## Naming Conventions

### Components (PascalCase)
```tsx
// ✅ Component files & exports
BookingModal.tsx
export default function BookingModal() {}

// ✅ Types
type BookingModalProps = {}
interface Service {}
```

### Files (kebab-case nebo PascalCase podle typu)
```
components/
  BookingModal.tsx         # PascalCase pro komponenty
  OpenBookingButton.tsx

lib/
  services.ts              # kebab-case pro utility
  price-formatter.ts

app/
  page.tsx                 # Next.js conventions
  [kategorie]/page.tsx
```

### Variables (camelCase)
```typescript
const userId = '123'
const isLoggedIn = true
const fetchUserData = () => {}

function handleClick() {}
```

### Constants (UPPER_CASE)
```typescript
const API_URL = 'https://api.example.com'
const MAX_RETRIES = 3
const DEFAULT_TIMEOUT = 5000
```

### Private (prefix _)
```typescript
function _privateHelper() {}  // Konvence, ne enforcement
const _internalState = {}
```

---

## File Organization

### Import Order
```tsx
// 1. React
import { useState, useEffect } from 'react'

// 2. Next.js
import Image from 'next/image'
import Link from 'next/link'

// 3. External libraries
import { gsap } from 'gsap'
import { z } from 'zod'

// 4. Internal - absolute imports (@/)
import { Button } from '@/components/ui/button'
import { getAllServices } from '@/lib/services'

// 5. Relative imports
import { useModal } from './hooks'
import styles from './styles.module.css'

// 6. Types (pokud separate)
import type { Service } from '@/types'
```

**Biome auto-organize:**
```json
// biome.json
{
  "organizeImports": {
    "enabled": true
  }
}
```

### Component Structure
```tsx
'use client'  // Pokud Client Component

// Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// Types
type Props = {
  title: string
  onClose: () => void
}

// Constants
const TIMEOUT = 3000

// Component
export default function MyComponent({ title, onClose }: Props) {
  // 1. Hooks
  const [isOpen, setIsOpen] = useState(false)

  // 2. Derived state
  const isDisabled = !isOpen

  // 3. Effects
  useEffect(() => {}, [])

  // 4. Handlers
  const handleClick = () => {}

  // 5. Render
  return <div />
}

// Helper functions (po komponentě)
function helperFunction() {}
```

### Exports
```typescript
// ✅ Named exports pro utilities
export function formatPrice(price: number) {}
export function parseCSV(csv: string) {}

// ✅ Default export pro komponenty
export default function BookingModal() {}

// ✅ Re-exports
export { Button } from './Button'
export { Input } from './Input'
```

---

## Comments & Documentation

### JSDoc
```typescript
/**
 * Načte všechny služby z CSV souboru
 * @returns Promise<Service[]> - Pole všech služeb
 */
export async function getAllServices(): Promise<Service[]> {
  // Implementation
}

/**
 * BookingModal props
 */
type BookingModalProps = {
  /** Zda je modal otevřený */
  isOpen: boolean
  /** Callback při zavření */
  onClose: () => void
}
```

### Inline Comments
```typescript
// ✅ Vysvětlit PROČ, ne CO
// Použít in-memory cache pro rychlé načítání
let servicesCache: Service[] | null = null

// ❌ Zbytečný comment
let name = 'John'  // Set name to John
```

### TODO/FIXME
```typescript
// TODO: Implementovat pagination
// FIXME: Race condition při souběžném načítání
// NOTE: Toto je dočasné řešení, v budoucnu použít DB
// HACK: Workaround pro Safari bug
```

---

## Biome Linting Rules

`biome.json` konfigurace:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "warn",
        "noArrayIndexKey": "warn"
      },
      "style": {
        "useConst": "error",
        "noUnusedTemplateLiteral": "warn"
      },
      "correctness": {
        "noUnusedVariables": "warn",
        "useExhaustiveDependencies": "warn"
      },
      "a11y": {
        "useKeyWithClickEvents": "warn",
        "useAltText": "error"
      }
    }
  },
  "formatter": {
    "indentWidth": 2,
    "lineWidth": 120,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "trailingCommas": "es5",
      "semicolons": "asNeeded",
      "arrowParentheses": "always"
    }
  }
}
```

**Důležitá pravidla:**
- `noExplicitAny`: Varování při `any`
- `useConst`: Error pokud `let` může být `const`
- `noUnusedVariables`: Warn na unused vars
- `useAltText`: Error pokud img bez alt

---

## Code Patterns

### HOCs vs Hooks
```tsx
// ❌ Vyhýbat se HOCs (legacy pattern)
const withAuth = (Component) => (props) => {
  // Auth logic
  return <Component {...props} />
}

// ✅ Preferovat hooks
const useAuth = () => {
  const [user, setUser] = useState(null)
  // Auth logic
  return { user }
}

function MyComponent() {
  const { user } = useAuth()
}
```

### Props Spread
```tsx
// ✅ Explicit props (preferováno)
<Button variant="outline" size="lg" onClick={handleClick} />

// ✅ Spread OK pro wrapper komponenty
function MyButton(props: ButtonProps) {
  return <Button {...props} className={cn('my-class', props.className)} />
}

// ❌ Zbytečný spread
<Button {...{ variant: 'outline' }} />  // Just use variant="outline"
```

### Error Handling
```typescript
// ✅ Try-catch s specific errors
try {
  await fetchData()
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network error
  } else {
    console.error('Unexpected error:', error)
  }
}

// ✅ Error boundaries (React)
<ErrorBoundary fallback={<ErrorUI />}>
  <MyComponent />
</ErrorBoundary>

// ✅ API error handling
const response = await fetch('/api/data')
if (!response.ok) {
  throw new Error(`API error: ${response.status}`)
}
```

### Conditional Rendering
```tsx
// ✅ && operator (když false = nic)
{isLoggedIn && <UserMenu />}

// ✅ Ternary (když false = něco jiného)
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// ✅ Early return
if (!data) return <Loading />
return <Content data={data} />

// ❌ Složitý nested ternary
{a ? (b ? c : d) : (e ? f : g)}  // NO - Use if/else nebo komponenty
```

---

## Best Practices Checklist

### Before Committing
- [ ] `bun run check` (lint + format)
- [ ] No TypeScript errors (`bun run type-check`)
- [ ] Remove console.logs (nebo use `console.debug`)
- [ ] Remove commented code
- [ ] Check TODOs jsou relevantní

### Component Checklist
- [ ] Props interface definována
- [ ] TypeScript types (ne `any`)
- [ ] Accessibility (alt texts, aria labels)
- [ ] Error states handled
- [ ] Loading states handled
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] GSAP cleanup (`ctx.revert()`)

### Performance Checklist
- [ ] Heavy components lazy loaded
- [ ] Images optimized (Next.js Image)
- [ ] Memoize expensive computations
- [ ] Avoid unnecessary re-renders
- [ ] Check bundle size (Vercel Analytics)

---

## Quick Commands

```bash
# Linting
bun run lint              # Check only
bun run lint:fix          # Fix auto-fixable

# Formatting
bun run format            # Format code
bun run format:check      # Check formatting

# All-in-one
bun run check             # Lint + format + fix

# CI
bun run check:ci          # CI mode (no write)
```

---

## Závěr

**Klíčové principy:**
1. Type safety (TypeScript strict mode)
2. Functional components (ne class)
3. Server Components first (Client kde nutné)
4. Explicit over implicit
5. Biome auto-formatting

**Související dokumentace:**
- [Architecture Overview](/docs/02-architecture/overview.md)
- [Component Catalog](/docs/06-components/component-catalog.md)
