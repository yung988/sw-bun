'use client'
import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type StaggerGroupProps = {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

/**
 * Stagger Group - Children appear one by one with different animations
 * Each child can have different entrance direction
 */
export default function StaggerGroup({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}: StaggerGroupProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  }

  // Different entrance animations for variety
  const childVariants: Variants[] = [
    // From left
    {
      hidden: { opacity: 0, x: -100, rotateY: -30 },
      visible: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
      }
    },
    // From right
    {
      hidden: { opacity: 0, x: 100, rotateY: 30 },
      visible: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
      }
    },
    // From bottom
    {
      hidden: { opacity: 0, y: 100, scale: 0.8 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 120, damping: 25 }
      }
    },
    // Rotate in
    {
      hidden: { opacity: 0, scale: 0.5, rotate: -45 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: { type: 'spring', stiffness: 150, damping: 20 }
      }
    },
    // 3D flip
    {
      hidden: { opacity: 0, rotateX: 90, scale: 0.8 },
      visible: { 
        opacity: 1, 
        rotateX: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 18 }
      }
    }
  ]

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={childVariants[index % childVariants.length]}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

