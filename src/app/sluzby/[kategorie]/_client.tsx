'use client'
import { useGsapParallax } from '@/components/animations/useGsapParallax'
import { useGsapReveal } from '@/components/animations/useGsapReveal'
import { type RefObject, useRef } from 'react'

export default function CategoryClient({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapReveal(ref as RefObject<HTMLElement>)
  useGsapParallax(ref as RefObject<HTMLElement>)
  return <div ref={ref}>{children}</div>
}
