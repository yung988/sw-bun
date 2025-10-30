'use client'

import { useIntroCompleteContext } from '@/components/IntroProvider'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { useLayoutEffect, useRef, useState } from 'react'
import '@/styles/loader.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
  CustomEase.create('hop', '0.9, 0, 0.1, 1')
}

const COUNTS = ['00', '27', '65', '98', '99']

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [, setIntroComplete] = useIntroCompleteContext()

  useLayoutEffect(() => {
    if (!isVisible || !containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: 'hop' },
        onComplete: () => {
          setIntroComplete(true)
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            pointerEvents: 'none',
            onComplete: () => setIsVisible(false),
          })
        },
      })

      // 1️⃣ Čísla
      const counts = gsap.utils.toArray<HTMLElement>('.count')
      counts.forEach((count, index) => {
        const digits = count.querySelectorAll('.digit h1')
        tl.to(digits, { y: '0%', duration: 0.9, stagger: 0.06 }, index)
        if (index < counts.length - 1) {
          tl.to(digits, { y: '-100%', duration: 0.9, stagger: 0.06 }, index + 0.8)
        }
      })

      // 2️⃣ Skrýt čísla a spinner
      tl.to('.spinner', { opacity: 0, duration: 0.3 }, '<')
      tl.to('.count', { opacity: 0, duration: 0.5, stagger: 0.05 }, '<')

      // 3️⃣ Logo – S zespodu, W shora
      tl.to('.logo-left', { y: '0%', duration: 1 }, '+=0.2')
      tl.to('.logo-right', { y: '0%', duration: 1 }, '<')

      // 4️⃣ Čára
      tl.to('.divider', { scaleY: 1, duration: 0.9, transformOrigin: 'center top' })
      tl.to('.divider', { opacity: 0, duration: 0.4, delay: 0.2 })

      // 5️⃣ Logo odjede
      tl.to('.logo-left', { y: '-100%', duration: 1 }, '+=0.3')
      tl.to('.logo-right', { y: '100%', duration: 1 }, '<')

      // 6️⃣ Půlky stránky (rozjezd ze středu)
      tl.to('.block-left', {
        y: '-100%',
        duration: 1.2,
        ease: 'power3.inOut',
      })
      tl.to(
        '.block-right',
        {
          y: '100%',
          duration: 1.2,
          ease: 'power3.inOut',
        },
        '<'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isVisible, setIntroComplete])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="loader fixed inset-0 z-[9999] overflow-hidden bg-white text-black"
      aria-hidden="true"
    >
      {/* Overlay – rozdělení na levou a pravou polovinu */}
      <div className="overlay absolute inset-0 flex">
        <div className="block block-left w-1/2 h-full bg-white" />
        <div className="block block-right w-1/2 h-full bg-white" />
      </div>

      {/* Logo */}
      <div
        className="intro-logo absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
        style={{ gap: '-1rem' }}
      >
        <div className="overflow-hidden">
          <div className="logo-left translate-y-full">
            <img src="/s.svg" alt="S" className="h-[200px] md:h-[250px] lg:h-[300px] w-auto object-contain" />
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="logo-right -translate-y-full">
            <img src="/w.svg" alt="W" className="h-[200px] md:h-[250px] lg:h-[300px] w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Čára */}
      <div className="divider absolute left-1/2 top-0 h-full w-px bg-black opacity-100" />

      {/* Spinner */}
      <div className="spinner-container absolute bottom-[10%] left-1/2 -translate-x-1/2">
        <div className="spinner h-12 w-12 rounded-full border border-black border-t-black/20" />
      </div>

      {/* Číselný loading */}
      <div className="counter pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {COUNTS.map((sequence, _i) => (
          <div key={sequence} className="count absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
            {sequence.split('').map((digit, _j) => (
              <div key={digit} className="digit overflow-hidden flex items-center justify-center">
                <h1 className="translate-y-full text-[9rem] font-serif font-light text-black md:text-[13rem] lg:text-[15rem] leading-[1]">
                  {digit}
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
