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
    <section id="Hero" className="mx-auto max-w-[1200px] px-6 py-12 lg:py-16">
      {/* Top Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-16 mb-12">
        {/* Left: Title */}
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-slate-900 dark:text-white">
            {title} <em className="italic font-light">{titleItalic}</em>
          </h1>
        </div>

        {/* Right: Subtitle + Trusted */}
        <div className="flex flex-col justify-between gap-6 lg:max-w-md">
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{subtitle}</p>

          {/* Trusted by section */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-slate-900"
                >
                  <Image src={avatar} alt={`Zákazník ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {trustedText} {trustedCount}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Video - Full Width */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero_1.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
