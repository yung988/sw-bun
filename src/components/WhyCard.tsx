'use client'

import { gsap } from '@/lib/gsap'
import { useLayoutEffect, useRef } from 'react'

type Props = { icon?: string; title: string; description: string }

export default function WhyCard({ icon, title, description }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      // entrance on scroll is usually handled by parent; safe no-op here
      // hover interactions
      const el = ref.current
      if (!el) return
      const over = () => gsap.to(el, { y: -8, scale: 1.01, duration: 0.3, ease: 'power2.out' })
      const out = () => gsap.to(el, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' })
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)

      if (iconRef.current) {
        const ico = iconRef.current
        const overI = () => gsap.to(ico, { scale: 1.1, rotate: 5, duration: 0.25, ease: 'power2.out' })
        const outI = () => gsap.to(ico, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' })
        el.addEventListener('mouseenter', overI)
        el.addEventListener('mouseleave', outI)
      }

      return () => {
        el.removeEventListener('mouseenter', over)
        el.removeEventListener('mouseleave', out)
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="rounded-2xl bg-white border border-slate-200 p-8 will-change-transform">
      {icon && (
        <div ref={iconRef} className="mb-6 text-4xl will-change-transform">
          <span aria-hidden>{icon}</span>
        </div>
      )}
      <div className="mb-4">
        <strong className="text-xl font-semibold text-slate-900">{title}</strong>
      </div>
      <p className="text-base leading-relaxed text-slate-600">{description}</p>
    </div>
  )
}
