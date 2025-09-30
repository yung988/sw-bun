'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

type FadeInSectionProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeInSection({ children, delay = 0, className = '' }: FadeInSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Soft easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
