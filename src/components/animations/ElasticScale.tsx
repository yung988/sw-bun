'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

type ElasticScaleProps = {
  children: React.ReactNode
  className?: string
  scaleRange?: [number, number]
}

/**
 * Elastic Scale Animation - Smooth spring-based scaling on scroll
 * Creates organic, bouncy feel like premium websites
 */
export default function ElasticScale({ 
  children, 
  className = '',
  scaleRange = [0.8, 1.2]
}: ElasticScaleProps) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Transform scroll to scale
  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleRange[0], scaleRange[1], scaleRange[0]]
  )

  // Apply spring physics for elastic feel
  const scale = useSpring(scaleRaw, {
    stiffness: 200,
    damping: 20,
    mass: 0.5
  })

  // Rotate slightly for more dynamic feel
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-5, 0, 5]
  )

  const rotateSpring = useSpring(rotate, {
    stiffness: 200,
    damping: 20
  })

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ scale, rotate: rotateSpring }}
      >
        {children}
      </motion.div>
    </div>
  )
}

