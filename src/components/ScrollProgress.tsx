'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
      const progress = (doc.scrollTop || document.body.scrollTop) / max
      gsap.to(el, { scaleX: progress, overwrite: true, duration: 0.15, ease: 'power2.out' })
    }
    update()
    const onScroll = () => update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className="fixed top-0 left-0 right-0 h-1 bg-slate-900 origin-left z-50" style={{ transform: 'scaleX(0)' }} />
}
