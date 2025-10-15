'use client'
import { motion, type Variants } from 'framer-motion'
import { useRef } from 'react'

type EntranceType =
  | 'slideLeft' // Přijede zleva
  | 'slideRight' // Přijede zprava
  | 'slideUp' // Vyjede zespodu
  | 'slideDown' // Spadne shora
  | 'rotate3D' // 3D rotace při příjezdu
  | 'flip3D' // 3D flip efekt
  | 'spiral' // Točí se při příjezdu
  | 'scaleRotate' // Zvětší se a točí
  | 'bounce' // Bounce efekt
  | 'elastic' // Elastický příjezd

type DramaticEntranceProps = {
  children: React.ReactNode
  type: EntranceType
  delay?: number
  duration?: number
  className?: string
}

const entranceVariants: Record<EntranceType, Variants> = {
  slideLeft: {
    hidden: { opacity: 0, x: -200, rotateY: -45 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 200, rotateY: 45 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 150, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 25,
        mass: 0.8,
      },
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -150, scale: 1.2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        mass: 1.2,
      },
    },
  },
  rotate3D: {
    hidden: { opacity: 0, rotateX: 90, rotateY: 45, scale: 0.5 },
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  },
  flip3D: {
    hidden: { opacity: 0, rotateY: 180, scale: 0.8 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        mass: 1.5,
      },
    },
  },
  spiral: {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 0.8,
      },
    },
  },
  scaleRotate: {
    hidden: { opacity: 0, scale: 0.3, rotate: -90, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 1,
      },
    },
  },
  bounce: {
    hidden: { opacity: 0, y: -100, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
        mass: 0.8,
        bounce: 0.6,
      },
    },
  },
  elastic: {
    hidden: { opacity: 0, scale: 0, rotate: 45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
        mass: 0.5,
      },
    },
  },
}

export default function DramaticEntrance({
  children,
  type,
  delay = 0,
  duration = 1,
  className = '',
}: DramaticEntranceProps) {
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px', amount: 0.3 }}
      variants={entranceVariants[type]}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={className}
      custom={{ delay, duration }}
    >
      {children}
    </motion.div>
  )
}
