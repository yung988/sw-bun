// ContactSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactData = [
    { icon: MapPin, label: 'Adresa', value: 'Masarykovo náměstí 59, 695 01 Hodonín' },
    { icon: Phone, label: 'Telefon', value: '+420 773 577 899', href: 'tel:+420773577899' },
    { icon: Mail, label: 'E-mail', value: 'info@swbeauty.cz', href: 'mailto:info@swbeauty.cz' },
]

const opening = [
    { days: 'Pondělí – Pátek', time: '9:00 – 20:00' },
    { days: 'Sobota', time: '10:00 – 18:00' },
    { days: 'Neděle', time: 'zavřeno' },
]

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<HTMLDivElement | null>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const btnRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    end: 'bottom 50%',
                    scrub: 1,
                },
            })

            // 1️⃣ Mapa – jemný parallax
            tl.to(mapRef.current, { yPercent: -8, ease: 'sine.out' }, 0)

            // 2️⃣ Karty – jemný stagger fade + slide
            tl.from(
                cardRefs.current,
                {
                    yPercent: 20,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 1,
                    ease: 'power2.out',
                },
                0.2
            )

            // 3️⃣ Tlačítka – jemný fade + scale
            tl.from(btnRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.3')
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Mapa – jemný parallax */}
                <div
                    ref={mapRef}
                    className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 will-change-transform"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.6507768!2d17.1256!3d48.8489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUwJzU2LjAiTiAxN8KwMDczMi4yIkU!5e0!3m2!1sen!2scz!4v1234567890"
                        className="w-full h-80 lg:h-full min-h-[20rem] grayscale"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* Kontakty – jemný stagger */}
                <div className="space-y-8">
                    <div className="space-y-6">
                        {contactData.map((item, i) => (
                            <div
                                key={item.label}
                                ref={(el) => (cardRefs.current[i] = el)}
                                className="flex items-start gap-4"
                            >
                                <item.icon className="w-5 h-5 text-slate-400 mt-1" />
                                <div>
                                    <p className="text-sm text-slate-500">{item.label}</p>
                                    {item.href ? (
                                        <a href={item.href} className="text-slate-900 hover:text-black">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-slate-900">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Otevíračka */}
                    <div
                        ref={(el) => (cardRefs.current[3] = el)}
                        className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-5 h-5 text-slate-600" />
                            <h3 className="text-slate-900 font-medium">Otevírací doba</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            {opening.map((o) => (
                                <div key={o.days} className="flex justify-between">
                                    <span className="text-slate-600">{o.days}</span>
                                    <span className="text-slate-900 font-medium">{o.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tlačítka – jemný fade + scale */}
                    <div ref={btnRef} className="flex gap-4 pt-2">
                        <a
                            href="/rezervace"
                            className="grow inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black active:scale-95 transition"
                        >
                            Rezervovat
                        </a>
                        <a
                            href="/poukazy"
                            className="grow inline-flex items-center justify-center border-2 border-slate-200 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 transition"
                        >
                            Poukaz
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}