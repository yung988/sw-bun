# Quick Reference

> Cheat sheet pro SW Beauty - nejčastější úkoly a commands

## Setup & Installation

```bash
# Clone repository
git clone <repo-url>
cd sw-bun

# Install dependencies
bun install

# Setup environment
cp .env.example .env.local
# Edit .env.local - add RESEND_API_KEY

# Start development
bun run dev
# → http://localhost:3000
```

---

## Common Commands

### Development
```bash
bun run dev              # Start dev server (Turbopack)
bun run build            # Production build
bun run start            # Start production server
```

### Code Quality
```bash
bun run lint             # Lint code
bun run lint:fix         # Lint + autofix
bun run format           # Format code
bun run check            # Lint + format + fix (all-in-one)
bun run check:ci         # CI check (no write)
```

### Dependencies
```bash
bun add <package>        # Add dependency
bun add -D <package>     # Add dev dependency
bun remove <package>     # Remove package
bun update               # Update all packages
bun outdated             # Check outdated packages
```

### Git
```bash
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to remote
```

---

## Project Structure

```
sw-bun/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   ├── api/                # API Routes
│   │   │   ├── booking/route.ts
│   │   │   ├── contact/route.ts
│   │   │   ├── pricelist/route.ts
│   │   │   └── send-gift-card/route.ts
│   │   ├── sluzby/             # Services pages
│   │   │   ├── page.tsx
│   │   │   └── [kategorie]/
│   │   ├── cenik/              # Price list
│   │   └── kontakt/            # Contact
│   ├── components/             # React components
│   │   ├── ui/                 # UI primitives (Button, Input...)
│   │   ├── animations/         # GSAP animation components
│   │   ├── BookingModal.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── lib/                    # Utilities
│   │   ├── services.ts         # CSV parsing, service logic
│   │   ├── price.ts            # Price formatting
│   │   ├── utils.ts            # cn() utility
│   │   └── server/             # Server-only utilities
│   └── types/                  # TypeScript types
├── public/                     # Static assets
│   ├── images/                 # Images
│   ├── logo.svg
│   └── swbeauty-procedury.csv  # Services data
├── docs/                       # Documentation
├── package.json
├── bun.lock
├── next.config.ts
├── tsconfig.json
├── biome.json
└── .env.local                  # Local env vars (gitignored)
```

---

## Add New Component

### Create Component File
```tsx
// src/components/MyComponent.tsx
'use client'  // If Client Component (useState, useEffect, GSAP)

import { useState } from 'react'

type Props = {
  title: string
  onClose: () => void
}

export default function MyComponent({ title, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h2>{title}</h2>
    </div>
  )
}
```

### Use Component
```tsx
// app/page.tsx
import MyComponent from '@/components/MyComponent'

export default function Page() {
  return <MyComponent title="Hello" onClose={() => {}} />
}
```

---

## Add New Page

### Create Page File
```tsx
// app/nova-stranka/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nová Stránka | SW Beauty',
  description: 'Popis stránky',
}

export default function NovaStranka() {
  return (
    <main>
      <h1>Nová Stránka</h1>
    </main>
  )
}
```

### Add to Navigation
```tsx
// components/Navbar.tsx
const links = [
  { href: '/', label: 'Domů' },
  { href: '/sluzby', label: 'Služby' },
  { href: '/nova-stranka', label: 'Nová Stránka' },  // ✅ Add here
]
```

---

## Add New Service to CSV

### Edit CSV File
```bash
# Open CSV
open public/swbeauty-procedury.csv
# Or: code public/swbeauty-procedury.csv
```

### Add Row
```csv
Category,Subcategory,ServiceType,Name,ShortDescription,Description,Duration,Sessions,Price,Benefits,Image,Images
Kosmetika,Základní péče,single,Nová Procedura,Krátký popis,Dlouhý popis,60,1,1500,"Benefit 1,Benefit 2",kosmetika.jpg,"kosmetika-1.jpg,kosmetika-2.jpg"
```

### Test
```bash
# Restart dev server (cache refresh)
bun run dev

# Navigate to http://localhost:3000/sluzby
# New service should appear
```

---

## Common Styling Patterns

### Button
```tsx
<button className="rounded-full bg-slate-900 px-8 py-4 text-white hover:bg-slate-800 transition-all">
  Call to Action
</button>
```

### Card
```tsx
<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl transition-all">
  Content
</div>
```

### Glass Effect
```tsx
<div className="backdrop-blur-3xl bg-white/25 border border-white/40 rounded-3xl shadow-2xl">
  Glass content
</div>
```

### Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

## GSAP Animation Template

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AnimatedComponent() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from('.animate', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.animate',
          start: 'top 80%',
        },
      })
    }, ref)

    return () => ctx.revert()  // ✅ Cleanup!
  }, [])

  return (
    <div ref={ref}>
      <div className="animate">Content</div>
    </div>
  )
}
```

---

## Environment Variables

### Setup
```bash
# .env.local
RESEND_API_KEY=re_your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Use in API Route (Server)
```typescript
// app/api/booking/route.ts
const apiKey = process.env.RESEND_API_KEY  // ✅
```

### Use in Client Component
```tsx
'use client'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL  // ✅ NEXT_PUBLIC_ prefix!
```

---

## Debugging

### Development Logs
```tsx
console.log('Debug:', data)         // Simple log
console.error('Error:', error)      // Error log
console.table(array)                // Table format
```

### API Route Debugging
```typescript
// app/api/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Request:', body)  // Check terminal

    // Your code
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### Browser DevTools
```
Chrome DevTools:
- Console: Cmd+Option+J
- Network: Cmd+Option+N
- React DevTools: Extension needed
```

---

## Deployment

### Vercel (Production)
```bash
# First time
vercel login
vercel link

# Deploy
git push  # Auto-deploy on push to main

# Manual deploy
vercel --prod

# View logs
vercel logs
```

### Environment Variables (Production)
```
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: RESEND_API_KEY = re_production_key
3. Save
4. Redeploy (git push or vercel --prod)
```

---

## Keyboard Shortcuts (VS Code)

```
Cmd+P          # Quick open file
Cmd+Shift+P    # Command palette
Cmd+B          # Toggle sidebar
Cmd+`          # Toggle terminal
Cmd+Shift+F    # Search in files
Cmd+D          # Multi-cursor select
Cmd+/          # Toggle comment
Option+Shift+F # Format document
F2             # Rename symbol
```

---

## Useful Links

### Documentation
- [Component Catalog](/docs/06-components/component-catalog.md)
- [Styling Guide](/docs/03-frontend/styling-guide.md)
- [Architecture](/docs/02-architecture/overview.md)
- [Tech Stack](/docs/02-architecture/tech-stack.md)
- [Code Style](/docs/09-development/code-style.md)
- [Troubleshooting](/docs/09-development/troubleshooting.md)

### External
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Resend Dashboard](https://resend.com/emails)

---

## Troubleshooting Checklist

### App Not Starting
- [ ] `bun install` proběhlo OK?
- [ ] `.env.local` existuje a je vyplněn?
- [ ] Port 3000 volný? (`lsof -i :3000`)
- [ ] Node/Bun verze OK?

### Changes Not Showing
- [ ] Dev server běží?
- [ ] Správný soubor editujete?
- [ ] Hard refresh browser (Cmd+Shift+R)?
- [ ] Clear `.next/` cache?

### Build Failing
- [ ] TypeScript errors? (`bun run type-check`)
- [ ] Linting errors? (`bun run check`)
- [ ] Missing dependencies? (`bun install`)
- [ ] Check build logs

### Production Issues
- [ ] Env vars nastaveny ve Vercel?
- [ ] Redeploy po změně env vars?
- [ ] Check Vercel logs (`vercel logs`)
- [ ] DNS správně nakonfigurováno?

---

## Emergency Commands

### Reset Everything
```bash
# Nuclear option - reset all
rm -rf node_modules bun.lock .next
bun install
bun run dev
```

### Kill Process on Port
```bash
lsof -ti:3000 | xargs kill -9
```

### Git Undo Last Commit
```bash
git reset --soft HEAD~1  # Keep changes
git reset --hard HEAD~1  # Discard changes
```

---

## Pro Tips

1. **Use VS Code Extensions:**
   - Biome (linting)
   - Tailwind CSS IntelliSense
   - TypeScript + JavaScript

2. **Keyboard Shortcuts:**
   - Learn Cmd+P (quick file open)
   - Cmd+Shift+F (global search)
   - F2 (rename)

3. **Chrome DevTools:**
   - Network tab pro API debugging
   - React DevTools pro component tree
   - Lighthouse pro performance

4. **Git Best Practices:**
   - Commit často, malé commits
   - Descriptive commit messages
   - Pull before push

5. **Performance:**
   - Lazy load heavy components
   - Optimize images (Next.js Image)
   - Check bundle size (Vercel Analytics)

---

## Quick Snippets

### API Route Template
```typescript
// app/api/my-route/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Your logic

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### Form with React Hook Form + Zod
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

type FormData = z.infer<typeof schema>

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## Závěr

Tento quick reference pokrývá 80% daily tasks. Pro detaily viz plná dokumentace v `/docs/`.

**Happy coding!** 🚀
