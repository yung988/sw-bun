'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type ScrollAnimationProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Smooth Parallax Scroll Animation
 * Elements move at different speeds based on scroll position
 */
export default function ScrollAnimation({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 100, opacity: 0, scale: 0.98 },
        {
          y: -100,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'bottom top', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
