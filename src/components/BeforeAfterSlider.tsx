'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type BeforeAfterSliderProps = {
  beforeImage: string
  afterImage: string
  alt: string
}

export default function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 select-none touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${alt} - Po`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-900 shadow-lg">
          Po
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image
          src={beforeImage}
          alt={`${alt} - Před`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-900 shadow-lg">
          Před
        </div>
      </div>

      {/* Slider Handle */}
      <div className="absolute top-0 bottom-0 w-1 cursor-ew-resize" style={{ left: `${sliderPosition}%` }}>
        {/* Line */}
        <div className="absolute inset-0 bg-white shadow-lg" />

        {/* Handle Circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-2xl cursor-grab active:cursor-grabbing transition-transform duration-150 hover:scale-110 active:scale-95"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Left Arrow */}
          <svg className="absolute left-2 h-4 w-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Previous image</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>

          {/* Right Arrow */}
          <svg
            className="absolute right-2 h-4 w-4 text-slate-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Next image</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Instruction Text (visible on first load) */}
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 backdrop-blur-sm px-4 py-2 text-sm text-white transition-opacity duration-200"
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        Přetáhněte pro porovnání
      </div>
    </div>
  )
}
