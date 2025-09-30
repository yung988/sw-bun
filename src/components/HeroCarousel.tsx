'use client'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export type Slide = {
  src: string
  alt: string
}

type HeroCarouselProps = {
  slides: Slide[]
  className?: string
}

export default function HeroCarousel({ slides, className }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const isHovering = useRef(false)

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(() => {
      if (!isHovering.current) {
        setIndex((i) => (i + 1) % total)
      }
    }, 5000)
    return () => clearInterval(id)
  }, [total])

  const containerClass = useMemo(
    () =>
      [
        'relative w-full overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-[#ede7de] dark:bg-slate-800',
        'aspect-[16/9] md:aspect-[21/9] md:min-h-[70vh] lg:min-h-[78vh]',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' '),
    [className]
  )

  return (
    <div
      className={containerClass}
      onMouseEnter={() => {
        isHovering.current = true
      }}
      onMouseLeave={() => {
        isHovering.current = false
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== index}
        >
          <Image src={s.src} alt={s.alt} fill sizes="100vw" className="object-cover" priority={i === index} />
        </div>
      ))}

      {/* Controls */}
      <button
        type="button"
        aria-label="previous slide"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 dark:bg-slate-800/95 p-3 text-slate-700 dark:text-slate-200 shadow-soft transition hover:bg-white dark:hover:bg-slate-700 hover:scale-105"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="next slide"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 dark:bg-slate-800/95 p-3 text-slate-700 dark:text-slate-200 shadow-soft transition hover:bg-white dark:hover:bg-slate-700 hover:scale-105"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((slide, i) => (
          <button
            key={`dot-${slide.src}-${i}`}
            type="button"
            aria-label={`Show slide ${i + 1} of ${total}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${i === index ? 'bg-white dark:bg-slate-200 w-6' : 'bg-white/60 dark:bg-slate-400 hover:bg-white/80 dark:hover:bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  )
}
