'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type TextRevealProps = {
  children: string
  className?: string
}

/**
 * Text Reveal Animation - Characters reveal progressively on scroll
 * Premium technique used on luxury brand websites
 */
export default function TextReveal({ children, className = '' }: TextRevealProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = children.split(' ')

  return (
    <div ref={ref} className={className}>
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </p>
    </div>
  )
}

type WordProps = {
  children: string
  progress: any
  range: [number, number]
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [20, 0])
  const scale = useTransform(progress, range, [0.8, 1])

  return (
    <span className="relative mr-2 mt-2">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity, y, scale }} className="relative">
        {children}
      </motion.span>
    </span>
  )
}
