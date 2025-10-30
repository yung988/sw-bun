# Detailní Analýza Loading Screen Animace

## Přehled Loading Screen

Loading screen je intro animace, která se spustí při prvním načtení aplikace. Vytváří dramatický první dojem a koordinuje se s dalšími animacemi přes `IntroProvider` context.

**Technické detaily:**
- **Soubor**: `src/components/LoadingScreen.tsx`
- **Trvání**: ~3-4 sekundy
- **Technologie**: GSAP timeline s CustomEase
- **Koordinace**: Nastavuje `introComplete` context pro spuštění dalších animací

---

## Struktura Loading Screen

### HTML Struktura

```tsx
<div className="loader fixed inset-0 z-[9999] overflow-hidden bg-neutral-900 text-white">
  {/* Overlay s animovanými bloky */}
  <div className="overlay absolute inset-0 flex">
    <div className="block flex-1 bg-neutral-900" />
    <div className="block flex-1 bg-neutral-900" />
  </div>

  {/* Animované logo */}
  <div className="intro-logo absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
    <div className="word relative -left-2 overflow-hidden pr-1">
      <div className="logo-fragment logo-fragment--left translate-y-full">
        <img src="/logo.svg" className="h-[110px] w-auto md:h-[150px] lg:h-[180px] object-contain [clip-path:inset(0_50%_0_0)]" />
      </div>
    </div>
    <div className="word overflow-hidden">
      <div className="logo-fragment logo-fragment--right -translate-y-full">
        <img src="/logo.svg" className="h-[110px] w-auto md:h-[150px] lg:h-[180px] object-contain [clip-path:inset(0_0_0_50%)]" />
      </div>
    </div>
  </div>

  {/* Bílá dělící čára */}
  <div className="divider absolute left-1/2 top-0 h-full w-px bg-white" />

  {/* Spinner */}
  <div className="spinner-container absolute bottom-[10%] left-1/2 -translate-x-1/2">
    <div className="spinner h-12 w-12 rounded-full border border-white border-t-white/20" />
  </div>

  {/* Animované počítadlo */}
  <div className="counter pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
    {COUNTS.map((sequence, sequenceIndex) => (
      <div key={`${sequence}-${sequenceIndex}`} className="count absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
        {sequence.split("").map((digit, digitIndex) => (
          <div key={`${sequence}-${digit}-${digitIndex}`} className="digit overflow-hidden pt-4">
            <h1 className="translate-y-full text-[9rem] font-serif font-light text-white md:text-[13rem] lg:text-[15rem]">
              {digit}
            </h1>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>
```

---

## Animace Timeline Breakdown

### 1. Inicializace GSAP

```tsx
// Registrace CustomEase pluginu
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

// Vytvoření timeline s custom easing
const tl = gsap.timeline({
  delay: 0.2,
  defaults: { ease: "hop" },
  onComplete: () => {
    setIntroComplete(true);  // Spustí další animace
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      pointerEvents: "none",
      onComplete: () => setIsVisible(false),
    });
  },
});
```

### 2. Počítadlo Animace

```tsx
const COUNTS = ["00", "27", "65", "98", "99"];

counts.forEach((count, index) => {
  const digits = count.querySelectorAll(".digit h1");

  // Animace číslic dolů (z -100% na 0%)
  tl.to(digits, {
    y: "0%",
    duration: 1,
    stagger: 0.075,  // Každá číslice se animuje s odstupem 75ms
  }, index);

  // Pokud není poslední číslo, animuj zpět nahoru
  if (index < counts.length - 1) {
    tl.to(digits, {
      y: "-100%",
      duration: 1,
      stagger: 0.075,
    }, index + 1);
  }
});
```

**Jak to funguje:**
- Každé číslo ("00", "27", atd.) má svůj vlastní `<div class="count">`
- Uvnitř jsou jednotlivé číslice v `<div class="digit">` s `<h1>` posunutým na `translate-y-full` (100%)
- GSAP animuje `y: "0%"` pro zobrazení číslice
- `stagger: 0.075` znamená, že první číslice se animuje okamžitě, druhá po 75ms, třetí po 150ms atd.

### 3. Spinner Fade Out

```tsx
tl.to(".spinner", {
  opacity: 0,
  duration: 0.3
});
```

### 4. Logo Split Animation

```tsx
// Logo je rozděleno na levou a pravou část pomocí clip-path
// Levá část: [clip-path:inset(0_50%_0_0)] - zobrazuje levou polovinu
// Pravá část: [clip-path:inset(0_0_0_50%)] - zobrazuje pravou polovinu

tl.to(".logo-fragment", {
  y: "0%",
  duration: 1
}, "<");  // "<" znamená současně s předchozí animací
```

**Jak to funguje:**
- Logo je jedna SVG, ale pomocí `clip-path` se zobrazuje jen polovina
- Levá část začíná na `translate-y-full` (100% dolů)
- Pravá část začíná na `-translate-y-full` (-100% nahoru)
- Animace je synchronizovaná - obě části se posouvají k sobě

### 5. Divider Scale Animation

```tsx
tl.to(".divider", {
  scaleY: 1,
  duration: 1,
  transformOrigin: "center top",
  onComplete: () => {
    gsap.to(".divider", {
      opacity: 0,
      duration: 0.4,
      delay: 0.3
    });
  },
});
```

**Jak to funguje:**
- Divider začíná na `scaleY(0)` (neviditelný)
- Animuje se na `scaleY(1)` s `transformOrigin: "center top"`
- Po dokončení fade out s delay 0.3s

### 6. Logo Fragments Exit

```tsx
tl.to(".logo-fragment--left", {
  y: "100%",
  duration: 1,
  delay: 0.3
});

tl.to(".logo-fragment--right", {
  y: "-100%",
  duration: 1
}, "<");  // Současně s levou částí
```

### 7. Block Reveal Animation

```tsx
tl.to(".block", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  duration: 1,
  stagger: 0.12,  // Každý blok s odstupem 120ms
  delay: 0.75,
});
```

**Jak to funguje:**
- Jsou dva bloky (levý a pravý) s `clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"` (pokrývají celou plochu)
- Animace mění clip-path na `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)` - zmenšuje výšku na 0
- `stagger: 0.12` znamená první blok se animuje okamžitě, druhý po 120ms

---

## Context Koordinace

### IntroProvider Context

```tsx
// src/components/IntroProvider.tsx
const IntroContext = createContext<[boolean, (complete: boolean) => void]>([false, () => {}]);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  return (
    <IntroContext.Provider value={[introComplete, setIntroComplete]}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroCompleteContext() {
  return useContext(IntroContext);
}
```

### Použití v LoadingScreen

```tsx
const [, setIntroComplete] = useIntroCompleteContext();

tl.onComplete = () => {
  setIntroComplete(true);  // Signal pro další komponenty
  // Fade out loading screen
  gsap.to(containerRef.current, {
    opacity: 0,
    duration: 0.5,
    pointerEvents: "none",
    onComplete: () => setIsVisible(false),
  });
};
```

### Jak to koordinuje s dalšími animacemi

```tsx
// Příklad v Hero komponentě
const [introComplete] = useIntroCompleteContext();

useEffect(() => {
  if (!introComplete) return;  // Čeká na dokončení loading

  // Spustí hero animace
  gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1 });
}, [introComplete]);
```

---

## Performance Optimalizace

### GSAP Context Cleanup

```tsx
const ctx = gsap.context(() => {
  // Všechny animace zde
}, containerRef);

return () => {
  ctx.revert();  // Vyčistí všechny animace při unmount
};
```

### Reduced Motion Support

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  setIntroComplete(true);  // Přeskočí animace
  setIsVisible(false);
  return;
}
```

---

## Timing Breakdown

```
0.0s  - Timeline start (delay 0.2s)
0.2s  - "00" counter animation start
1.2s  - "00" complete, "27" start
2.2s  - "27" complete, "65" start
3.2s  - "65" complete, "98" start
4.2s  - "98" complete, "99" start
5.2s  - "99" complete, spinner fade out
5.5s  - Logo fragments animate to center
6.5s  - Divider scale animation
7.5s  - Logo fragments exit, blocks reveal start
8.25s - Second block reveal complete
8.75s - Loading screen fade out start
9.25s - Loading screen hidden, introComplete = true
```

---

## Debug a Development

### Console Logging pro Debug

```tsx
tl.add(() => console.log("Counter 00 started"));
tl.to(digits, { ... }, "counter-00");
tl.add(() => console.log("Counter 00 complete"), "counter-00+=1");
```

### DevTools Integration

GSAP DevTools lze připojit pro detailní debugging:

```tsx
import { GSDevTools } from "gsap/GSDevTools";

if (process.env.NODE_ENV === "development") {
  GSDevTools.create({ animation: tl });
}
```

---

## Responsive Behavior

### Breakpoint-specific velikosti

```tsx
// Logo velikosti
className="h-[110px] w-auto md:h-[150px] lg:h-[180px]"

// Text velikosti
className="text-[9rem] font-serif font-light text-white md:text-[13rem] lg:text-[15rem]"
```

### Mobile Optimalizace

- Menší velikosti pro mobil
- Stejné timing, ale škálované rozměry
- Touch-friendly velikosti

---

## Troubleshooting

### Běžné Problémy

1. **Animace se nespustí**
   - Zkontroluj `typeof window !== "undefined"` checks
   - Ověř GSAP plugin registraci

2. **Performance issues**
   - Příliš mnoho animací najednou
   - Nekonečné loops v timeline

3. **Context synchronization**
   - `introComplete` se nenastaví správně
   - Race conditions mezi komponentami

### Performance Metrics

- **Bundle size impact**: GSAP + CustomEase ~50KB gzipped
- **Runtime performance**: GPU-accelerated transforms
- **Memory usage**: GSAP contexts se správně čistí

Tato loading screen vytváří profesionální, dramatický první dojem při zachování vysoké performance a accessibility.