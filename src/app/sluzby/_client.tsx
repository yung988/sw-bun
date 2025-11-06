'use client'
import { useGsapReveal } from '@/components/animations/useGsapReveal'
import dynamic from 'next/dynamic'
import { type RefObject, useRef } from 'react'

const ServiceSearch = dynamic(() => import('@/components/ServiceSearch'), { ssr: false })

export default function ServicesClient({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapReveal(ref as RefObject<HTMLElement>)
  return <div ref={ref}>{children}</div>
}

export { ServiceSearch }
