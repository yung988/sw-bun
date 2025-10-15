import Image from 'next/image'
import { Heart } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function AboutUsSection() {
  return (
    <Section id="o-nas" className="relative bg-white">
      <Container>
        {/* Hero Statement */}
        <div className="relative min-h-[80vh] overflow-hidden rounded-3xl mb-32 md:mb-48">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

          {/* Background Image */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/images/salon/kreslomistnostnaprocedury.jpg"
              alt="SW Beauty salon"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 flex items-center min-h-[80vh] px-10 md:px-20 lg:px-24 py-24 md:py-32">
            <div className="max-w-4xl">
              <div className="text-white/60 text-sm mb-10 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>O nás</span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white mb-12 leading-[1.1]">
                <span style={{ display: 'inline-block' }}>
                  Cítit se <em className="italic">krásně.</em>
                </span>
                <br />
                <span style={{ display: 'inline-block' }}>
                  Cítit se <em className="italic">sebevědomě.</em>
                </span>
                <br />
                <span style={{ display: 'inline-block' }}>
                  Cítit se <em className="italic">jako vy.</em>
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                To je můj cíl. Ne jen ošetření, ale zážitek, který vám vrátí radost z vlastní krásy.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-32 md:mb-48">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/team/sabina.jpg"
                alt="Sabina - zakladatelka SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-10 -right-10 bg-white rounded-3xl shadow-2xl p-10 max-w-xs">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-light text-slate-900 mb-2">10+</div>
                  <div className="text-xs text-slate-600">let</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-slate-900 mb-2">500+</div>
                  <div className="text-xs text-slate-600">klientek</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-slate-900 mb-2">98%</div>
                  <div className="text-xs text-slate-600">spokojenost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-tight">
                Jsem <em className="italic">Sabina</em>
              </h3>
              <div className="space-y-8 text-lg md:text-xl text-slate-600 leading-relaxed">
                <p>
                  Více než 10 let se věnuji tomu, co mě baví — pomáhat ženám cítit se skvěle. Ne jen vypadat, ale opravdu se <strong className="text-slate-900">cítit krásně a sebevědomě</strong>.
                </p>
                <p>
                  Specializuji se na <strong className="text-slate-900">moderní technologie</strong> — HIFU lifting, Endosphere proti celulitidě, EMS pro budování svalů, kavitaci, kosmetiku i prodlužování vlasů. Ale nejde jen o přístroje. Jde o to, že každá z vás je jiná a potřebuje něco jiného.
                </p>
                <p>
                  Proto vždy začínáme <strong className="text-slate-900">konzultací</strong>. Poslechnu si vás, probereme vaše cíle a společně najdeme cestu, která bude fungovat právě pro vás. Žádné univerzální řešení. Jen péče, která dává smysl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

