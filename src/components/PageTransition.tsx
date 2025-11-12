'use client'

import { gsap } from '@/lib/gsap'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useLayoutEffect, useRef } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const glassRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!glassRef.current) return
    
    // Scroll to top immediately on route change
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Animate transition overlay
    const tl = gsap.timeline()
    tl.set(glassRef.current, { opacity: 0, pointerEvents: 'none', backdropFilter: 'blur(0px)' })
    tl.to(glassRef.current, {
      opacity: 1,
      pointerEvents: 'all',
      backdropFilter: 'blur(16px)',
      duration: 0.18,
      ease: 'power2.in',
    }).to(glassRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      backdropFilter: 'blur(0px)',
      duration: 0.27,
      ease: 'power2.inOut',
      delay: 0.11,
    })
    
    return () => {
      gsap.killTweensOf(glassRef.current)
    }
  }, [pathname])

  return (
    <>
      <div
        ref={glassRef}
        className="fixed inset-0 z-[100] transition-all pointer-events-none backdrop-blur-lg bg-white/20"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div>{children}</div>
    </>
  )
}
