'use client'

import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

const galleryImages = [
  { src: '/images/salon/recepce.jpg', title: 'Recepce' },
  { src: '/images/salon/cekarna.jpg', title: 'Čekárna' },
  { src: '/images/salon/cekarnaDetail.jpg', title: 'Detail čekárny' },
  { src: '/images/salon/kreslomistnostnaprocedury.jpg', title: 'Místnost na procedury' },
  { src: '/images/salon/stul_detail.jpg', title: 'Detail pracovního stolu' },
  { src: '/images/salon/logonazdi.jpg', title: 'Logo na zdi' },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <Section id="galerie" className="relative bg-[#f8f3f0] luxury-spacing">
        <Container>
          {/* Giant Heading */}
          <div className="mb-12 lg:mb-20">
            <h2 className="text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif font-light text-center opacity-10 leading-none select-none">
              GALERIE
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-4">
              Nahlédněte do našeho luxusního salonu
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Objevte elegantní prostředí, kde se o vás budeme starat s maximální péčí a profesionalitou
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-square"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg sm:text-xl font-serif px-4 text-center">
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Modal for image zoom */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Zavřít"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                fill
                sizes="100vw"
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 text-center py-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-lg sm:text-xl font-serif">
                {galleryImages[selectedImage].title}
              </p>
            </div>
          </div>

          {/* Navigation hints */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Klikněte kamkoliv pro zavření
          </div>
        </div>
      )}
    </>
  )
}
