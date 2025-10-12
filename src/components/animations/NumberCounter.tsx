'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type NumberCounterProps = {
  number: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/**
 * Animated number counter on scroll
 * Perfect for stats and numbered sections
 */
export default function NumberCounter({ 
  number, 
  prefix = '',
  suffix = '',
  duration = 2,
  className = '' 
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayNumber, setDisplayNumber] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayNumber(number)
      return
    }

    const element = ref.current
    const counter = { value: 0 }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: number,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayNumber(Math.round(counter.value))
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })
    }, ref)

    return () => ctx.revert()
  }, [number, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{displayNumber.toString().padStart(2, '0')}{suffix}
    </span>
  )
}

