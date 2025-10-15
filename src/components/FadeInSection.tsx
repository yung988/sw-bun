'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

type ScrollAnimationProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Smooth Parallax Scroll Animation
 * Elements move at different speeds based on scroll position
 */
export default function ScrollAnimation({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Smooth spring physics for natural movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Parallax Y movement
  const y = useTransform(smoothProgress, [0, 1], [100, -100])

  // Opacity fade based on scroll
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Scale transformation for depth
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      {children}
    </motion.div>
  )
}
