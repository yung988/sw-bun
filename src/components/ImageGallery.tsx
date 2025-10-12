'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { ImageReveal } from './animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type GalleryImage = {
  src: string
  alt: string
  width?: number
  height?: number
}

type ImageGalleryProps = {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  className?: string
}

/**
 * Image gallery with stagger fade-in animations
 * Images appear one by one as you scroll
 */
export default function ImageGallery({ 
  images, 
  columns = 3,
  className = '' 
}: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!galleryRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const gallery = galleryRef.current
    const items = gallery.querySelectorAll('.gallery-item')

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          delay: (index % columns) * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        })
      })
    }, galleryRef)

    return () => ctx.revert()
  }, [columns])

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      ref={galleryRef}
      className={`grid ${gridCols[columns]} gap-6 ${className}`}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="gallery-item relative aspect-square overflow-hidden rounded-2xl bg-slate-100"
        >
          <ImageReveal direction={index % 2 === 0 ? 'right' : 'left'}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={`(max-width: 768px) 100vw, (max-width: 1024px) ${100 / Math.min(columns, 2)}vw, ${100 / columns}vw`}
            />
          </ImageReveal>
        </div>
      ))}
    </div>
  )
}

