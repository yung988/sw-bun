'use client'

import type React from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Kontextový tvar a výchozí stav
interface IntroContextType {
  introComplete: boolean
  setIntroComplete: (value: boolean) => void
}

const IntroContext = createContext<IntroContextType | undefined>(undefined)

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [introComplete, setIntroComplete] = useState(false)

  // handler s useCallback kvůli propagačním závislostem
  const markComplete = useCallback((val: boolean) => setIntroComplete(val), [])

  // Inicializace stavu podle window, pokud je event už hotový (pro SSR-safe řešení)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__introComplete) {
      setIntroComplete(true)
    }
  }, [])

  return (
    <IntroContext.Provider value={{ introComplete, setIntroComplete: markComplete }}>{children}</IntroContext.Provider>
  )
}

export function useIntroCompleteContext(): [boolean, (val: boolean) => void] {
  const ctx = useContext(IntroContext)
  if (!ctx) throw new Error('useIntroCompleteContext musí být použit v rámci <IntroProvider>')
  return [ctx.introComplete, ctx.setIntroComplete]
}
