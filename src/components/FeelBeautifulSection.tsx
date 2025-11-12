// FeelBeautifulSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function FeelBeautifulSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLDivElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const textRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            })

            // 1️⃣ Obrázek – parallax (pohybuje se pomaleji)
            tl.to(imgRef.current, { yPercent: -15, ease: 'none' }, 0)

            // 2️⃣ Overlay – fade + scale
            tl.fromTo(
                overlayRef.current,
                { opacity: 0.6, scale: 1 },
                { opacity: 1, scale: 1.05, ease: 'power2.out' },
                0
            )

            // 3️⃣ Texty – stagger fade + slide
            tl.from(
                textRefs.current,
                {
                    yPercent: 30,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: 'power3.out',
                },
                0.2
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative bg-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    {/* Gradient overlay – animovaný */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80
                         origin-center will-change-transform opacity-60"
                    />

                    {/* Background Image – parallax */}
                    <div ref={imgRef} className="absolute inset-0 opacity-50 will-change-transform">
                        <Image
                            src="/images/salon/kreslomistnostnaprocedury.jpg"
                            alt="SW Beauty salon"
                            fill
                            className="object-cover grayscale"
                            priority
                            sizes="100vw"
                        />
                    </div>

                    {/* Content – stagger texty */}
                    <div className="relative z-20 px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
                        <div className="max-w-4xl">
                            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 md:mb-12 leading-[1.1]">
                <span
                    ref={(el) => (textRefs.current[0] = el)}
                    className="inline-block will-change-transform"
                >
                  Cítit se <em className="italic">krásně.</em>
                </span>
                                <br />
                                <span
                                    ref={(el) => (textRefs.current[1] = el)}
                                    className="inline-block will-change-transform"
                                >
                  Cítit se <em className="italic">sebevědomě.</em>
                </span>
                                <br />
                                <span
                                    ref={(el) => (textRefs.current[2] = el)}
                                    className="inline-block will-change-transform"
                                >
                  Cítit se <em className="italic">jako vy.</em>
                </span>
                            </h2>

                            <p
                                ref={(el) => (textRefs.current[3] = el)}
                                className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl will-change-transform"
                            >
                                To je můj cíl. Ne jen ošetření, ale zážitek, který vám vrátí radost z vlastní krásy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}