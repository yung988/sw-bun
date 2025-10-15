'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

type ParallaxImageProps = {
  src: string
  alt: string
  speed?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
  fill = true,
  sizes,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Transform scroll progress to Y position
  // speed controls how fast the image moves (0.5 = half speed, 1 = same speed, 2 = double speed)
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative w-full h-full">
        <Image src={src} alt={alt} fill={fill} sizes={sizes} className="object-cover" priority={priority} />
      </motion.div>
    </div>
  )
}
