'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import PageTransition from './PageTransition'

type MainContentProps = {
  children: React.ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  return <PageTransition>{children}</PageTransition>
}
