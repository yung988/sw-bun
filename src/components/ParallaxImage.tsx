'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
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
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current || !innerRef.current) return
    const ctx = gsap.context(() => {
      const el = innerRef.current!
      gsap.fromTo(
        el,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef} className="relative w-full h-full will-change-transform">
        <Image src={src} alt={alt} fill={fill} sizes={sizes} className="object-cover" priority={priority} />
      </div>
    </div>
  )
}
