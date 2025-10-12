'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type LayeredParallaxProps = {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down'
  className?: string
}

/**
 * Layered parallax effect - elements move at different speeds on scroll
 * Creates depth perception
 */
export default function LayeredParallax({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}: LayeredParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const multiplier = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * multiplier])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

