import Image from 'next/image'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function GallerySection() {
  return (
    <Section className="relative bg-white">
      <Container>
        <div className="mb-20 max-w-3xl">
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-8 leading-tight">
            Prostor pro <em className="italic">váš klid</em>
          </h3>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
            Moderní salon v centru Hodonína, kde se budete cítit příjemně od prvního okamžiku.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden rounded-3xl group">
            <Image
              src="/images/salon/recepce.jpg"
              alt="Vstup do salonu"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 text-white">
              <p className="text-sm opacity-80 mb-3 tracking-wider uppercase">Krok 1</p>
              <p className="text-2xl font-light">Vítáme vás</p>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-rows-2 gap-8">
            <div className="relative overflow-hidden rounded-3xl group">
              <Image
                src="/images/salon/cekarna.jpg"
                alt="Relaxační prostor"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-sm opacity-80 mb-3 tracking-wider uppercase">Krok 2</p>
                <p className="text-2xl font-light">Odpočiňte si</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl group">
              <Image
                src="/images/salon/kreslomistnostnaprocedury.jpg"
                alt="Ošetření"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-sm opacity-80 mb-3 tracking-wider uppercase">Krok 3</p>
                <p className="text-2xl font-light">Užijte si péči</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

