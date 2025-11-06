'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import PageTransition from './PageTransition'

type MainContentProps = {
  children: React.ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const _pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return <PageTransition>{children}</PageTransition>
}
