'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type SmoothRevealProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Smooth Reveal Animation - Text/Images gradually reveal using clip-path
 * Award-winning technique used on premium websites
 */
export default function SmoothReveal({ children, className = '' }: SmoothRevealProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  })

  // Clip-path reveal from bottom to top
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])

  // Subtle Y movement for depth
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ clipPath, y }} transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </div>
  )
}
