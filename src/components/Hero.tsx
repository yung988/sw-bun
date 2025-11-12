'use client'
import { useIntroCompleteContext } from '@/components/IntroProvider'
import WordReveal from '@/components/animations/WordReveal'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Container from '@/components/ui/Container'

type HeroProps = {
  title: string
  titleItalic: string
  subtitle: string
  trustedText: string
  trustedCount: string
  avatars: string[]
  videos?: string[]
}

export default function Hero({
  title,
  titleItalic,
  subtitle,
  trustedText,
  trustedCount,
  avatars,
  videos = [],
}: HeroProps) {
  const [introComplete] = useIntroCompleteContext()
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoList = useMemo<string[]>(() => (videos?.length ? videos : ['/movies/video-recepce.mp4']), [videos])
  const [_index, _setIndex] = useState(0)
  const [currentSrc, _setCurrentSrc] = useState<string>(videoList[0])
  const [fade, _setFade] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return
    if (introComplete) {
      videoRef.current.src = currentSrc
      videoRef.current.load()
      const playPromise = videoRef.current.play()
      if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [introComplete, currentSrc])

  useLayoutEffect(() => {
    const startHeroIntro = () => {
      if (!sectionRef.current) return
      const ctx = gsap.context(() => {
        const targets = [contentWrapperRef.current, videoWrapperRef.current].filter(Boolean) as HTMLElement[]

        gsap.set(targets, { autoAlpha: 0, y: 48 })
        if (videoWrapperRef.current) gsap.set(videoWrapperRef.current, { scale: 1.05, autoAlpha: 0 })

        const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1 } })
        tl.to(contentWrapperRef.current, { autoAlpha: 1, y: 0 }, 0)
        tl.to(videoWrapperRef.current, { autoAlpha: 1, y: 0, scale: 1 }, '-=0.6')
      }, sectionRef)
      return () => ctx.revert()
    }

    if (introComplete) startHeroIntro()
    window.addEventListener('intro:complete', startHeroIntro)
    return () => window.removeEventListener('intro:complete', startHeroIntro)
  }, [introComplete])

  return (
    <section ref={sectionRef} id="home" className="pt-16 pb-8 md:py-12 lg:py-16">
      <Container>
        {/* Content above video - Okare style */}
        <div ref={contentWrapperRef} className="mb-6 lg:mb-10 opacity-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 xl:gap-16">
            {/* Title group - more compact */}
            <div className="flex-shrink-0">
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light leading-[1.2] tracking-tight text-slate-900">
                <WordReveal stagger={0.06}>{title}</WordReveal>{' '}
                <WordReveal stagger={0.08} className="italic font-serif font-light text-slate-600">
                  {titleItalic}
                </WordReveal>
              </h1>
            </div>

            {/* Subtitle & Badge - closer together */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:gap-6">
              {/* Subtitle */}
              <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-[260px] lg:max-w-[300px]">
                {subtitle}
              </p>

              {/* Trust Badge - Okare style */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white rounded-full shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex-shrink-0">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <div
                      key={avatar}
                      className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 hover:z-10"
                      style={{ zIndex: avatars.length - index }}
                    >
                      <Image src={avatar} alt={`Klientka ${index + 1}`} fill sizes="28px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-medium text-slate-700 whitespace-nowrap">
                  {trustedText} <span className="text-slate-900 font-semibold">{trustedCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video */}
        <div
          ref={videoWrapperRef}
          className="relative w-full aspect-[16/10] lg:aspect-[21/10] overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] bg-slate-100 shadow-2xl border border-slate-200/50 opacity-0"
        >
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/salon/recepce.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {fade && <div className="absolute inset-0 bg-black/20 animate-[fade_0.6s_ease]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </Container>
    </section>
  )
}
