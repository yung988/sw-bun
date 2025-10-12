'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const
const INTRO_DURATION_MS = 2400
const SESSION_KEY = 'swbeauty_intro_seen'

export default function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1') {
        setIsVisible(false)
        return
      }
    } catch {}

    if (prefersReducedMotion) {
      // Respect reduced motion: skip intro quickly
      setIsVisible(false)
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}
      return
    }

    setIsVisible(true)

    const timeout = setTimeout(() => {
      setIsVisible(false)
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}
    }, INTRO_DURATION_MS)

    return () => clearTimeout(timeout)
  }, [prefersReducedMotion])

  if (!isVisible) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-0 z-[9999] bg-milk"
        aria-hidden="true"
      >
        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'radial-gradient(1200px 600px at 50% 40%, rgba(0,0,0,0.04), rgba(0,0,0,0))'
        }} />
        {/* Content center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Brand logo */}
            <motion.img
              src="/sw-logo.svg"
              alt="SW Beauty logo"
              width={220}
              height={220}
              loading="eager"
              initial={{ opacity: 0, y: 10, scale: 0.94, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: EASE }}
              className="block opacity-95"
            />

            {/* Subtle tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="mt-6 text-[11px] md:text-sm uppercase tracking-[0.35em] text-slate-600"
            >
              Hodonín · kosmetický salon
            </motion.p>
          </div>
        </div>

        {/* Progress line at bottom */}
        <div className="absolute inset-x-10 bottom-12">
          <div className="h-px w-full bg-black/10" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
            className="mt-[-1px] h-[2px] bg-black/80"
          />
        </div>

        {/* Soft wipe reveal */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          style={{ transformOrigin: 'top center' }}
          className="pointer-events-none absolute inset-0 bg-milk"
        />
      </motion.div>
    </AnimatePresence>
  )
}
