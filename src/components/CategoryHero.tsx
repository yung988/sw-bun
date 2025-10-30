'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type CategoryHeroProps = {
  title: string
  description: string
  heroImage: string
  subheroImages: string[]
}

export default function CategoryHero({ title, description, heroImage, subheroImages }: CategoryHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Parallax effect on hero image
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } })
      tl.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0)
      if (thumbsRef.current) {
        const items = thumbsRef.current.querySelectorAll('.thumb')
        gsap.from(items, { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.5, delay: 0.2 })
      }
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Main Hero Image with Parallax */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="relative h-[120%] w-full">
          <Image src={heroImage} alt={title} fill className="object-cover" sizes="100vw" priority />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex items-end pb-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div ref={contentRef}>
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-white/80">
              <span>Služby</span>
              <span>/</span>
              <span className="text-white">{title}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
              <span className="font-serif italic">{title}</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-12">{description}</p>

            {/* Subhero Images Grid */}
            <div ref={thumbsRef} className="grid grid-cols-3 gap-4 max-w-2xl">
              {subheroImages.slice(0, 3).map((image, index) => (
                <div
                  key={image}
                  className="thumb relative aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${title} detail ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <title>Scroll down</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
