'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import OpenVoucherButton from './OpenVoucherButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function VoucherCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container - Simple scale + fade entrance
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Icon - Bounce entrance
      gsap.from(iconRef.current, {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Title - Slide from left
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -60,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Text - Fade + slide
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // List items - Stagger from bottom
      const listItems = listRef.current?.querySelectorAll('li')
      if (listItems) {
        listItems.forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.6 + index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        })
      }

      // Button - Bounce entrance
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 1,
        ease: 'elastic.out(1, 0.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Image - Slide from right
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return
    
    const button = buttonRef.current.querySelector('button')
    if (!button) return
    
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    
    const button = buttonRef.current.querySelector('button')
    if (!button) return
    
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <section 
      ref={sectionRef}
      id="poukazy" 
      className="mx-auto max-w-[1250px] px-6 py-16 md:py-24"
    >
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-12 md:p-16"
      >
        <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div 
              ref={iconRef}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border-2 border-slate-200"
            >
              <svg className="h-8 w-8 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Dárek</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>

            <h2 
              ref={titleRef}
              className="font-display text-4xl md:text-5xl font-light text-slate-900 mb-6"
            >
              Dárkový poukaz <em className="italic">na míru</em>
            </h2>

            <p 
              ref={textRef}
              className="text-base text-slate-600 leading-relaxed mb-8"
            >
              Darujte zážitek krásy a relaxace. Vyberte konkrétní službu nebo hodnotu poukazu — ideální dárek pro každou příležitost.
            </p>

            <ul ref={listRef} className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-base text-slate-700">
                <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Potvrzeno</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Platnost 12 měsíců
              </li>
              <li className="flex items-center gap-3 text-base text-slate-700">
                <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Potvrzeno</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Elegantní provedení s osobním věnováním
              </li>
              <li className="flex items-center gap-3 text-base text-slate-700">
                <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Potvrzeno</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Možnost výběru konkrétní služby nebo hodnoty
              </li>
            </ul>

            <div 
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <OpenVoucherButton className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800">
                Objednat dárkový poukaz
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Šipka</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </OpenVoucherButton>
            </div>
          </div>

          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <Image
                src="/images/poukaz.png"
                alt="Dárkový poukaz SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

