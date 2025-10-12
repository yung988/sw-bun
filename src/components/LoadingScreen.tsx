'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const EASE = [0.16, 1, 0.3, 1] as const // Smooth easing
const INTRO_DURATION_MS = 3000 // Increased for counter animation
const SESSION_KEY = 'swbeauty_intro_seen'

export default function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const hasRunRef = useRef(false)
  const counterRef = useRef<HTMLSpanElement>(null)

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
      setIsVisible(false)
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}
      return
    }

    setIsVisible(true)

    // Animate counter from 0 to 100
    const counter = { value: 0 }
    gsap.to(counter, {
      value: 100,
      duration: INTRO_DURATION_MS / 1000,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(counter.value))
      },
    })

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
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-0 z-[9999] bg-white"
        aria-hidden="true"
      >
        {/* Content center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-12">
            {/* Brand logo with smooth fade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.1
              }}
              className="relative"
            >
              <motion.img
                src="/sw-logo.svg"
                alt="SW Beauty logo"
                width={180}
                height={180}
                loading="eager"
                className="block"
              />
            </motion.div>

            {/* Counter and progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="flex flex-col items-center gap-6 w-64"
            >
              {/* Animated counter */}
              <div className="text-center">
                <span
                  ref={counterRef}
                  className="text-6xl font-light text-slate-900 tabular-nums"
                >
                  {progress.toString().padStart(2, '0')}
                </span>
                <span className="text-2xl font-light text-slate-400 ml-1">%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-slate-900"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                className="text-xs uppercase tracking-[0.3em] text-slate-600 font-light"
              >
                beauty in every detail
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Smooth curtain exit */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '100%' }}
          exit={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="pointer-events-none absolute inset-0 bg-white"
          style={{ transformOrigin: 'bottom' }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
