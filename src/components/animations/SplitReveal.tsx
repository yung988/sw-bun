'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type SplitRevealProps = {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * Split reveal animation - content splits and reveals from center
 * Great for dramatic section entrances
 */
export default function SplitReveal({ children, direction = 'horizontal', className = '' }: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !leftRef.current || !rightRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none none',
        },
      })

      if (direction === 'horizontal') {
        tl.from(leftRef.current, {
          x: '-100%',
          duration: 1.2,
          ease: 'power4.out',
        }).from(
          rightRef.current,
          {
            x: '100%',
            duration: 1.2,
            ease: 'power4.out',
          },
          '<'
        )
      } else {
        tl.from(leftRef.current, {
          y: '-100%',
          duration: 1.2,
          ease: 'power4.out',
        }).from(
          rightRef.current,
          {
            y: '100%',
            duration: 1.2,
            ease: 'power4.out',
          },
          '<'
        )
      }

      // Reveal content
      const contentElement = ref.current?.querySelector('.split-content')
      if (contentElement) {
        tl.from(
          contentElement,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [direction])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        ref={leftRef}
        className="absolute inset-0 bg-slate-900 z-10"
        style={{ clipPath: direction === 'horizontal' ? 'inset(0 50% 0 0)' : 'inset(0 0 50% 0)' }}
      />
      <div
        ref={rightRef}
        className="absolute inset-0 bg-slate-900 z-10"
        style={{ clipPath: direction === 'horizontal' ? 'inset(0 0 0 50%)' : 'inset(50% 0 0 0)' }}
      />
      <div className="split-content relative z-0">{children}</div>
    </div>
  )
}
