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
  const titleGroupRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const trustedRef = useRef<HTMLDivElement>(null)
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

  // 📣 Spuštění hero animace po loaderu
  useLayoutEffect(() => {
    const startHeroIntro = () => {
      if (!sectionRef.current) return
      const ctx = gsap.context(() => {
        const targets = [
          videoWrapperRef.current,
          titleGroupRef.current,
          subtitleRef.current,
          trustedRef.current,
        ].filter(Boolean) as HTMLElement[]

        gsap.set(targets, { autoAlpha: 0, y: 48 })
        if (videoWrapperRef.current) gsap.set(videoWrapperRef.current, { scale: 1.05, autoAlpha: 0 })

        const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1 } })
        if (videoWrapperRef.current) tl.to(videoWrapperRef.current, { autoAlpha: 1, y: 0, scale: 1 }, 0)
        tl.to(titleGroupRef.current, { autoAlpha: 1, y: 0 }, '-=0.6')
        tl.to(subtitleRef.current, { autoAlpha: 1, y: 0 }, '-=0.55')
        tl.to(trustedRef.current, { autoAlpha: 1, y: 0 }, '-=0.5')
      }, sectionRef)
      return () => ctx.revert()
    }

    if (introComplete) startHeroIntro()
    window.addEventListener('intro:complete', startHeroIntro)
    return () => window.removeEventListener('intro:complete', startHeroIntro)
  }, [introComplete])

  return (
    <section ref={sectionRef} id="home" className="py-8 md:py-12 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 mb-8 lg:mb-10">
        <div ref={titleGroupRef} className="lg:col-span-1 opacity-0">
          <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-slate-900 max-w-[420px] md:max-w-[440px] lg:max-w-[460px]">
            <WordReveal stagger={0.06}>{title}</WordReveal>{' '}
            <WordReveal stagger={0.08} className="italic font-serif font-light">
              {titleItalic}
            </WordReveal>
          </h1>
        </div>

        <div ref={subtitleRef} className="lg:col-span-1 flex items-center opacity-0">
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-sm">{subtitle}</p>
        </div>

        <div ref={trustedRef} className="lg:col-span-1 flex items-center lg:justify-end opacity-0">
          <div className="flex items-center gap-4 lg:justify-end">
            <div className="flex space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-white shadow-md transition-transform hover:scale-110 hover:z-10"
                >
                  <Image src={avatar} alt={`Zákazník ${index + 1}`} fill sizes="48px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-slate-600 whitespace-nowrap">
              <span>{trustedText}</span>
              <span className="text-slate-900 font-semibold">{trustedCount}</span>
            </div>
          </div>
        </div>
      </div>

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
