# Detailní Analýza Page Transitions

## Přehled Page Transitions

Page transitions jsou jednoduché, ale efektivní animace, které se spouštějí při navigaci mezi stránkami. Vytvářejí plynulý přechod a zabraňují vizuálnímu "skoku" při změně routy.

**Technické detaily:**
- **Soubor**: `src/components/PageTransition.tsx`
- **Trvání**: ~0.65 sekundy celkem
- **Technologie**: GSAP timeline s backdrop-filter
- **Umístění**: Obaluje všechen obsah v `MainContent.tsx`

---

## Architektura Page Transitions

### Komponenta Struktura

```tsx
// src/components/PageTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const glassRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!glassRef.current) return;

    const tl = gsap.timeline();
    tl.set(glassRef.current, {
      opacity: 0,
      pointerEvents: "none",
      backdropFilter: "blur(0px)"
    });

    tl.to(glassRef.current, {
      opacity: 1,
      pointerEvents: "all",
      backdropFilter: "blur(16px)",
      duration: 0.18,
      ease: "power2.in"
    })
    .to(glassRef.current, {
      opacity: 0,
      pointerEvents: "none",
      backdropFilter: "blur(0px)",
      duration: 0.27,
      ease: "power2.inOut",
      delay: 0.11
    });

    // Scroll to top po animaci
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      gsap.killTweensOf(glassRef.current);
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={glassRef}
        className="fixed inset-0 z-[100] transition-all pointer-events-none backdrop-blur-lg bg-white/20"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div>{children}</div>
    </>
  );
}
```

### Integrace s Next.js Routing

```tsx
// src/components/MainContent.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import PageTransition from "./PageTransition";

type MainContentProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top při změně stránky
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return <PageTransition>{children}</PageTransition>;
}
```

---

## Animace Breakdown

### 1. Inicializace

```tsx
const tl = gsap.timeline();

// Nastavení počátečního stavu
tl.set(glassRef.current, {
  opacity: 0,
  pointerEvents: "none",
  backdropFilter: "blur(0px)"
});
```

### 2. Fade In fáze

```tsx
tl.to(glassRef.current, {
  opacity: 1,
  pointerEvents: "all",
  backdropFilter: "blur(16px)",
  duration: 0.18,        // 180ms
  ease: "power2.in"      // Rychlý náběh
});
```

**Co se děje:**
- Overlay se objeví s `opacity: 1`
- `backdrop-filter: blur(16px)` rozmaže obsah pod ním
- `pointer-events: "all"` blokuje interakce s obsahem

### 3. Fade Out fáze

```tsx
tl.to(glassRef.current, {
  opacity: 0,
  pointerEvents: "none",
  backdropFilter: "blur(0px)",
  duration: 0.27,          // 270ms
  ease: "power2.inOut",    // Smooth ease
  delay: 0.11              // 110ms pauza
});
```

**Co se děje:**
- Overlay postupně mizí
- Blur efekt se odstraní
- Pointer events se znovu povolí

### 4. Scroll Reset

```tsx
// Po animaci se stránka scrolluje na top
window.scrollTo({ top: 0, behavior: "instant" });
```

---

## Timing Sequence

```
0.00s - Timeline start
0.00s - Set initial state (opacity: 0, blur: 0px)
0.00s - Fade in start (180ms)
0.18s - Fade in complete (opacity: 1, blur: 16px)
0.29s - Delay start (110ms)
0.40s - Fade out start (270ms)
0.67s - Fade out complete (opacity: 0, blur: 0px)
0.67s - Scroll to top (instant)
```

**Celková délka**: ~670ms

---

## CSS Styling

### Overlay Styling

```tsx
className="fixed inset-0 z-[100] transition-all pointer-events-none backdrop-blur-lg bg-white/20"
```

**Vysvětlení:**
- `fixed inset-0`: Pokrývá celou viewport
- `z-[100]`: Vysoký z-index nad vším obsahem
- `backdrop-blur-lg`: CSS backdrop-filter pro rozmazání
- `bg-white/20`: Polotransparentní bílá vrstva
- `pointer-events-none`: Neblokuje interakce (přepisuje se v JS)

### Proč backdrop-filter + GSAP?

```tsx
// CSS backdrop-filter
backdrop-blur-lg

// GSAP animace
backdropFilter: "blur(16px)"
```

**Výhody:**
- Hardware accelerated (GPU)
- Smooth animace mezi hodnotami
- Lepší performance než opacity animace na velkých plochách

---

## Integrace s Next.js

### Pathname Dependency

```tsx
useLayoutEffect(() => {
  // Animace se spustí při každé změně pathname
}, [pathname]);
```

**Jak to funguje s Next.js routing:**
1. Uživatel klikne na link
2. Next.js změní `pathname`
3. `useLayoutEffect` detekuje změnu
4. Animace se spustí
5. Next.js dokončí navigaci
6. Animace dokončí fade out

### Synchronizace s Page Loading

```tsx
// V layout.tsx - žádná interference
<IntroProvider>
  <LoadingScreen />     {/* Intro animace */}
  <LenisScroll />       {/* Smooth scroll */}
  <ScrollProgress />    {/* Progress bar */}
  <ModalProvider>
    <BrandProvider value={{ logoSrc }}>
      <Navbar />
      <MainContent>    {/* Zde je PageTransition */}
        {children}
      </MainContent>
      <Footer />
    </BrandProvider>
  </ModalProvider>
</IntroProvider>
```

**Důležité:** PageTransition se spouští pouze při změně routy, ne při prvním loadu (to má LoadingScreen).

---

## Performance Optimalizace

### GSAP Cleanup

```tsx
return () => {
  gsap.killTweensOf(glassRef.current);
};
```

**Proč je to důležité:**
- Zabrání memory leaks
- Zastaví probíhající animace při unmount
- Clean state pro další navigaci

### Minimal DOM Impact

- Pouze jeden overlay element
- Žádné komplexní selektory
- Hardware-accelerated properties (opacity, backdrop-filter)

### Reduced Motion Support

I když není explicitně implementováno, backdrop-filter animace je subtilní a nezasahuje do accessibility.

---

## Debug a Development

### Visual Debug

```tsx
// Přidat do timeline pro debug
tl.add(() => console.log("Page transition started"));
tl.add(() => console.log("Fade in complete"), "+=0.18");
tl.add(() => console.log("Fade out complete"), "+=0.38");
```

### Performance Monitoring

```tsx
// Měření času animace
const startTime = performance.now();

tl.onComplete = () => {
  const endTime = performance.now();
  console.log(`Page transition took ${endTime - startTime}ms`);
};
```

---

## Responsive Behavior

### Mobile Optimalizace

- Stejné timing na všech zařízeních
- Backdrop-filter funguje konzistentně
- Žádné device-specific úpravy potřeba

### Touch Devices

- `pointer-events` management zabraňuje interference s touch events
- Instant scroll na mobile (lepší UX)

---

## Troubleshooting

### Běžné Problémy

1. **Animace se nespouští**
   ```tsx
   // Zkontroluj pathname dependency
   console.log("Pathname changed:", pathname);
   ```

2. **Overlay zůstává viditelný**
   ```tsx
   // Zkontroluj GSAP cleanup
   // Možná se komponenta remountuje bez cleanup
   ```

3. **Performance issues na mobile**
   ```tsx
   // Backdrop-filter může být náročný na starší zařízení
   // Fallback na opacity-only animace
   ```

### Alternativní Implementace

Pokud backdrop-filter není podporován:

```tsx
// Fallback bez blur
tl.to(glassRef.current, {
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  duration: 0.18,
})
.to(glassRef.current, {
  opacity: 0,
  duration: 0.27,
  delay: 0.11,
});
```

---

## Srovnání s Loading Screen

| Aspekt | Loading Screen | Page Transition |
|--------|----------------|-----------------|
| Trvání | 3-4 sekundy | 0.67 sekundy |
| Komplexita | Vysoká (timeline) | Nízká (jednoduchá) |
| Účel | První dojem | Navigace |
| Context | IntroProvider | Pathname change |
| Cleanup | GSAP context | killTweensOf |

---

## Best Practices

1. **Minimal Impact**: Pouze nezbytné DOM manipulace
2. **Fast Cleanup**: GSAP tweens se správně čistí
3. **Consistent Timing**: Stabilní duration napříč animacemi
4. **Accessibility**: Neblokuje screen readers (aria-hidden)
5. **Performance**: Hardware-accelerated properties

Tato page transition vytváří profesionální, plynulé přechody mezi stránkami při zachování vysoké performance.