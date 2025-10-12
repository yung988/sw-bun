'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type HorizontalScrollProps = {
  children: ReactNode
  speed?: number
  className?: string
}

/**
 * Horizontal scroll section - scrolls horizontally as you scroll down
 * Perfect for timelines and service showcases
 */
export default function HorizontalScroll({ 
  children, 
  speed = 1,
  className = '' 
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    const scroller = scrollerRef.current

    const ctx = gsap.context(() => {
      const scrollWidth = scroller.scrollWidth - container.offsetWidth

      gsap.to(scroller, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth * speed}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollerRef} className="flex w-fit">
        {children}
      </div>
    </div>
  )
}

