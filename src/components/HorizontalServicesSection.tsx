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
      <Container className="mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900">
          Naše <em className="italic font-serif">služby</em>
        </h2>
      </Container>

      {/* Horizontal scroller */}
      <div className="flex gap-8 px-6 overflow-x-auto">
        {services.map((service) => (
          <Link key={service.number} href={service.href} className="service-card block w-[400px] md:w-[500px] shrink-0">
            <div className="group relative h-[600px] bg-white rounded-3xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:border-slate-300">
              {/* Number badge */}
              <div className="absolute top-8 left-8 z-10">
                <div className="text-7xl font-light text-white/90 tabular-nums">{service.number}</div>
              </div>

              {/* Image */}
              <div className="relative h-[350px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 400px, 500px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between h-[250px]">
                <div>
                  <h3 className="text-3xl font-semibold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center text-sm font-medium text-slate-900 group-hover:translate-x-2 transition-transform duration-300">
                  <span>Zjistit v\u00edce</span>
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Zjistit více</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Spacer for smooth end */}
        <div className="w-6 shrink-0" />
      </div>
    </Section>
  )
}
