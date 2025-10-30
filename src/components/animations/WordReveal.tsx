'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type WordRevealProps = {
  children: string
  delay?: number
  stagger?: number
  className?: string
}

/**
 * Word-by-word reveal animation
 * Text appears word by word as you scroll
 */
export default function WordReveal({ children, delay = 0, stagger = 0.05, className = '' }: WordRevealProps) {
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
    const words = element.querySelectorAll('.word')

    const ctx = gsap.context(() => {
      gsap.from(words, {
        opacity: 0,
        y: 20,
        duration: 0.6,
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

  // Split text into words
  const words = children.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </div>
  )
}
