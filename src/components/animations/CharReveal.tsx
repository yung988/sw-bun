'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type CharRevealProps = {
  children: string
  delay?: number
  stagger?: number
  className?: string
}

/**
 * Character-by-character reveal animation
 * Text appears letter by letter as you scroll
 */
export default function CharReveal({ children, delay = 0, stagger = 0.02, className = '' }: CharRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (ref.current) {
        ref.current.style.opacity = '1'
      }
      return
    }

    const element = ref.current
    const chars = element.querySelectorAll('.char')

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: 10,
        duration: 0.4,
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
  }, [delay, stagger])

  // Split text into characters, preserving spaces
  const chars = children.split('').map((char, index) => {
    const key = char === ' ' ? `space-${index}` : `char-${char}-${index}`
    return (
      <span key={key} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    )
  })

  return (
    <div ref={ref} className={className}>
      {chars}
    </div>
  )
}
