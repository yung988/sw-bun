'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulace načítání 0-100% za 2 sekundy
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Po dosažení 100% počkat 300ms a pak nastavit isComplete na true
          setTimeout(() => setIsComplete(true), 300)
          return 100
        }
        return prev + 1
      })
    }, 20) // 100 kroků za 2 sekundy (2000ms / 100 = 20ms)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          {/* Logo s pulse animací */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            <Image src="/logo.svg" alt="SW Beauty" width={80} height={80} />
          </motion.div>

          {/* Progress bar */}
          <div className="mt-8 w-[200px]">
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full bg-slate-900"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 text-center text-sm text-slate-600">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
