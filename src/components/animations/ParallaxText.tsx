'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

type ParallaxTextProps = {
  children: React.ReactNode
  speed?: number
  className?: string
}

/**
 * Parallax Text - Text moves at different speed than scroll
 * Creates depth and premium feel
 */
export default function ParallaxText({ 
  children, 
  speed = 0.5,
  className = '' 
}: ParallaxTextProps) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth spring for natural movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  })

  // Calculate parallax offset based on speed
  const y = useTransform(smoothProgress, [0, 1], [-100 * speed, 100 * speed])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

