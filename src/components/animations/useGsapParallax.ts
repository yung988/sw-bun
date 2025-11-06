'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type RefObject, useLayoutEffect } from 'react'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export function useGsapParallax(containerRef: RefObject<HTMLElement>, selector = '[data-parallax]') {
  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    const ctx = gsap.context(() => {
      for (const el of gsap.utils.toArray<HTMLElement>(selector)) {
        gsap.fromTo(
          el,
          { yPercent: -3 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      }
    }, root)

    return () => ctx.revert()
  }, [containerRef, selector])
}
