'use client'
import { useIntroCompleteContext } from '@/components/IntroProvider'
import WordReveal from '@/components/animations/WordReveal'
import gsap from 'gsap'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import Container from '@/components/ui/Container'
import { Quote } from 'lucide-react'

type HeroProps = {
  title: string
  titleItalic: string
  subtitle: string
  testimonialText: string
  testimonialAuthor: string
  heroImage: string
}

export default function Hero({
  title,
  titleItalic,
  subtitle,
  testimonialText,
  testimonialAuthor,
  heroImage,
}: HeroProps) {
  const [introComplete] = useIntroCompleteContext()
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const startHeroIntro = () => {
      if (!sectionRef.current) return
      const ctx = gsap.context(() => {
        const targets = [contentWrapperRef.current, imageWrapperRef.current].filter(Boolean) as HTMLElement[]

        gsap.set(targets, { autoAlpha: 0, y: 48 })
        if (imageWrapperRef.current) gsap.set(imageWrapperRef.current, { scale: 1.05, autoAlpha: 0 })

        const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1 } })
        tl.to(contentWrapperRef.current, { autoAlpha: 1, y: 0 }, 0)
        tl.to(imageWrapperRef.current, { autoAlpha: 1, y: 0, scale: 1 }, '-=0.6')
      }, sectionRef)
      return () => ctx.revert()
    }

    if (introComplete) startHeroIntro()
    window.addEventListener('intro:complete', startHeroIntro)
    return () => window.removeEventListener('intro:complete', startHeroIntro)
  }, [introComplete])

  return (
    <section ref={sectionRef} id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#f8f3f0] relative overflow-hidden">
      {/* Decorative elements - luxury pastel blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#f9f0f2]/30 blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#e8f4f8]/20 blur-3xl z-0 animate-pulse" style={{ animationDelay: '1s' }} />

      <Container>
        <div className="relative z-10">
          {/* Content - luxury style */}
          <div ref={contentWrapperRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 opacity-0">
            {/* Left column - Title and text */}
            <div>
              <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6 text-gray-800">
                <WordReveal stagger={0.06}>{title}</WordReveal>{' '}
                <WordReveal stagger={0.08} className="italic font-serif font-light">
                  {titleItalic}
                </WordReveal>
              </h1>

              <p className="text-lg md:text-xl font-light text-gray-600 mb-8 leading-relaxed">
                {subtitle}
              </p>

              {/* Luxury buttons - Rezervovat termín first */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#kontakt" className="btn-primary text-center">
                  Rezervovat termín
                </a>
                <a href="#sluzby" className="btn-secondary text-center">
                  Prozkoumat služby
                </a>
              </div>
            </div>

            {/* Right column - Hero image with testimonial badge */}
            <div className="relative hidden md:block">
              <div
                ref={imageWrapperRef}
                className="relative rounded-lg overflow-hidden aspect-[4/5] shadow-2xl opacity-0"
              >
                <Image
                  src={heroImage}
                  alt="SW Beauty Salon"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Testimonial Badge - luxury card */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-xs">
                <Quote className="w-8 h-8 text-accent mb-3" />
                <p className="text-sm italic text-gray-700 mb-3 leading-relaxed">
                  {testimonialText}
                </p>
                <p className="text-xs text-gray-600 font-medium">— {testimonialAuthor}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
