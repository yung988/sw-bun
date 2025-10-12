'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type PinSectionProps = {
  children: ReactNode
  duration?: number
  className?: string
}

/**
 * Pin section in place while scrolling
 * Content stays fixed while other animations happen
 */
export default function PinSection({ 
  children, 
  duration = 1,
  className = '' 
}: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const element = ref.current

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: `+=${window.innerHeight * duration}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      })
    }, ref)

    return () => ctx.revert()
  }, [duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

