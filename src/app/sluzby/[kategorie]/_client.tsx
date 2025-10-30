'use client'
import { useRef } from 'react'
import { useGsapReveal } from '@/components/animations/useGsapReveal'
import { useGsapParallax } from '@/components/animations/useGsapParallax'

export default function CategoryClient({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapReveal(ref as any)
  useGsapParallax(ref as any)
  return <div ref={ref}>{children}</div>
}
