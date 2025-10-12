# 🎬 Animace na webu SW Beauty

## 📐 Konzistentní spacing mezi sekcemi

Všechny sekce používají **jednotný spacing**:
- **Mobile**: `py-16` (64px)
- **Desktop**: `md:py-24` (96px)

## 🎨 Přehled animací po sekcích

### 1. **Hero Section** (Úvodní sekce)
- **Animace**: Fade-in s delay pro každý element
- **Timing**: 
  - Title: 0.2s delay
  - Subtitle: 0.4s delay
  - Trusted section: 0.6s delay
  - Video: 0.8s delay
- **Parallax**: Video se pohybuje při scrollu (-30px)
- **Spacing**: Vlastní (hero má speciální layout)

### 2. **WhyUsSection** (Proč my)
- **Animace**: 
  - Title fade-in při `start: "top 80%"`
  - Carousel fade + scale při `start: "top 85%"`
- **ScrollTrigger**: `toggleActions: 'play none none none'`
- **Spacing**: `py-16 md:py-24`

### 3. **AboutUsSection** (O nás)
- **Animace**:
  - Hero container: fade + scale
  - Hero image: scale from 1.1
  - Parallax na hero image: -50px
  - Text elements: stagger fade-in
  - Story section: fade-in
  - Stats: stagger fade-in
- **ScrollTrigger**: `start: "top 80%"` pro většinu elementů
- **Spacing**: `py-16 md:py-24` ✅ (opraveno z py-32 md:py-48)

### 4. **Gallery Section** (Galerie salonu)
- **Animace**:
  - Title + description: FadeIn wrapper
  - Gallery grid: FadeIn s `stagger: 0.15`
  - Hover efekt: scale 1.1 na obrázky
- **Spacing**: `py-16 md:py-24` ✅ (opraveno)

### 5. **ServicesSection** (Služby - carousel)
- **Animace**:
  - Title fade-in
  - Button fade-in
  - Carousel: 3D perspective efekty
- **ScrollTrigger**: `start: "top 80%"`
- **Spacing**: `py-16 md:py-24`

### 6. **HorizontalServicesSection** (Horizontální scroll služby)
- **Animace**:
  - Title fade-in při `start: "top 80%"`
  - **Horizontal scroll**: Pin section + scrub
  - Cards: stagger fade-in (delay: index * 0.1)
  - NumberCounter pro čísla (01, 02, 03...)
- **ScrollTrigger**:
  - Horizontal: `start: "top top"`, `end: "+=${scrollWidth}"`, `scrub: 1`, `pin: true`
- **Spacing**: `py-24` (speciální - full screen section)
- **Background**: `bg-slate-50` (odlišení od ostatních sekcí)

### 7. **VoucherCTASection** (Poukazy CTA)
- **Animace**:
  - Container fade + scale
  - Image scale from 1.1
  - Content fade-in
  - Button hover efekt
- **ScrollTrigger**: `start: "top 80%"`
- **Spacing**: `py-16 md:py-24`

### 8. **TestimonialsSection** (Recenze)
- **Animace**:
  - Title fade-in
  - Cards: stagger fade-in
- **ScrollTrigger**: `start: "top 80%"`
- **Spacing**: `py-16 md:py-24`

### 9. **FAQ Section**
- **Animace**:
  - ParallaxText wrapper pro title
  - ElasticScale wrapper pro FAQ items
- **Spacing**: `py-16 md:py-24`

### 10. **InstagramFeed**
- **Animace**: Vlastní (v komponentě)
- **Spacing**: Vlastní

### 11. **ContactSection** (Kontakt)
- **Animace**:
  - Title fade-in
  - Cards: stagger fade-in
  - Buttons: fade-in
- **ScrollTrigger**: `start: "top 80%"`
- **Spacing**: `py-16 md:py-24`

### 12. **Newsletter Section**
- **Animace**: SmoothReveal wrapper
- **Spacing**: `py-16 md:py-24`

## 🎯 Animační komponenty

### Čisté scroll-driven animace (nový styl):
1. **FadeIn** - Jednoduchý fade-in při scrollu
2. **WordReveal** - Text se objevuje slovo po slově
3. **CharReveal** - Text se objevuje písmeno po písmenu
4. **ImageReveal** - Curtain/wipe reveal efekt
5. **HorizontalScroll** - Horizontální scroll sekce
6. **NumberedSection** - Sekce s velkým číslem (01, 02, 03...)
7. **NumberCounter** - Animované číslo
8. **PinSection** - Připíchnutí sekce během scrollu

### Legacy animace (starý styl - 3D efekty):
- MagneticButton
- TiltCard
- LayeredParallax
- Perspective3D
- ElasticScale
- atd.

## 📊 GSAP ScrollTrigger syntax

### Start/End properties:
```javascript
scrollTrigger: {
  trigger: element,
  start: "top 80%",  // "element-position viewport-position"
  end: "bottom top",
  scrub: 1,          // Smooth scroll-tied animation
  pin: true,         // Pin element during scroll
  markers: false,    // Debug markers (set to true for debugging)
}
```

### Vysvětlení:
- **start: "top 80%"** = když TOP elementu dosáhne 80% viewportu (80% od vrchu)
- **end: "bottom top"** = když BOTTOM elementu dosáhne TOP viewportu
- **scrub: 1** = animace je svázaná se scroll pozicí (smooth)
- **pin: true** = element zůstane připíchnutý během animace

### ToggleActions (pouze když scrub: false):
```javascript
toggleActions: "play none none none"
// onEnter | onLeave | onEnterBack | onLeaveBack
```

## ✅ Checklist pro nové animace

- [ ] Použít `prefers-reduced-motion` check
- [ ] Nastavit správný `start` trigger (obvykle `"top 80%"` nebo `"top 85%"`)
- [ ] Použít `ease: 'power2.out'` pro smooth easing
- [ ] Cleanup s `ctx.revert()` v useEffect return
- [ ] Konzistentní spacing: `py-16 md:py-24`
- [ ] Testovat na mobilu i desktopu

## 🎨 Styl animací

**Filozofie**: Čisté, minimalistické, scroll-driven animace ve stylu ever.co.id
- ❌ Žádné 3D rotace
- ❌ Žádné tilt efekty
- ❌ Žádné magnetic hover
- ❌ Žádné elastic/bounce efekty
- ✅ Jednoduché fade-in/out
- ✅ Minimální parallax (jen y-axis)
- ✅ Smooth scrolling (Lenis)
- ✅ Timeline storytelling
- ✅ Numbered sections

## 🚀 Výkon

- Všechny animace respektují `prefers-reduced-motion`
- GSAP context cleanup pro prevenci memory leaks
- Optimalizované ScrollTrigger s `invalidateOnRefresh: true`
- Smooth scroll s Lenis (1.2s duration)

