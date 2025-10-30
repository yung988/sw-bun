'use client'

import { Flip, gsap, ScrollTrigger } from '@/lib/gsap'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'

type GalleryImage = { src: string; alt: string; category: string }
export type GallerySectionProps = { initialImages: GalleryImage[] }

const categories = [
  { id: 'all', label: 'Vše' },
  { id: 'kosmetika', label: 'Kosmetika' },
  { id: 'salon', label: 'Salon' },
  { id: 'hifu', label: 'HIFU' },
  { id: 'ems', label: 'EMS' },
  { id: 'detail', label: 'Detaily' },
]

export default function GallerySection({ initialImages }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const gridRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)

  const filteredImages = useMemo(
    () => (selectedCategory === 'all' ? initialImages : initialImages.filter((i) => i.category === selectedCategory)),
    [initialImages, selectedCategory]
  )

  // GSAP intro (pin + scaler + layers)
  useLayoutEffect(() => {
    if (!introRef.current) return
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: true,
          pin: true,
        },
      })

      tl.fromTo('.gallery-scaler', { scale: 1.12, borderRadius: '2rem' }, { scale: 1, borderRadius: '1.25rem' }, 0)
        .fromTo(
          '.gallery-layer.is-1 .card',
          { y: 80, autoAlpha: 0, scale: 0.9 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1 },
          0.05
        )
        .fromTo(
          '.gallery-layer.is-2 .card',
          { y: 120, autoAlpha: 0, scale: 0.9 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12 },
          0.18
        )
    }, introRef)
    return () => ctx.revert()
  }, [])

  // FLIP reflow – spouštěj i při změně filtru
  useLayoutEffect(() => {
    if (!gridRef.current) return
    const state = Flip.getState(gridRef.current.querySelectorAll('.gallery-item'))
    requestAnimationFrame(() => {
      Flip.from(state, { duration: 0.45, ease: 'power2.out', nested: true, absolute: true })
    })
  }, [filteredImages.length, selectedCategory])

  // Lightbox open/close
  useLayoutEffect(() => {
    if (!overlayRef.current || !panelRef.current) return
    if (selectedImage !== null) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      gsap.set(overlayRef.current, { opacity: 0, display: 'flex' })
      gsap.set(panelRef.current, { opacity: 0, scale: 0.96 })
      tl.to(overlayRef.current, { opacity: 1, duration: 0.2 }, 0)
      tl.to(panelRef.current, { opacity: 1, scale: 1, duration: 0.3 }, 0.05)
    } else {
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      tl.to(panelRef.current, { opacity: 0, scale: 0.96, duration: 0.2 }, 0)
      tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0).add(() => {
        if (overlayRef.current) overlayRef.current.style.display = 'none'
      })
    }
  }, [selectedImage])

  const hero = initialImages[0] ?? { src: '/images/salon/recepce.jpg', alt: 'Salon', category: 'salon' }
  const layerA = initialImages.slice(1, 5)
  const layerB = initialImages.slice(5, 9)

  const handlePrevious = () => {
    if (selectedImage !== null) setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)
  }
  const handleNext = () => {
    if (selectedImage !== null) setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)
  }

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50">
      {/* Intro: scaler + vrstvy (GSAP pin) */}
      <div ref={introRef} className="relative min-h-[160vh]">
        <div className="sticky top-0 h-screen">
          <div className="mx-auto h-full w-full max-w-7xl px-6 grid items-center">
            <div className="relative">
              {/* Scaler */}
              <div className="gallery-scaler relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl will-change-transform border border-slate-200/50">
                <Image src={hero.src} alt={hero.alt} fill className="object-cover" sizes="100vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Layer 1 */}
              <div className="gallery-layer is-1 pointer-events-none absolute inset-0 grid grid-cols-12 gap-6">
                {layerA.map((img, i) => (
                  <div
                    key={`la-${i}`}
                    className={`card col-span-3 md:col-span-2 ${i % 2 ? 'self-end col-start-9' : 'self-start col-start-2'}`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-xl">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Layer 2 */}
              <div className="gallery-layer is-2 pointer-events-none absolute inset-0 grid grid-cols-12 gap-6">
                {layerB.map((img, i) => (
                  <div
                    key={`lb-${i}`}
                    className={`card col-span-4 md:col-span-3 ${i % 2 ? 'self-start col-start-8' : 'self-end col-start-1'}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 lg:pt-28">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-slate-300" />
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500">Galerie</span>
            <div className="h-px w-12 bg-slate-300" />
          </div>
          <h2 className="mb-4 text-4xl font-light text-slate-900 md:text-5xl lg:text-6xl">
            Naše <span className="font-serif italic">práce</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Podívejte se na náš salon, procedury a výsledky péče o naše klientky
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid (FLIP) */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="gallery-item group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-slate-100"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium text-white">{image.alt}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-500">Žádné fotografie v této kategorii</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal (beze změn, jen drobné animace) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 hidden items-center justify-center bg-black/95 p-4"
        onClick={() => setSelectedImage(null)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setSelectedImage(null)
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedImage(null)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Zavřít"
        >
          <X size={24} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Předchozí"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Další"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={panelRef}
          className="relative h-[80vh] w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {selectedImage !== null && (
            <Image
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-center text-lg text-white">
              {selectedImage !== null ? filteredImages[selectedImage].alt : ''}
            </p>
            <p className="text-center text-sm text-white/70">
              {selectedImage !== null ? selectedImage + 1 : 0} / {filteredImages.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
