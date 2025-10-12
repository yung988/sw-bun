'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type ScrollRevealProps = {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
}

/**
 * Scroll-triggered reveal animation with multiple direction options
 * Versatile component for any scroll-based entrance
 */
export default function ScrollReveal({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 1,
  className = '',
  triggerOnce = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const getAnimationProps = () => {
      switch (direction) {
        case 'up':
          return { y: 80, opacity: 0 }
        case 'down':
          return { y: -80, opacity: 0 }
        case 'left':
          return { x: 80, opacity: 0 }
        case 'right':
          return { x: -80, opacity: 0 }
        case 'scale':
          return { scale: 0.8, opacity: 0 }
        case 'rotate':
          return { rotateX: -45, rotateY: 15, opacity: 0, transformPerspective: 1000 }
        default:
          return { y: 80, opacity: 0 }
      }
    }

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...getAnimationProps(),
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
        }
      })
    }, ref)

    return () => ctx.revert()
  }, [direction, delay, duration, triggerOnce])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

