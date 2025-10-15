'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

type Perspective3DProps = {
  children: React.ReactNode
  className?: string
  rotateIntensity?: number
}

/**
 * 3D Perspective Animation - Scroll-linked 3D transforms
 * Creates depth and premium spatial feel
 * Used on luxury brand websites
 */
export default function Perspective3D({ children, className = '', rotateIntensity = 15 }: Perspective3DProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // 3D rotation transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [rotateIntensity, 0, -rotateIntensity])

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-rotateIntensity / 2, 0, rotateIntensity / 2])

  // Smooth spring for natural movement
  const smoothRotateX = useSpring(rotateX, {
    stiffness: 100,
    damping: 30,
  })

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 100,
    damping: 30,
  })

  // Z-axis movement for depth
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100])

  const smoothZ = useSpring(z, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <div ref={ref} className={`perspective-1000 ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          z: smoothZ,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
