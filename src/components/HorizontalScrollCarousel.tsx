'use client'

import { gsap } from '@/lib/gsap'
import { useEffect, useRef } from 'react'

type HorizontalScrollCarouselProps = {
  children: React.ReactNode
}

export default function HorizontalScrollCarousel({ children }: HorizontalScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scrollContainer = scrollRef.current

    if (!container || !scrollContainer) return

    // Počkáme, až se DOM plně načte
    const timer = setTimeout(() => {
      const cards = scrollContainer.children
      const totalWidth = scrollContainer.scrollWidth
      const viewportWidth = container.offsetWidth

      // Vytvoříme ScrollTrigger animaci
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 20%',
          end: () => `+=${totalWidth - viewportWidth + 500}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Animujeme posun kontejneru doleva
      tl.to(scrollContainer, {
        x: () => -(totalWidth - viewportWidth),
        ease: 'none',
      })
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 will-change-transform"
        style={{
          width: 'fit-content',
        }}
      >
        {children}
      </div>
    </div>
  )
}
