'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type NumberedSectionProps = {
  number: number
  children: ReactNode
  className?: string
}

/**
 * Section with animated number (01, 02, 03...)
 * Number fades in and sticks to the side as you scroll
 */
export default function NumberedSection({ 
  number, 
  children, 
  className = '' 
}: NumberedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !numberRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (numberRef.current) {
        numberRef.current.style.opacity = '1'
      }
      return
    }

    const section = sectionRef.current
    const numberEl = numberRef.current

    const ctx = gsap.context(() => {
      // Number fade in
      gsap.from(numberEl, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      // Number parallax effect
      gsap.to(numberEl, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      {/* Number badge */}
      <div
        ref={numberRef}
        className="absolute -left-4 md:left-0 top-0 z-10"
      >
        <span className="text-[120px] md:text-[180px] font-light text-slate-200 tabular-nums leading-none select-none">
          {number.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </section>
  )
}

