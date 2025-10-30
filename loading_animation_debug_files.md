# Soubory potřebné pro diagnostiku Loading Screen animací

## 📁 Core Loading Animation Files

### 1. **LoadingScreen.tsx** - Hlavní komponenta
```bash
src/components/LoadingScreen.tsx
```
- Kompletní GSAP timeline s CustomEase
- Context koordinace s IntroProvider
- Všechny animace (počítadlo, logo, blocks)

### 2. **IntroProvider.tsx** - Context management
```bash
src/components/IntroProvider.tsx
```
- `introComplete` state management
- Koordinace mezi loading a dalšími animacemi
- Context provider pro celou aplikaci

### 3. **gsap.ts** - GSAP utilities
```bash
src/lib/gsap.ts
```
- GSAP plugin registrace (ScrollTrigger, CustomEase, Flip)
- `prefersReducedMotion()` utility
- `createGsapContext()` helper

## 🎨 Styling & Layout Files

### 4. **layout.tsx** - App layout
```bash
src/app/layout.tsx
```
- Integrace LoadingScreen komponenty
- IntroProvider wrapper
- LenisScroll a další providers

### 5. **globals.css** - Global styles
```bash
src/app/globals.css
```
- Tailwind CSS konfigurace
- Custom theme variables
- Base styling pro animace

## 🔧 Animation Dependencies

### 6. **LenisScroll.tsx** - Smooth scrolling
```bash
src/components/LenisScroll.tsx
```
- Lenis inicializace
- GSAP synchronizace
- ScrollTrigger integration

### 7. **MainContent.tsx** - Content wrapper
```bash
src/components/MainContent.tsx
```
- PageTransition integrace
- Scroll to top logic

## 📦 Package Dependencies

### 8. **package.json** - Dependencies
```bash
package.json
```
- GSAP verze: `^3.13.0`
- Lenis verze: `^1.3.11`
- Next.js verze: `15.5.4`
- React verze: `19.1.0`

## 🛠️ Build Configuration

### 9. **next.config.ts** - Next.js config
```bash
next.config.ts
```
- Turbopack konfigurace
- Image optimization
- Build settings

### 10. **tsconfig.json** - TypeScript config
```bash
tsconfig.json
```
- TypeScript strict mode
- Path aliases (`@/*`)
- Module resolution

## 🎯 Specific Files for Loading Issues

### Pokud nefunguje **počítadlo**:
- `src/components/LoadingScreen.tsx` (řádky 39-64)
- `src/lib/gsap.ts` (CustomEase registrace)

### Pokud nefunguje **logo animace**:
- `src/components/LoadingScreen.tsx` (řádky 66-80)
- CSS clip-path v LoadingScreen

### Pokud nefunguje **context koordinace**:
- `src/components/IntroProvider.tsx`
- `src/components/LoadingScreen.tsx` (onComplete callback)
- `src/components/Hero.tsx` (introComplete usage)

### Pokud nefunguje **GSAP inicializace**:
- `src/lib/gsap.ts`
- `src/components/LoadingScreen.tsx` (import gsap)

### Pokud nefunguje **timing**:
- `src/components/LoadingScreen.tsx` (timeline delay: 0.2)
- `src/components/Hero.tsx` (timeline delay: 0.15)

## 🔍 Debug Checklist

### Console Logs to Add:
```typescript
// V LoadingScreen.tsx
tl.add(() => console.log("Loading timeline started"));
tl.add(() => console.log("Counter animation complete"), "counter-00+=1");
tl.onComplete = () => {
  console.log("Loading screen complete");
  setIntroComplete(true);
};

// V IntroProvider.tsx
console.log("IntroProvider mounted, introComplete:", introComplete);

// V Hero.tsx
useEffect(() => {
  console.log("Hero: introComplete changed to:", introComplete);
}, [introComplete]);
```

### Browser DevTools:
1. **Network tab**: Načítání GSAP a Lenis
2. **Console**: GSAP warnings/errors
3. **Performance tab**: Timeline execution
4. **Elements**: CSS clip-path aplikace

### Common Issues:
1. **GSAP not loaded**: Check network tab
2. **CustomEase not registered**: Check gsap.ts
3. **Context timing**: Check IntroProvider state
4. **CSS conflicts**: Check clip-path support
5. **Reduced motion**: Check prefers-reduced-motion

## 📋 Minimal Reproduction Files

Pro rychlou diagnostiku stačí tyto soubory:
- `src/components/LoadingScreen.tsx`
- `src/components/IntroProvider.tsx`
- `src/lib/gsap.ts`
- `src/app/layout.tsx`
- `package.json`

## 🚀 Quick Test Commands

```bash
# Check GSAP loading
npm ls gsap

# Check CustomEase
node -e "const { CustomEase } = require('gsap/CustomEase'); console.log('CustomEase loaded:', !!CustomEase);"

# Check build
npm run build
```

Tento seznam obsahuje všechny soubory potřebné k diagnostice problémů s loading animacemi.