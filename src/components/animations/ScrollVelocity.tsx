'use client'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

type ScrollVelocityProps = {
  children: React.ReactNode
  className?: string
  velocityFactor?: number
}

/**
 * Scroll Velocity Animation - Reacts to scroll speed
 * Fast scroll = more dramatic effect, slow scroll = subtle
 * Premium technique from award-winning sites
 */
export default function ScrollVelocity({ children, className = '', velocityFactor = 0.5 }: ScrollVelocityProps) {
  const ref = useRef(null)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  // Transform velocity to scale/rotation
  const velocityScale = useTransform(scrollVelocity, [-1000, 0, 1000], [0.95, 1, 0.95])

  const velocityRotate = useTransform(scrollVelocity, [-1000, 0, 1000], [-2, 0, 2])

  // Smooth spring for natural feel
  const scale = useSpring(velocityScale, {
    stiffness: 400,
    damping: 40,
  })

  const rotate = useSpring(velocityRotate, {
    stiffness: 400,
    damping: 40,
  })

  return (
    <motion.div ref={ref} style={{ scale, rotate }} className={className}>
      {children}
    </motion.div>
  )
}
