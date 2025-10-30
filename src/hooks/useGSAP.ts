import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import type { DependencyList } from 'react'

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export function useGSAPAnimation(animationFn: (ctx: gsap.Context) => void, dependencies: DependencyList = []) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn(ctx)
    }, ref)

    return () => ctx.revert()
  }, [animationFn, ...dependencies])

  return ref
}

/**
 * Custom hook for GSAP ScrollTrigger animations
 */
export function useScrollTrigger(
  animationFn: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
  triggerOptions: ScrollTrigger.Vars = {},
  dependencies: DependencyList = []
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
      for (const trigger of ScrollTrigger.getAll()) {
        if (trigger.trigger === ref.current) {
          trigger.kill()
        }
      }
    }
  }, [animationFn, triggerOptions, ...dependencies])

  return ref
}
