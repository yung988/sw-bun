'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

type CursorFollowProps = {
  children: React.ReactNode
  className?: string
  strength?: number
  delay?: number
}

/**
 * Cursor Follow - Element follows cursor with delay
 * Premium interaction from award-winning websites
 */
export default function CursorFollow({ 
  children, 
  className = '',
  strength = 0.1,
  delay = 0.15
}: CursorFollowProps) {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Smooth spring with delay
  const springConfig = { 
    damping: 25, 
    stiffness: 150, 
    mass: 0.5 
  }
  
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset from center of viewport
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      const offsetX = (e.clientX - centerX) * strength
      const offsetY = (e.clientY - centerY) * strength
      
      cursorX.set(offsetX)
      cursorY.set(offsetY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY, strength])

  return (
    <motion.div
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

