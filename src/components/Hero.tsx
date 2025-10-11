'use client'
import Image from 'next/image'

type HeroProps = {
  title: string
  titleItalic: string
  subtitle: string
  trustedText: string
  trustedCount: string
  avatars: string[]
}

export default function Hero({ title, titleItalic, subtitle, trustedText, trustedCount, avatars }: HeroProps) {
  return (
    <section id="Hero" className="mx-auto max-w-[1250px] px-6 py-16 lg:py-24">
      {/* Top Content - 3 Columns */}
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 mb-16 lg:mb-20">
        {/* Column 1: Title */}
        <div className="lg:col-span-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-slate-900">
            {title} <em className="italic font-serif font-normal">{titleItalic}</em>
          </h1>
        </div>

        {/* Column 2: Subtitle */}
        <div className="lg:col-span-1 flex items-center">
          <p className="text-base md:text-lg text-slate-600  leading-relaxed max-w-md">{subtitle}</p>
        </div>

        {/* Column 3: Trusted */}
        <div className="lg:col-span-1 flex items-center lg:justify-end">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-white  shadow-md transition-transform hover:scale-110 hover:z-10"
                >
                  <Image src={avatar} alt={`Zákazník ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-slate-500  leading-tight">{trustedText}</p>
              <p className="text-lg font-semibold text-slate-900">{trustedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Video - Full Width */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-slate-100  shadow-2xl border border-slate-200/50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        >
          <source src="/hero_1.mp4" type="video/mp4" />
          Video není dostupné
        </video>
        {/* Jemný overlay pro lepší kontrast textu, pokud je potřeba */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
