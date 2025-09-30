'use client'
import { type MotionValue, motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function VideoHero({ y }: { y: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(videoRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [inView])

  return (
    <motion.div style={{ y }} className="absolute inset-0 w-full h-full object-cover opacity-70">
      <video
        ref={videoRef}
        autoPlay={false}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero_1.mp4"
        poster="/hero-fallback.jpg"
      />
    </motion.div>
  )
}
