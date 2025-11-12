'use client'

import { useBrand } from '@/components/BrandProvider'
import { useIntroCompleteContext } from '@/components/IntroProvider'
import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [count, setCount] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const circleRef = useRef<HTMLDivElement | null>(null)
  const counterRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const [, setIntroComplete] = useIntroCompleteContext()
  const { logoSrc } = useBrand()

  const countSequence = [0, 23, 39, 46, 58, 67, 73, 84, 91, 96, 100]

  useLayoutEffect(() => {
    if (!isVisible || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Ukaž loader hned (žádná prázdná obrazovka): lehce menší a viditelný
      gsap.set('.loading-circle', { scale: 0.85, rotation: 0, opacity: 1 })
      gsap.set('.progress-ring', { strokeDashoffset: 565.48 })
      gsap.set('.counter-text', { opacity: 0, scale: 0.9, y: 20 })
      gsap.set('.logo-wrapper', { opacity: 0, scale: 0.7, filter: 'blur(40px) brightness(0.2)' })
      gsap.set('.overlay-blocks .block', { y: 0 })
      gsap.set('.transition-overlay', { scaleY: 0 })

      const tl = gsap.timeline({
        delay: 0,
        defaults: { ease: 'power3.out' },
        onComplete: () => setIntroComplete(true),
      })

      // 1️⃣ Elegantní vstup kruhu – pomalý, dýchající
      tl.to('.loading-circle', {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 2.2,
        ease: 'power4.out',
      })

      // 2️⃣ Counter – fade in (téměř okamžitě po startu)
      tl.to(
        '.counter-text',
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
        },
        '-=2.1'
      )

      // 3️⃣ Progress ring – luxury smooth
      const totalDur = 5
      const segmentDur = totalDur / (countSequence.length - 1)
      countSequence.forEach((target, i) => {
        if (i === 0) return
        const offset = 565.48 * (1 - target / 100)
        tl.to(
          '.progress-ring',
          { strokeDashoffset: offset, duration: segmentDur * 0.9, ease: 'power2.inOut' },
          i * segmentDur
        )
        tl.to(
          '.loading-circle',
          { rotation: `+=${360 / (countSequence.length - 1)}`, duration: segmentDur * 0.9, ease: 'power2.inOut' },
          i * segmentDur
        )
        tl.to(
          {},
          {
            duration: 0.01,
            onStart: () => setCount(target),
          },
          i * segmentDur + 0.05
        )
      })

      // 4️⃣ Fade out counter + circle
      tl.to('.counter-text', { opacity: 0, scale: 0.95, y: -10, duration: 0.8, ease: 'power2.in' }, '-=0.6')
      tl.to('.loading-circle', { scale: 0.8, opacity: 0, rotation: '+=90', duration: 0.8, ease: 'power2.in' }, '-=0.8')

      // 5️⃣ Logo reveal – vystoupí z černé mlhy
      tl.set('.logo-wrapper', { opacity: 1 })
      tl.to(
        '.logo-wrapper',
        {
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 2,
          ease: 'power4.out',
        },
        '-=0.4'
      )

      // 6️⃣ Luxury glow parallax – dýchání
      tl.to(
        '.logo-glow',
        {
          opacity: 0.6,
          scale: 1.5,
          duration: 2.5,
          ease: 'sine.inOut',
        },
        '-=2'
      )

      // 7️⃣ Logo hold – delší pauza
      tl.to({}, { duration: 1.2 })

      // 8️⃣ Final reveal – elegantní split
      tl.to('.logo-wrapper', {
        scale: 1.15,
        opacity: 0,
        filter: 'blur(30px) brightness(0.3)',
        duration: 1.2,
        ease: 'power3.in',
      })

      tl.to(
        '.transition-overlay',
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          transformOrigin: 'center center',
        },
        '-=0.8'
      )

      tl.to('.overlay-blocks .block-left', { y: '100%', duration: 1.6, ease: 'power3.inOut' }, '-=1')
      tl.to('.overlay-blocks .block-right', { y: '-100%', duration: 1.6, ease: 'power3.inOut' }, '-=1.6')

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => setIsVisible(false),
        },
        '-=0.5'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isVisible, setIntroComplete])

  if (!isVisible) return null

  const countStr = count.toString().padStart(3, '0')

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50"
      aria-hidden="true"
    >
      {/* Transition overlay */}
      <div className="transition-overlay absolute inset-0 bg-white origin-center scale-y-0 opacity-0" />

      {/* Split blocks */}
      <div className="overlay-blocks absolute inset-0 pointer-events-none z-0">
        <div className="block block-left absolute left-0 top-0 w-1/2 h-full bg-white" />
        <div className="block block-right absolute right-0 top-0 w-1/2 h-full bg-white" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {/* Loading circle */}
        <div ref={circleRef} className="loading-circle relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              className="progress-ring"
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="565.48"
              strokeDashoffset="565.48"
            />
          </svg>

          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full border border-black/5" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full border border-black/3" />
          </div>
        </div>

        {/* Counter */}
        <div ref={counterRef} className="counter-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center gap-1 md:gap-2">
            {countStr.split('').map((digit, i) => (
              <span
                key={`${count}-${i}`}
                className="text-[7rem] md:text-[11rem] lg:text-[13rem] font-serif font-light text-black leading-none tabular-nums"
              >
                {digit}
              </span>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div ref={logoRef} className="logo-wrapper absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="logo-glow absolute inset-0 -z-10 bg-black/5 blur-3xl rounded-full scale-150" />
          <img
            src={logoSrc}
            alt="SW Beauty"
            className="relative h-[180px] md:h-[240px] lg:h-[280px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
