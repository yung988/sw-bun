# Detailní Analýza Animací v SW Beauty Aplikaci

## Přehled Systému Animací

SW Beauty aplikace používá komplexní animační systém postavený na **GSAP (GreenSock Animation Platform)** s integrací **Lenis** pro smooth scrolling. Animace jsou navrženy pro postupné odhalování obsahu během scroll a vytváření plynulé uživatelské zkušenosti.

### Klíčové Technologie
- **GSAP 3.13.0**: Hlavní animační knihovna
- **Lenis 1.3.11**: Smooth scrolling systém
- **ScrollTrigger**: GSAP plugin pro scroll-driven animace
- **CustomEase**: Vlastní easing funkce
- **React Context**: Koordinace animací přes `IntroProvider`

---

## 1. Loading Screen Animation (`LoadingScreen.tsx`)

### Popis Funkce
Intro animace při prvním načtení stránky, která vytváří dramatický první dojem. Animace trvá ~3-4 sekundy a koordinuje se s dalšími animacemi přes `IntroProvider` context.

### Klíčové Prvky Animace

#### Počítadlo (Counter)
```typescript
const COUNTS = ["00", "27", "65", "98", "99"];

counts.forEach((count, index) => {
  const digits = count.querySelectorAll(".digit h1");
  tl.to(digits, {
    y: "0%",           // Posun z -100% na 0%
    duration: 1,
    stagger: 0.075,    // Každá číslice se animuje postupně
  }, index);
});
```

#### Logo Split Animation
```typescript
// Logo je rozděleno na "S" a "W" pomocí clip-path
<div className="logo-fragment logo-fragment--left translate-y-full">
  <img src="/logo.svg" className="[clip-path:inset(0_50%_0_0)]" />
</div>
<div className="logo-fragment logo-fragment--right -translate-y-full">
  <img src="/logo.svg" className="[clip-path:inset(0_0_0_50%)]" />
</div>

// Animace
tl.to(".logo-fragment--left", { y: "100%", duration: 1 });
tl.to(".logo-fragment--right", { y: "-100%", duration: 1 }, "<");
```

#### Clip-Path Block Reveal
```typescript
// Dva černé bloky se "rozjíždějí" pryč
tl.to(".block", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  duration: 1,
  stagger: 0.12,
  delay: 0.75,
});
```

### Custom Easing
```typescript
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
```

### Koordinace s Context
```typescript
const [, setIntroComplete] = useIntroCompleteContext();
tl.onComplete = () => {
  setIntroComplete(true);  // Spustí další animace
};
```

---

## 2. Page Transitions (`PageTransition.tsx`)

### Popis Funkce
Jednoduchá přechodová animace mezi stránkami s backdrop blur efektem.

### Implementace
```typescript
useLayoutEffect(() => {
  const tl = gsap.timeline();
  tl.set(glassRef.current, { opacity: 0, backdropFilter: "blur(0px)" })
    .to(glassRef.current, {
      opacity: 1,
      backdropFilter: "blur(16px)",
      duration: 0.18,
      ease: "power2.in"
    })
    .to(glassRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.27,
      ease: "power2.inOut",
      delay: 0.11
    });

  window.scrollTo({ top: 0, behavior: "instant" });
}, [pathname]);
```

### Použití
```typescript
// V MainContent.tsx
<PageTransition>{children}</PageTransition>
```

---

## 3. Lenis Smooth Scrolling (`LenisScroll.tsx`)

### Popis Funkce
Globální smooth scrolling systém synchronizovaný s GSAP ScrollTrigger.

### Konfigurace Lenis
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});
```

### Synchronizace s GSAP
```typescript
// Lenis scroll updates ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// GSAP ticker drives Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing
gsap.ticker.lagSmoothing(0);
```

### Globální Přístup
```typescript
// Lenis instance je dostupná globálně pro animace
(window as any).lenis = lenis;
```

---

## 4. Reusable Animation Components

### FadeIn Component
```typescript
type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  stagger?: number
}

export default function FadeIn({ children, delay = 0, duration = 1, y = 30, stagger = 0, className = '' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = stagger > 0 ? element.children : [element];

    gsap.from(children, {
      opacity: 0,
      y,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, [delay, duration, y, stagger]);

  return <div ref={ref} className={className}>{children}</div>;
}
```

**Použití:**
```typescript
<FadeIn delay={0.2} y={50}>
  <h2>Nadpis sekce</h2>
</FadeIn>
```

### HorizontalScroll Component
```typescript
export default function HorizontalScroll({ children, speed = 1, className = '' }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const container = containerRef.current;
    const scroller = scrollerRef.current;

    gsap.to(scroller, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth * speed}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollerRef} className="flex w-fit">
        {children}
      </div>
    </div>
  );
}
```

### WordReveal Component
```typescript
export default function WordReveal({ children, delay = 0, stagger = 0.05, className = '' }: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const words = element.querySelectorAll('.word');

    gsap.from(words, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, [delay, stagger]);

  // Split text into words
  const words = children.split(' ');

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={index} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </div>
  );
}
```

### ImageReveal Component
```typescript
export default function ImageReveal({ children, direction = 'right', duration = 1.2, delay = 0, className = '' }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !curtainRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const curtain = curtainRef.current;
    const image = imageRef.current;

    const getClipPath = () => {
      switch (direction) {
        case 'left': return { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' };
        case 'right': return { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' };
        case 'top': return { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' };
        case 'bottom': return { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' };
        default: return { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' };
      }
    };

    const clipPath = getClipPath();

    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    .from(curtain, {
      clipPath: clipPath.from,
      duration,
      delay,
      ease: 'power3.inOut',
    })
    .from(image, {
      scale: 1.1,
      duration,
      ease: 'power2.out',
    }, '<');
  }, [direction, duration, delay]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={curtainRef} className="absolute inset-0 bg-slate-900 z-10" />
      <div ref={imageRef} className="w-full h-full">{children}</div>
    </div>
  );
}
```

### ScrollReveal Component
```typescript
export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 1, className = '', triggerOnce = true }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const getAnimationProps = () => {
      switch (direction) {
        case 'up': return { y: 80, opacity: 0 };
        case 'down': return { y: -80, opacity: 0 };
        case 'left': return { x: 80, opacity: 0 };
        case 'right': return { x: -80, opacity: 0 };
        case 'scale': return { scale: 0.8, opacity: 0 };
        case 'rotate': return { rotateX: -45, rotateY: 15, opacity: 0, transformPerspective: 1000 };
        default: return { y: 80, opacity: 0 };
      }
    };

    gsap.from(element, {
      ...getAnimationProps(),
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
      },
    });
  }, [direction, delay, duration, triggerOnce]);

  return <div ref={ref} className={className}>{children}</div>;
}
```

### NumberCounter Component
```typescript
export default function NumberCounter({ number, prefix = '', suffix = '', duration = 2, className = '' }: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const counter = { value: 0 };

    gsap.to(counter, {
      value: number,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayNumber(Math.round(counter.value));
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, [number, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayNumber.toString().padStart(2, '0')}{suffix}
    </span>
  );
}
```

### PinSection Component
```typescript
export default function PinSection({ children, duration = 1, className = '' }: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: `+=${window.innerHeight * duration}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });
  }, [duration]);

  return <div ref={ref} className={className}>{children}</div>;
}
```

### NumberedSection Component
```typescript
export default function NumberedSection({ number, children, className = '' }: NumberedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !numberRef.current) return;

    const section = sectionRef.current;
    const numberEl = numberRef.current;

    gsap.from(numberEl, {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.to(numberEl, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div ref={numberRef} className="absolute -left-4 md:left-0 top-0 z-10">
        <span className="text-[120px] md:text-[180px] font-light text-slate-200 tabular-nums leading-none select-none">
          {number.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="relative z-20">{children}</div>
    </section>
  );
}
```

### SplitReveal Component
```typescript
export default function SplitReveal({ children, direction = 'horizontal', stagger = 0.1, className = '' }: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !leftRef.current || !rightRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none none',
      },
    });

    if (direction === 'horizontal') {
      tl.from(leftRef.current, { x: '-100%', duration: 1.2, ease: 'power4.out' })
        .from(rightRef.current, { x: '100%', duration: 1.2, ease: 'power4.out' }, '<');
    } else {
      tl.from(leftRef.current, { y: '-100%', duration: 1.2, ease: 'power4.out' })
        .from(rightRef.current, { y: '100%', duration: 1.2, ease: 'power4.out' }, '<');
    }

    const contentElement = ref.current?.querySelector('.split-content');
    if (contentElement) {
      tl.from(contentElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.6');
    }
  }, [direction, stagger]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={leftRef} className="absolute inset-0 bg-slate-900 z-10"
           style={{ clipPath: direction === 'horizontal' ? 'inset(0 50% 0 0)' : 'inset(0 0 50% 0)' }} />
      <div ref={rightRef} className="absolute inset-0 bg-slate-900 z-10"
           style={{ clipPath: direction === 'horizontal' ? 'inset(0 0 0 50%)' : 'inset(50% 0 0 0)' }} />
      <div className="split-content relative z-0">{children}</div>
    </div>
  );
}
```

---

## 5. Custom GSAP Animations

### HorizontalScrollSection (Services Desktop View)
```typescript
// Komplexní horizontální scroll s pinning
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    start: "center center",
    end: () => `+=${scrollDistance * 1.5}`,
    anticipatePin: 1,
  },
});

// Horizontální pohyb karet
tl.to(cards, {
  xPercent: -((scrollDistance / totalWidth) * 100),
  ease: "none",
});

// Clip-path reveal pro každou kartu
cardElements.forEach((card, index) => {
  gsap.fromTo(card, {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  }, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      containerAnimation: tl,  // Nested ScrollTrigger
      start: "left 80%",
      end: "left 50%",
      scrub: 1,
    },
  });

  // Zoom efekt na aktivní kartu
  gsap.to(card, {
    scale: 1.02,
    scrollTrigger: {
      trigger: card,
      containerAnimation: tl,
      start: "left 60%",
      end: "right 40%",
      scrub: 1,
    },
  });
});
```

### ImageGallery Stagger Animations
```typescript
const ctx = gsap.context(() => {
  items.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      delay: (index % columns) * 0.1,  // Stagger po sloupcích
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}, galleryRef);
```

---

## 6. Použití Animací v Komponentách

### Hero Section
```typescript
// components/Hero.tsx
import WordReveal from "@/components/animations/WordReveal";

<WordReveal delay={0.5} stagger={0.1}>
  Profesionální kosmetické služby
</WordReveal>
```

### Why Us Section
```typescript
// components/WhyUsSection.tsx
import FadeIn from '@/components/animations/FadeIn'
import ScrollReveal from '@/components/animations/ScrollReveal'

<FadeIn delay={0.2}>
  <h2>Proč si vybrat nás</h2>
</FadeIn>

<ScrollReveal direction="left" delay={0.3}>
  <div className="feature-card">...</div>
</ScrollReveal>
```

### Services Section (Desktop)
```typescript
// components/HorizontalScrollSection.tsx - custom GSAP
// Používá HorizontalScroll komponentu s vlastními animacemi
```

### Testimonials Section
```typescript
// components/TestimonialsSection.tsx
import FadeIn from '@/components/animations/FadeIn'

<FadeIn stagger={0.1}>
  {testimonials.map((testimonial, index) => (
    <TestimonialCard key={index} {...testimonial} />
  ))}
</FadeIn>
```

### FAQ Section
```typescript
// components/FAQSection.tsx
import FadeIn from '@/components/animations/FadeIn'

<FadeIn delay={0.3}>
  <FAQ faqs={faqs} />
</FadeIn>
```

### Image Gallery
```typescript
// components/ImageGallery.tsx
import { ImageReveal } from './animations'

<ImageReveal direction="right" delay={0.2}>
  <Image src={src} alt={alt} />
</ImageReveal>
```

---

## 7. Performance a Accessibility

### Reduced Motion Support
Všechny animace respektují `prefers-reduced-motion`:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Skip animations or set final state
  gsap.set(element, { opacity: 1, y: 0 });
  return;
}
```

### GSAP Context Cleanup
```typescript
const ctx = gsap.context(() => {
  // Animations here
}, ref);

return () => ctx.revert();  // Clean up on unmount
```

### ScrollTrigger Optimization
- `toggleActions: 'play none none none'` - animace se spustí jen jednou
- `scrub: 1` - smooth scrubbing pro performance
- `anticipatePin: 1` - optimalizace pinning

---

## 8. Architektura a Organizace

### Animations Folder Structure
```
src/components/animations/
├── index.ts              # Export všech komponent
├── FadeIn.tsx           # Jednoduchý fade-in
├── HorizontalScroll.tsx # Horizontální scroll wrapper
├── PinSection.tsx       # Pinning utility
├── ScrollReveal.tsx     # Obecný scroll reveal
├── WordReveal.tsx       # Text word-by-word
├── CharReveal.tsx       # Text char-by-char
├── ImageReveal.tsx      # Image curtain reveal
├── NumberCounter.tsx    # Animated counter
├── NumberedSection.tsx  # Numbered section with parallax
├── SplitReveal.tsx      # Split screen reveal
└── SmoothScrollProvider.tsx # Legacy provider
```

### Context Management
```typescript
// IntroProvider koordinuje loading s dalšími animacemi
const IntroContext = createContext<[boolean, (complete: boolean) => void]>([false, () => {}]);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  return (
    <IntroContext.Provider value={[introComplete, setIntroComplete]}>
      {children}
    </IntroContext.Provider>
  );
}
```

### GSAP Plugin Registration
```typescript
// Registrace pluginů na klientu
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}
```

---

## 9. Best Practices Implementované

1. **Performance**: GSAP contexts, ScrollTrigger optimalizace
2. **Accessibility**: Reduced motion support, semantic HTML
3. **Maintainability**: Reusable komponenty, TypeScript
4. **Browser Compatibility**: SSR-safe kód, window checks
5. **User Experience**: Smooth transitions, progressive enhancement
6. **Code Organization**: Separace concerns, clean exports

Tento animační systém vytváří bohatou, plynulou uživatelskou zkušenost při zachování vysoké performance a accessibility.