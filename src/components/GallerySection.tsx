'use client'

import { Flip, gsap } from '@/lib/gsap'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type GalleryImage = {
  src: string
  alt: string
  category: string
}

// The gallery now takes its initial data via props so that the server
// can resolve only images that exist.
export type GallerySectionProps = {
  initialImages: GalleryImage[]
}

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

  const filteredImages =
    selectedCategory === 'all' ? initialImages : initialImages.filter((img) => img.category === selectedCategory)

  // Animate grid reflow with FLIP
  useLayoutEffect(() => {
    if (!gridRef.current) return
    const state = Flip.getState(gridRef.current.querySelectorAll('.gallery-item'))
    // mutate DOM implicitly by re-render
    requestAnimationFrame(() => {
      Flip.from(state, { duration: 0.4, ease: 'power2.out', nested: true, absolute: true })
    })
  }, [])

  // Lightbox open/close animation
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

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
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

        {/* Gallery Grid */}
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

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-500">Žádné fotografie v této kategorii</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 hidden items-center justify-center bg-black/95 p-4"
        onClick={() => setSelectedImage(null)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setSelectedImage(null)
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedImage(null)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Zavřít"
        >
          <X size={24} />
        </button>

        {/* Previous Button */}
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

        {/* Next Button */}
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

        {/* Image */}
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
