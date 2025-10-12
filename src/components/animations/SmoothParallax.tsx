'use client'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useRef, ReactNode } from 'react'

type Layer = {
  children: ReactNode
  speed: number
  className?: string
}

type SmoothParallaxProps = {
  layers: Layer[]
  className?: string
}

/**
 * Multi-layer Parallax - Different elements move at different speeds
 * Creates depth and premium 3D-like effect
 * Used on Awwwards Site of the Day winners
 */
export default function SmoothParallax({ layers, className = '' }: SmoothParallaxProps) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth spring for all layers
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div ref={ref} className={`relative ${className}`}>
      {layers.map((layer, index) => {
        // Calculate Y offset based on layer speed
        const y = useTransform(
          smoothProgress,
          [0, 1],
          [-100 * layer.speed, 100 * layer.speed]
        )

        return (
          <motion.div
            key={index}
            style={{ y }}
            className={layer.className}
          >
            {layer.children}
          </motion.div>
        )
      })}
    </div>
  )
}

