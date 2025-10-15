import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export function useGSAPAnimation(animationFn: (ctx: gsap.Context) => void, dependencies: any[] = []) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn(ctx)
    }, ref)

    return () => ctx.revert()
  }, dependencies)

  return ref
}

/**
 * Custom hook for GSAP ScrollTrigger animations
 */
export function useScrollTrigger(
  animationFn: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
  triggerOptions: ScrollTrigger.Vars = {},
  dependencies: any[] = []
) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const animation = animationFn(ref.current)

    ScrollTrigger.create({
      trigger: ref.current,
      animation,
      ...triggerOptions,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === ref.current) {
          trigger.kill()
        }
      })
    }
  }, dependencies)

  return ref
}
