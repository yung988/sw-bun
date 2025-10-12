'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeIn } from './animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type HeroProps = {
  title: string
  titleItalic: string
  subtitle: string
  trustedText: string
  trustedCount: string
  avatars: string[]
}

export default function Hero({ title, titleItalic, subtitle, trustedText, trustedCount, avatars }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const trustedRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Video autoplay
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay was prevented:', error)
      })
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Clean, simple entrance animations
    const ctx = gsap.context(() => {
      // Title - Simple fade up (immediate, no scroll trigger)
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2,
      })

      // Subtitle - Fade up with slight delay
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 0.4,
      })

      // Trusted section - Fade up
      gsap.from(trustedRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 0.6,
      })

      // Video - Scale and fade in
      gsap.from(videoContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.8,
      })

      // Simple parallax on scroll
      // start: "top top" = when TOP of element hits TOP of viewport
      // end: "bottom top" = when BOTTOM of element hits TOP of viewport
      gsap.to(videoContainerRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="Hero"
      className="mx-auto max-w-[1250px] px-6 py-20 md:py-28"
    >
      {/* Top Content - 3 Columns */}
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16 mb-20 lg:mb-24">
        {/* Column 1: Title */}
        <div className="lg:col-span-1">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] tracking-tight text-slate-900"
          >
            {title} <em className="italic font-serif font-normal">{titleItalic}</em>
          </h1>
        </div>

        {/* Column 2: Subtitle */}
        <div className="lg:col-span-1 flex items-center">
          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md"
          >
            {subtitle}
          </p>
        </div>

        {/* Column 3: Trusted */}
        <div className="lg:col-span-1 flex items-center lg:justify-end">
          <div
            ref={trustedRef}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-white shadow-md transition-transform hover:scale-110 hover:z-10"
                >
                  <Image
                    src={avatar}
                    alt={`Zákazník ${index + 1}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-slate-500 leading-tight">{trustedText}</p>
              <p className="text-lg font-semibold text-slate-900">{trustedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Video */}
      <div
        ref={videoContainerRef}
        className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-slate-100 shadow-2xl border border-slate-200/50"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            console.error('Video failed to load:', e)
            e.currentTarget.style.display = 'none'
          }}
          onLoadedData={() => {
            console.log('Video loaded successfully')
          }}
        >
          <source src="/hero_1.mp4" type="video/mp4" />
          Video není podporováno vaším prohlížečem.
        </video>
        {/* Jemný overlay pro lepší kontrast textu, pokud je potřeba */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
