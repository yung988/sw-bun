'use client'
import React, { Children, useEffect, useRef, useState } from 'react'

type CarouselProps = {
  children: React.ReactNode
  auto?: boolean // enable autoplay horizontal scroll
  autoSpeed?: number // pixels per second
  showArrows?: boolean // show navigation arrows
}

export default function Carousel({ children, auto = false, autoSpeed = 30, showArrows = true }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Duplicate children for seamless loop with unique keys
  const items = Children.toArray(children)
  const renderItems = [
    ...items.map((item) =>
      React.cloneElement(item as React.ReactElement, { key: `set1-${(item as React.ReactElement).key}` })
    ),
    ...items.map((item) =>
      React.cloneElement(item as React.ReactElement, { key: `set2-${(item as React.ReactElement).key}` })
    ),
    ...items.map((item) =>
      React.cloneElement(item as React.ReactElement, { key: `set3-${(item as React.ReactElement).key}` })
    ),
  ]

  const scroll = (direction: 'left' | 'right') => {
    const el = ref.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.8
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scroll('left')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scroll('right')
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const checkScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }

    // Initialize at the middle set for seamless wrap
    const unit = el.scrollWidth / 3 || 1
    el.scrollLeft = unit

    if (auto) {
      let raf = 0
      let last = performance.now()
      const step = (now: number) => {
        const dt = (now - last) / 1000
        last = now
        if (!hovering.current) {
          el.scrollLeft += autoSpeed * dt
          const max = unit * 2
          if (el.scrollLeft >= max) {
            el.scrollLeft -= unit
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += unit
          }
        }
        raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }

    // For manual scroll, handle infinite loop
    const handleScroll = () => {
      const max = unit * 2
      if (el.scrollLeft >= max - 10) {
        el.scrollLeft = unit + (el.scrollLeft - max)
      } else if (el.scrollLeft <= unit / 3) {
        el.scrollLeft = unit + el.scrollLeft
      }
      checkScrollState()
    }
    el.addEventListener('scroll', handleScroll)
    checkScrollState()
    return () => el.removeEventListener('scroll', handleScroll)
  }, [auto, autoSpeed])

  return (
    <div
      className="relative group"
      onMouseEnter={() => {
        hovering.current = true
      }}
      onMouseLeave={() => {
        hovering.current = false
      }}
    >
      {showArrows && !auto && (
        <>
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white  p-3 shadow-lg transition-all hover:scale-110 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <svg
              className="h-5 w-5 text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>Šipka doleva</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white  p-3 shadow-lg transition-all hover:scale-110 ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <svg
              className="h-5 w-5 text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>Šipka doprava</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      <div
        ref={ref}
        aria-label="Carousel"
        onKeyDown={handleKeyDown}
        className={`${auto ? 'flex gap-[30px] overflow-x-auto py-2 scrollbar-hide [&::-webkit-scrollbar]:hidden' : 'flex gap-6 overflow-x-auto snap-x snap-mandatory py-2 scrollbar-hide [&::-webkit-scrollbar]:hidden'}`}
        style={{ scrollbarWidth: 'none' }}
      >
        {renderItems}
      </div>
    </div>
  )
}
