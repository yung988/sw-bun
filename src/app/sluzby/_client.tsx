'use client'
import { useRef } from 'react'
import { useGsapReveal } from '@/components/animations/useGsapReveal'

export default function ServicesClient({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapReveal(ref as any)
  return <div ref={ref}>{children}</div>
}
