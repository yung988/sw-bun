import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Image from 'next/image'

export default function SabinaSection() {
  return (
    <Section className="relative bg-white luxury-spacing">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/images/team/sabina.jpg"
                alt="Sabina - zakladatelka SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover subtle-hover"
              />
            </div>

            {/* Floating stats - luxury style */}
            <div className="absolute -bottom-10 -right-10 bg-white rounded-lg shadow-lg p-10 max-w-xs">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-serif text-gray-900 mb-2" style={{ color: 'var(--accent)' }}>10+</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wider">let</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-gray-900 mb-2" style={{ color: 'var(--accent)' }}>500+</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wider">klientek</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-gray-900 mb-2" style={{ color: 'var(--accent)' }}>98%</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wider">spokojenost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 leading-tight">
                Jsem <em className="italic font-light">Sabina</em>
              </h3>
              <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                <p>
                  Více než 10 let se věnuji tomu, co mě baví — pomáhat ženám cítit se skvěle. Ne jen vypadat, ale
                  opravdu se <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>cítit krásně a sebevědomě</strong>.
                </p>
                <p>
                  Specializuji se na <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>moderní technologie</strong> — HIFU lifting,
                  Endosphere proti celulitidě, EMS pro budování svalů, kavitaci, kosmetiku i prodlužování vlasů. Ale
                  nejde jen o přístroje. Jde o to, že každá z vás je jiná a potřebuje něco jiného.
                </p>
                <p>
                  Proto vždy začínáme <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>konzultací</strong>. Poslechnu si vás,
                  probereme vaše cíle a společně najdeme cestu, která bude fungovat právě pro vás. Žádné univerzální
                  řešení. Jen péče, která dává smysl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}



