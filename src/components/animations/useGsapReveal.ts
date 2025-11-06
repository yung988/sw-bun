'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type RefObject, useLayoutEffect } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapReveal(containerRef: RefObject<HTMLElement>, selector = '[data-reveal]') {
  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    // respektuje "reduced motion"
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector)
      gsap.set(items, { autoAlpha: 0, y: 24 })

      items.forEach((el, i) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.05 * (i % 6), // jemný místní „stagger"
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [containerRef, selector])
}
