'use client'

import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, Flip)
}

export { gsap, ScrollTrigger, CustomEase, Flip }

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export function createGsapContext<T extends Element>(ref: React.RefObject<T>, fn: () => void) {
  return gsap.context(fn, ref)
}
