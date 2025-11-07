import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { getCategoryCoverServer } from '@/lib/server/images'
import Image from 'next/image'
import Link from 'next/link'

type Service = {
  number: number
  title: string
  description: string
  image: string
  href: string
}

async function buildServices(): Promise<Service[]> {
  return [
    {
      number: 1,
      title: 'HIFU Facelift',
      description: 'Neinvazivní lifting obličeje pomocí ultrazvuku. Viditelné výsledky již po prvním ošetření.',
      image: await getCategoryCoverServer('hifu'),
      href: '/sluzby/hifu',
    },
    {
      number: 2,
      title: 'Endosphere',
      description: 'Revoluční technologie pro formování postavy a redukci celulitidy.',
      image: await getCategoryCoverServer('endosphere'),
      href: '/sluzby/endosphere',
    },
    {
      number: 3,
      title: 'Kosmetické ošetření',
      description: 'Profesionální péče o pleť přizpůsobená vašim potřebám.',
      image: await getCategoryCoverServer('kosmetika'),
      href: '/sluzby/kosmetika',
    },
    {
      number: 4,
      title: 'Budování svalů (EMS)',
      description: 'Efektivní elektrostimulace pro posílení a formování.',
      image: await getCategoryCoverServer('budovani-svalu'),
      href: '/sluzby/budovani-svalu',
    },
  ]
}

export default async function HorizontalServicesSection() {
  const services = await buildServices()
  return (
    <Section className="relative bg-slate-50 overflow-hidden">
      <Container className="mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-slate-900">
          Naše <em className="italic font-serif font-light">služby</em>
        </h2>
      </Container>

      {/* Apple-style horizontal scroller */}
      <div className="flex gap-6 px-6 overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
        {services.map((service) => (
          <Link
            key={service.number}
            href={service.href}
            className="service-card block w-[380px] md:w-[480px] shrink-0 snap-center group active:scale-[0.98] transition-transform duration-200"
          >
            <div className="relative h-[580px] bg-white rounded-[28px] overflow-hidden border border-slate-200/60 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:border-slate-300/80">
              {/* Number badge - Apple style */}
              <div className="absolute top-8 left-8 z-10">
                <div className="text-[5rem] font-extralight text-white/95 tabular-nums tracking-tight drop-shadow-lg">{service.number}</div>
              </div>

              {/* Image */}
              <div className="relative h-[340px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 380px, 480px"
                />
                {/* Gradient overlay - softer */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-white/5" />
              </div>

              {/* Content - Apple style */}
              <div className="p-8 flex flex-col justify-between h-[240px]">
                <div>
                  <h3 className="text-[2rem] font-normal tracking-tight text-slate-900 mb-3 transition-colors duration-300 group-hover:text-slate-700">
                    {service.title}
                  </h3>
                  <p className="text-[0.9375rem] text-slate-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Arrow indicator - Apple style */}
                <div className="flex items-center text-[0.8125rem] font-medium text-slate-900 transition-all duration-300 group-hover:gap-1">
                  <span>Zjistit více</span>
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <title>Zjistit více</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Spacer pro poslední kartu */}
        <div className="w-2 shrink-0" />
      </div>
    </Section>
  )
}
