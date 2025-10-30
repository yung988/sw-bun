'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

type Props = { quote: string; name: string; stars?: number; avatarSrc?: string }

import gsap from 'gsap'

export default function TestimonialCard({ quote, name, stars = 5, avatarSrc }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -5
    const rotateYValue = ((x - centerX) / centerX) * 5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const handleHoverIn = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, { y: -8, duration: 0.25, ease: 'power2.out' })
  }
  const handleHoverOut = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="group flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={(_e) => {
        handleMouseLeave()
        handleHoverOut()
      }}
      onMouseEnter={handleHoverIn}
    >
      <div className="flex items-center gap-1 text-slate-900" aria-label={`Hodnocení: ${stars} z 5 hvězdiček`}>
        {[...Array(stars)].map((_, i) => (
          <svg
            key={`${name.replace(/\s/g, '')}-star-${i + 1}`}
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <title>Hvězdička</title>
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <p className="text-base leading-relaxed text-slate-700">{quote}</p>
      <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-200">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm bg-slate-100">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={name} fill sizes="48px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-600">
              {initials}
            </div>
          )}
        </div>
        <div className="text-sm">
          <div className="font-semibold text-slate-900">{name}</div>
        </div>
      </div>
    </div>
  )
}
