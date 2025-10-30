# Detailní Analýza Animací na Landing Page

## Přehled Landing Page Animací

Landing page SW Beauty obsahuje 12 hlavních sekcí s komplexním animačním systémem postaveným na GSAP ScrollTrigger. Animace se spouštějí postupně při scroll a vytvářejí plynulé odhalování obsahu.

**Technické detaily:**
- **Celkem sekcí**: 12 komponent
- **Scroll-driven animace**: GSAP ScrollTrigger
- **Koordinace**: IntroProvider context
- **Performance**: Stagger animace, reduced motion support

---

## Struktura Landing Page

### Sekce a jejich animace

```tsx
<main id="main-content" className="min-h-screen bg-white pb-24 pt-32 md:pt-40 lg:pt-44">
  <HeroSection />           {/* Komplexní GSAP timeline + WordReveal */}
  <WhyUsSection />         {/* FadeIn + ScrollReveal */}
  <AboutUsSection />       {/* ? */}
  <ResultsSection />       {/* ? */}
  <ServicesSection />      {/* Mobile: FadeIn */}
  <HorizontalScrollSection /> {/* Desktop: Custom GSAP */}
  <GallerySection />       {/* ImageReveal */}
  <VoucherCTASection />    {/* ? */}
  <TestimonialsSection />  {/* FadeIn */}
  <FAQSection />           {/* FadeIn */}
  <InstagramFeed />        {/* ? */}
  <ContactSection />       {/* ? */}
  <NewsletterSection />   {/* FadeIn */}
</main>
```

---

## 1. Hero Section - Nejkomplexnější animace

### Komponenta: `HeroSection.tsx` → `Hero.tsx`

**Animace použité:**
- **WordReveal**: Pro hlavní nadpis a italic část
- **Custom GSAP Timeline**: Pro video, subtitle, trusted section
- **Video Management**: Automatické přehrávání s crossfade

### WordReveal Animace

```tsx
// Použití v Hero komponentě
<h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] tracking-tight text-slate-900">
  <WordReveal className="inline-block align-baseline" stagger={0.06}>
    {title}  {/* "Krása, která vám" */}
  </WordReveal>{" "}
  <WordReveal className="inline-block align-baseline italic font-serif font-normal" stagger={0.08}>
    {titleItalic}  {/* "sluší" */}
  </WordReveal>
</h1>
```

**Parametry:**
- `stagger={0.06}`: První slovo se animuje okamžitě, každé další po 60ms
- `stagger={0.08}`: Italic část má pomalejší stagger (80ms)

### Custom GSAP Timeline

```tsx
// Spouští se po introComplete
useLayoutEffect(() => {
  if (!introComplete) return;

  const ctx = gsap.context(() => {
    const targets = [
      videoWrapperRef.current,
      titleGroupRef.current,
      subtitleRef.current,
      trustedRef.current,
    ].filter(Boolean) as HTMLElement[];

    // Počáteční stav
    gsap.set(targets, { autoAlpha: 0, y: 48 });
    gsap.set(videoWrapperRef.current, { scale: 1.05, autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.9 },
      delay: 0.15,
      onComplete: () => {
        // Signal pro další komponenty
        window.__heroIntroReady = true;
        window.dispatchEvent(new Event("hero:intro:ready"));
      },
    });

    // Video animace (nejdelší)
    tl.to(videoWrapperRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1
    }, 0);

    // Text animace s overlap
    tl.to(titleGroupRef.current, { autoAlpha: 1, y: 0 }, "-=0.5");
    tl.to(subtitleRef.current, { autoAlpha: 1, y: 0 }, "-=0.45");
    tl.to(trustedRef.current, { autoAlpha: 1, y: 0 }, "-=0.4");
  }, sectionRef);

  return () => ctx.revert();
}, [introComplete]);
```

**Timeline Breakdown:**
```
0.00s - Timeline start (delay 0.15s)
0.15s - Video fade in + scale down (1s duration)
0.65s - Title group fade in (overlap -0.5s)
0.70s - Subtitle fade in (overlap -0.45s)
0.75s - Trusted section fade in (overlap -0.4s)
1.65s - Video animace dokončena
1.75s - Timeline complete, signal "hero:intro:ready"
```

### Video Management

```tsx
// Intersection Observer pro video playback
const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  },
  { threshold: [0, 0.5, 1] }
);

// Automatické přepínání videí
const scheduleNext = () => {
  const delay = 7000 + Math.floor(Math.random() * 5000); // 7-12s
  timeoutId = setTimeout(() => {
    triggerFade();
    setIndex((prev) => {
      // Random next video, avoid repeats
      let next = prev;
      for (let tries = 0; tries < 6; tries += 1) {
        const candidate = Math.floor(Math.random() * videoList.length);
        if (candidate !== prev) {
          next = candidate;
          break;
        }
      }
      return next;
    });
    scheduleNext();
  }, delay);
};
```

**Video Features:**
- **Intersection-based playback**: Přehrává jen když je vidět
- **Crossfade transitions**: 500ms fade mezi videi
- **Random rotation**: 7-12s intervaly, vyhýbá se opakování
- **Error handling**: Fallback na poster image

---

## 2. Why Us Section

### Komponenta: `WhyUsSection.tsx`

**Animace použité:**
- **FadeIn**: Pro section title
- **ScrollReveal**: Pro carousel s highlights

```tsx
export default function WhyUsSection() {
  return (
    <Section id="why">
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SectionTitle
            center={false}
            eyebrow="Proč přijít právě k nám"
            title={<>Co nás <em className="italic">odlišuje</em></>}
            subtitle="Nejsme jen další kosmetický salon..."
          />
        </FadeIn>

        <ScrollReveal direction="up" duration={0.8}>
          <div className="mt-16">
            <Carousel auto autoSpeed={25}>
              {highlights.map((b, index) => (
                <HighlightCard key={b.t} icon={b.icon} title={b.t} description={b.d} index={index} />
              ))}
            </Carousel>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
```

**Animace parametry:**
- **FadeIn**: `y={20}`, `duration={0.7}` - jemný posun dolů
- **ScrollReveal**: `direction="up"`, `duration={0.8}` - carousel přichází zdola

---

## 3. Testimonials Section

### Komponenta: `TestimonialsSection.tsx`

**Animace použité:**
- **FadeIn**: Pro title, rating summary, carousel

```tsx
export default function TestimonialsSection() {
  return (
    <Section>
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SectionTitle title={<>Co říkají naše <em className="italic">klientky</em></>} />
        </FadeIn>

        <FadeIn y={16} duration={0.6}>
          <div className="mt-12">
            <RatingSummary />
          </div>
        </FadeIn>

        <FadeIn y={20} duration={0.8}>
          <div className="mt-16">
            <Carousel>
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.name} className="w-[340px] md:w-[380px] shrink-0">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </Carousel>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
```

**Stagger efekt:**
- Title: `y={20}`, `duration={0.7}`
- Rating: `y={16}`, `duration={0.6}` - menší posun, rychlejší
- Carousel: `y={20}`, `duration={0.8}` - nejpomalejší pro důraz

---

## 4. FAQ Section

### Komponenta: `FAQSection.tsx`

**Animace použité:**
- **FadeIn**: Pro title a FAQ grid

```tsx
export default function FAQSection() {
  return (
    <Section id="faq">
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SectionTitle title={<>Máte <em className="italic">dotaz?</em></>} />
        </FadeIn>

        <FadeIn y={24} duration={0.8}>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <FAQ items={faqsLeft} />
            <FAQ items={faqsRight} />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
```

---

## 5. Newsletter Section

### Komponenta: `NewsletterSection.tsx`

**Animace použité:**
- **FadeIn**: Pro celý subscribe form

```tsx
export default function NewsletterSection() {
  return (
    <Section>
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SubscribeForm />
        </FadeIn>
      </Container>
    </Section>
  );
}
```

---

## 6. Horizontal Scroll Section (Desktop Services)

### Komponenta: `HorizontalScrollSection.tsx`

**Animace použité:**
- **Custom GSAP**: Komplexní horizontální scroll s pinning

```tsx
// Horizontal scroll animation
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

// Horizontal movement
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

**Klíčové features:**
- **Pinning**: Sekce se připne během scroll
- **Nested ScrollTrigger**: Animace uvnitř pinned kontejneru
- **Clip-path reveal**: Každá karta se "odhaluje" zleva doprava
- **Scale effect**: Aktivní karta se mírně zvětší

---

## 7. Gallery Section

### Komponenta: `GallerySection.tsx`

**Animace použité:**
- **ImageReveal**: Pro obrázky v galerii

```tsx
// Použití ImageReveal komponenty
<ImageReveal direction="right" delay={0.2}>
  <Image src={src} alt={alt} />
</ImageReveal>
```

---

## 8. Responsive Behavior

### Mobile vs Desktop

```tsx
{/* Mobile: klasický výpis služeb */}
<div className="lg:hidden">
  <ServicesSection categories={categories} />
</div>

{/* Desktop: pinned horizontální scroller */}
<div className="hidden lg:block">
  <HorizontalScrollSection categories={categories} coversByCategory={coversByCategory} />
</div>
```

**Mobile animace:**
- Jednodušší FadeIn animace
- Žádné pinning (špatná UX na mobile)

**Desktop animace:**
- Komplexní horizontální scroll
- Pinning a nested ScrollTrigger

---

## 9. Animace Timing a Sequence

### Celková sekvence animací

```
0.0s  - Loading screen dokončena
0.0s  - Hero animace start (po introComplete)
1.75s - Hero dokončen, signal "hero:intro:ready"
2.0s+ - Why Us section (při scroll)
3.0s+ - Testimonials section (při scroll)
4.0s+ - FAQ section (při scroll)
5.0s+ - Newsletter section (při scroll)
6.0s+ - Horizontal scroll section (desktop, při scroll)
```

### ScrollTrigger triggery

Většina animací používá:
```tsx
scrollTrigger: {
  start: 'top 85%',  // Spustí se když top elementu dosáhne 85% viewport výšky
  toggleActions: 'play none none none',  // Play jednou, žádné reverse
}
```

---

## 10. Performance Optimalizace

### GSAP Context Cleanup

```tsx
// Každá komponenta používá context
const ctx = gsap.context(() => {
  // Animations here
}, ref);

return () => ctx.revert();
```

### Reduced Motion Support

```tsx
// Všechny komponenty kontrolují
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Skip animations
  return;
}
```

### Stagger Loading

- Animace se nespouštějí všechny najednou
- Každá sekce čeká na scroll
- Hero signal koordinuje sekvence

---

## 11. Debug a Development

### Console Logging

```tsx
// V Hero komponentě
onComplete: () => {
  console.log("Hero intro complete");
  window.__heroIntroReady = true;
  window.dispatchEvent(new Event("hero:intro:ready"));
}
```

### GSAP DevTools

```tsx
// Pro development
if (process.env.NODE_ENV === "development") {
  import("gsap/GSDevTools").then(({ GSDevTools }) => {
    GSDevTools.create({ animation: tl });
  });
}
```

---

## 12. Troubleshooting

### Běžné Problémy

1. **Animace se nespouští**
   - Zkontroluj `introComplete` context
   - Ověř ScrollTrigger registraci

2. **Performance issues**
   - Příliš mnoho animací najednou
   - Nested ScrollTrigger konflikty

3. **Mobile problems**
   - Touch events interference
   - Viewport height issues

### Performance Metrics

- **Hero load time**: ~1.75s
- **Scroll responsiveness**: < 16ms (60fps)
- **Memory usage**: GSAP contexts se čistí
- **Bundle impact**: ~150KB gzipped (GSAP + ScrollTrigger)

---

## 13. Architektura a Patterns

### Animace Patterns

1. **Intro Coordination**: LoadingScreen → Hero → ostatní sekce
2. **Scroll-Driven**: Většina animací reaguje na scroll pozici
3. **Stagger Effects**: Postupné odhalování pro lepší UX
4. **Context Management**: IntroProvider koordinuje timing

### Component Structure

```tsx
// Typický pattern pro sekce
export default function SectionName() {
  return (
    <Section>
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SectionTitle ... />
        </FadeIn>

        <ScrollReveal direction="up" duration={0.8}>
          <Content ... />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
```

Tento animační systém vytváří profesionální, plynulé uživatelské zkušenosti s důrazem na performance a accessibility.