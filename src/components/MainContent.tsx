'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MainContentProps {
  children: React.ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const checkLoadingComplete = () => {
      try {
        if (typeof window !== 'undefined' && sessionStorage.getItem('swbeauty_intro_seen') === '1') {
          setLoadingComplete(true)
        } else {
          // If not seen, wait a bit and check again
          const timer = setTimeout(() => {
            setLoadingComplete(true)
          }, 3100) // Slightly after loading screen duration
          return () => clearTimeout(timer)
        }
      } catch {
        setLoadingComplete(true)
      }
    }

    checkLoadingComplete()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loadingComplete ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
