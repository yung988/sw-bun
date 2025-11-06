'use client'

import { gsap } from '@/lib/gsap'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'

type CategoryMosaicProps = {
  images: string[]
  title: string
}

export default function CategoryMosaic({ images, title }: CategoryMosaicProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedImage(null)
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  useLayoutEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.mosaic-item')
    gsap.from(items, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
    })
  }, [])

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Galerie <span className="font-serif italic">{title}</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Podívejte se na detailní fotografie z našeho salonu</p>
        </div>

        {/* Mosaic Grid - Bento Style */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((image, index) => {
            // Create interesting bento layout
            const isLarge = index === 0 || index === 3 || index === 6
            const isTall = index === 1 || index === 5
            const isWide = index === 2 || index === 4

            let gridClass = ''
            if (isLarge) {
              gridClass = 'md:col-span-2 md:row-span-2'
            } else if (isTall) {
              gridClass = 'md:row-span-2'
            } else if (isWide) {
              gridClass = 'md:col-span-2'
            }

            return (
              <button
                key={image}
                type="button"
                className={`mosaic-item relative overflow-hidden rounded-2xl bg-slate-100 cursor-pointer group ${gridClass}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white text-sm font-medium">Zobrazit detail</span>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index + 1}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={handleKeyDown}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
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
            <ChevronLeft size={28} />
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
            <ChevronRight size={28} />
          </button>

          {/* Image */}
          <div
            ref={panelRef}
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage !== null ? images[selectedImage] : ''}
              alt={selectedImage !== null ? `${title} - ${selectedImage + 1}` : ''}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Image Counter */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-center text-lg text-white font-light">{title}</p>
              <p className="text-center text-sm text-white/70 mt-1">
                {selectedImage !== null ? selectedImage + 1 : 0} / {images.length}
              </p>
            </div>
          </div>

          {/* Keyboard Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
              <span>Navigace</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd>
              <span>Zavřít</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
