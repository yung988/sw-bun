'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'

type Props = {
  title: string
  description: string
  price: string
  category: string
  href: string
  image?: string
  compact?: boolean // Pro použití v carouselu na hlavní stránce
}

export default function ServiceCard({ title, description, price, category, href, image, compact = false }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const cardClasses = compact
    ? 'group block w-[320px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl'
    : 'group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl'

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -8
    const rotateYValue = ((x - centerX) / centerX) * 8

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      className={cardClasses}
      aria-label={`Zobrazit detail služby ${title}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${rotateX || rotateY ? -5 : 0}px)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section - jen pro compact verzi */}
      {compact && (
        <div className="relative aspect-[4/3] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="320px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-4xl opacity-50">✨</div>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className={compact ? 'p-8' : 'p-8'}>
        <div className="mb-6">
          <div
            className={`text-xs ${compact ? 'uppercase tracking-wide' : 'text-slate-500 uppercase tracking-wider'} font-medium mb-3 text-slate-500`}
          >
            {category}
          </div>
          <h3
            className={`text-xl font-semibold text-slate-900 ${compact ? 'line-clamp-2' : 'line-clamp-2 min-h-[3.5rem]'}`}
          >
            {title}
          </h3>
        </div>

        <p className={`text-base text-slate-600 mb-6 leading-relaxed ${compact ? 'line-clamp-2' : 'line-clamp-3 min-h-[4.5rem]'}`}>
          {description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">{price}</span>
          </div>
          <svg
            className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Šipka doprava</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
