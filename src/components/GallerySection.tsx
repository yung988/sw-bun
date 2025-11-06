'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLayoutEffect, useMemo, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type GalleryImage = { src: string; alt: string }

export type GallerySectionProps = {
  images?: {
    hero: GalleryImage
    layer1: GalleryImage[] // 6 obrázků
    layer2: GalleryImage[] // 6 obrázků
    layer3: GalleryImage[] // 2 obrázky
  } | null
  // Backward‑compat: původní prop používaný na homepage
  initialImages?: Array<GalleryImage & { category?: string }>
}

export default function GallerySection({ images, initialImages }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const scalerWrapRef = useRef<HTMLDivElement>(null)

  // Normalize vstupu: pokud nedorazí `images`, slož vrstvy z `initialImages`
  const normalized = useMemo(() => {
    if (images?.hero && images.layer1 && images.layer2 && images.layer3) return images
    const arr = initialImages ?? []
    const hero = arr[0] ?? { src: '/images/salon/recepce.jpg', alt: 'Galerie' }
    const rest = arr.slice(1)
    const layer1 = rest.slice(0, 6)
    const layer2 = rest.slice(6, 12)
    const layer3 = rest.slice(12, 14)
    return { hero, layer1, layer2, layer3 }
  }, [images, initialImages])

  useLayoutEffect(() => {
    if (!sectionRef.current || !scalerWrapRef.current) return

    const ctx = gsap.context(() => {
      // Scaler animace - zvětšuje se z fullscreen na normální velikost
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top -10%',
            end: 'bottom 80%',
            scrub: true,
          },
        })
        .from(
          scalerWrapRef.current,
          {
            width: () => (typeof window !== 'undefined' ? Math.max(320, window.innerWidth - 64) : 1000),
            ease: 'power2.out',
          },
          0
        )
        .from(
          scalerWrapRef.current,
          {
            height: () => (typeof window !== 'undefined' ? Math.max(400, window.innerHeight - 64) : 700),
            ease: 'power1.out',
          },
          0
        )

      // Layers animace - fade in + scale
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top -40%',
            end: 'bottom bottom',
            scrub: true,
          },
        })
        // Layer 1
        .from('.gallery-layer-1', { opacity: 0, ease: 'sine.out' }, 0)
        .from('.gallery-layer-1', { scale: 0, ease: 'power1.out' }, 0)
        // Layer 2
        .from('.gallery-layer-2', { opacity: 0, ease: 'sine.out' }, 0)
        .from('.gallery-layer-2', { scale: 0, ease: 'power3.out' }, 0)
        // Layer 3
        .from('.gallery-layer-3', { opacity: 0, ease: 'sine.out' }, 0)
        .from('.gallery-layer-3', { scale: 0, ease: 'power4.out' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-white">
      {/* Scroll efekt sekce */}
      <section ref={sectionRef} className="relative min-h-[240vh]">
        {/* Sticky container */}
        <div className="sticky top-0 flex min-h-screen w-screen items-center overflow-hidden">
          {/* Grid container */}
          <div className="gallery-grid absolute left-1/2 top-1/2 mx-auto grid w-full max-w-[1600px] -translate-x-1/2 -translate-y-1/2 grid-cols-5 grid-rows-3 gap-[clamp(10px,7.35vw,80px)] px-8 md:px-16">
            {/* Layer 1 - vnější sloupce (1 a 5) */}
            <div className="gallery-layer-1 col-span-5 col-start-1 row-span-3 row-start-1 grid grid-cols-subgrid grid-rows-subgrid">
              {(normalized.layer1 ?? []).map((img, i) => (
                <div
                  key={img.src || `l1-${i}`}
                  className={i % 2 === 0 ? 'col-start-1' : 'col-start-5'}
                  style={{
                    gridRow: Math.floor(i / 2) + 1,
                  }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="20vw" />
                  </div>
                </div>
              ))}
            </div>

            {/* Layer 2 - střední sloupce (2 a 4) */}
            <div className="gallery-layer-2 col-span-5 col-start-1 row-span-3 row-start-1 grid grid-cols-subgrid grid-rows-subgrid">
              {(normalized.layer2 ?? []).map((img, i) => (
                <div
                  key={img.src || `l2-${i}`}
                  className={i % 2 === 0 ? 'col-start-2' : 'col-start-4'}
                  style={{
                    gridRow: Math.floor(i / 2) + 1,
                  }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="20vw" />
                  </div>
                </div>
              ))}
            </div>

            {/* Layer 3 - centrální sloupec (3) */}
            <div className="gallery-layer-3 col-span-5 col-start-1 row-span-3 row-start-1 grid grid-cols-subgrid grid-rows-subgrid">
              {(normalized.layer3 ?? []).map((img, i) => (
                <div
                  key={img.src || `l3-${i}`}
                  className="col-start-3"
                  style={{
                    gridRow: i === 0 ? 1 : 3,
                  }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="20vw" />
                  </div>
                </div>
              ))}
            </div>

            {/* Scaler - hlavní obrázek uprostřed */}
            <div className="col-span-5 col-start-1 row-span-3 row-start-1 grid grid-cols-subgrid grid-rows-subgrid">
              <div className="relative z-10 col-start-3 row-start-2">
                <div ref={scalerWrapRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={normalized.hero.src}
                    alt={normalized.hero.alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fin. sekce */}
      <section className="flex min-h-screen items-center justify-center bg-white">
        <h2 className="text-[clamp(3rem,12vw,8rem)] font-light text-slate-900">fin.</h2>
      </section>
    </div>
  )
}
