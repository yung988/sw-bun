'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type ImageRevealProps = {
  children: ReactNode
  direction?: 'left' | 'right' | 'top' | 'bottom'
  duration?: number
  delay?: number
  className?: string
}

/**
 * Image reveal with curtain/wipe effect
 * Image is revealed with a sliding curtain effect
 */
export default function ImageReveal({
  children,
  direction = 'right',
  duration = 1.2,
  delay = 0,
  className = '',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !curtainRef.current || !imageRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (curtainRef.current) curtainRef.current.style.display = 'none'
      if (imageRef.current) imageRef.current.style.opacity = '1'
      return
    }

    const container = containerRef.current
    const curtain = curtainRef.current
    const image = imageRef.current

    const getClipPath = () => {
      switch (direction) {
        case 'left':
          return { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' }
        case 'right':
          return { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' }
        case 'top':
          return { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' }
        case 'bottom':
          return { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' }
        default:
          return { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' }
      }
    }

    const clipPath = getClipPath()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Curtain reveal
      tl.from(curtain, {
        clipPath: clipPath.from,
        duration,
        delay,
        ease: 'power3.inOut',
      })

      // Image scale effect
      tl.from(
        image,
        {
          scale: 1.1,
          duration,
          ease: 'power2.out',
        },
        '<'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [direction, duration, delay])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Curtain overlay */}
      <div ref={curtainRef} className="absolute inset-0 bg-slate-900 z-10" style={{ clipPath: 'inset(0 100% 0 0)' }} />

      {/* Image content */}
      <div ref={imageRef} className="w-full h-full">
        {children}
      </div>
    </div>
  )
}
