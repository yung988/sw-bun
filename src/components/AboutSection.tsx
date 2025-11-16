import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import { Check } from 'lucide-react'

const reasons = [
  'Luxusní prostředí a profesionální péče',
  'Nejmodernější technologie a prémiové produkty',
  'Individuální přístup ke každému klientovi',
  'Certifikovaná odbornice s mnohaletými zkušenostmi',
  'Komplexní služby pod jednou střechou',
  'Diskrétnost a příjemná atmosféra',
]

export default function AboutSection() {
  return (
    <Section className="relative bg-white luxury-spacing">
      <Container>
        {/* Part 1: Giant Heading */}
        <div className="mb-20 lg:mb-32">
          <h2 className="text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif font-light text-center opacity-10 leading-none select-none">
            O NÁS
          </h2>
        </div>

        {/* Part 2: O SWBEAUTY */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Left - Text */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-8">
              O SWBEAUTY
            </h3>
            <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              <p>
                Vítejte v SWBeauty, vašem luxusním beauty salonu, kde se snoubí nejmodernější technologie
                s péčí o vaši krásu a zdraví. Naše studio bylo založeno s vizí poskytovat ty nejkvalitnější
                služby v oblasti péče o tělo a vlasy v příjemném a elegantním prostředí.
              </p>
              <p>
                Specializujeme se na inovativní procedury jako <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>Endosphere</strong>,
                {' '}<strong className="text-gray-900" style={{ color: 'var(--accent)' }}>HIFU</strong> a profesionální
                prodlužování vlasů. Všechny naše služby jsou prováděny certifikovanými odborníky s mnohaletými zkušenostmi,
                kteří neustále sledují nejnovější trendy a technologie v beauty průmyslu.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/salon/recepce.jpg"
                alt="Recepce SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover subtle-hover"
              />
            </div>
          </div>
        </div>

        {/* Part 3: NAŠE FILOZOFIE */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Left - Image (order-last on mobile to show text first) */}
          <div className="relative order-last lg:order-first">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/salon/kreslomistnostnaprocedury.jpg"
                alt="Místnost na procedury"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover subtle-hover"
              />
            </div>
          </div>

          {/* Right - Text */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-8">
              NAŠE FILOZOFIE
            </h3>
            <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              <p>
                V SWBeauty věříme, že každý klient je jedinečný, a proto přistupujeme ke každému individuálně.
                Naším cílem je nejen zlepšit váš vzhled, ale také posílit vaše sebevědomí a celkovou pohodu.
                Používáme pouze prémiové produkty a nejmodernější technologie, abychom zajistili ty nejlepší výsledky.
              </p>
              <p>
                Klademe důraz na <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>profesionalitu</strong>,
                {' '}<strong className="text-gray-900" style={{ color: 'var(--accent)' }}>diskrétnost</strong> a vytváření příjemné atmosféry,
                kde se budete cítit uvolněně a v péči odborníků, kterým můžete důvěřovat.
              </p>
            </div>
          </div>
        </div>

        {/* Part 4: MAJITELKA SALONU */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Left - Text */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-8">
              MAJITELKA SALONU
            </h3>
            <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              <p>
                Salon SW Beauty založila a vede <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>Sabina</strong>,
                která osobně provádí všechny procedury a stará se o chod celého salonu. Díky jejím mnohaletým zkušenostem
                a neustálému vzdělávání v oblasti nejnovějších kosmetických postupů a technologií můžeme našim klientům
                nabídnout služby té nejvyšší kvality.
              </p>
              <p>
                Sabina se specializuje na pokročilé procedury jako <strong className="text-gray-900" style={{ color: 'var(--accent)' }}>HIFU Facelift</strong>,
                {' '}<strong className="text-gray-900" style={{ color: 'var(--accent)' }}>Endos-roller</strong> a další inovativní ošetření.
                Její přístup ke každému klientovi je vždy individuální a profesionální, s důrazem na dosažení nejlepších možných
                výsledků a maximální spokojenosti.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/team/sabina.jpg"
                alt="Sabina - zakladatelka SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover subtle-hover"
              />
            </div>
          </div>
        </div>

        {/* Part 5: PROČ SI VYBRAT SWBEAUTY */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-10 lg:p-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-10 lg:mb-12 text-center text-gray-800">
            Proč si vybrat SWBEAUTY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check
                  className="w-6 h-6 shrink-0 mt-1"
                  style={{ color: 'var(--accent)' }}
                />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
