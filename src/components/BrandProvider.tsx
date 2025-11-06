'use client'

import { createContext, useContext } from 'react'

type BrandContextValue = {
  logoSrc: string
}

const BrandContext = createContext<BrandContextValue | null>(null)

export function BrandProvider({ value, children }: { value: BrandContextValue; children: React.ReactNode }) {
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
}

export function useBrand() {
  const ctx = useContext(BrandContext)
  if (!ctx) return { logoSrc: '/logo.svg' }
  return ctx
}
