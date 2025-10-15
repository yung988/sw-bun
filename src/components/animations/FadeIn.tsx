'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  stagger?: number
}

/**
 * Simple fade-in animation on scroll
 * Clean, minimal, no fancy effects
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 1,
  y = 30,
  className = '',
  stagger = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 })
      return
    }

    const element = ref.current
    const children = stagger > 0 ? element.children : [element]

    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [delay, duration, y, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
