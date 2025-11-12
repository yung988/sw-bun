'use client'

import Image from 'next/image'

type GalleryImage = {
  src: string
  alt: string
}

type ScrollableImageGalleryProps = {
  images: GalleryImage[]
  className?: string
}

/**
 * Vertically scrollable image gallery with dense layout
 * Images are displayed in a single column with minimal gaps
 */
export default function ScrollableImageGallery({ images, className = '' }: ScrollableImageGalleryProps) {

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full rounded-2xl border border-slate-200 bg-slate-50 ${className}`}>
        <p className="text-slate-500 text-sm">Žádné obrázky</p>
      </div>
    )
  }

  return (
    <div
      className={`h-full overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent ${className}`}
    >
      <div className="space-y-1.5 pr-1 md:pr-2">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative w-full aspect-[4/5] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

