import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'
import Image from 'next/image'

// Data služeb
const services = [
  {
    id: 'hifu-facelift',
    name: 'HIFU Facelift',
    slug: 'hifu-facelift',
    image: '/images/hifu/hifu-oblicej.jpeg',
  },
  {
    id: 'endos',
    name: 'Endos-roller',
    slug: 'endos',
    image: '/images/endos/endos-1.jpeg',
  },
  {
    id: 'ems',
    name: 'Budování svalů',
    slug: 'ems',
    image: '/images/ems/budovani-svalu-1.jpeg',
  },
  {
    id: 'kavitace',
    name: 'Kavitace',
    slug: 'kavitace',
    image: '/images/kavitace/kavitace-1.jpeg',
  },
  {
    id: 'lpg',
    name: 'LPG endermologie',
    slug: 'lpg',
    image: '/images/lpg/lpg-1.jpg',
  },
  {
    id: 'kosmetika',
    name: 'Kosmetika',
    slug: 'kosmetika',
    image: '/images/kosmetika/hydratational-1.jpg',
  },
  {
    id: 'kosmetika-osetreni',
    name: 'Klasická kosmetika',
    slug: 'kosmetika-osetreni',
    image: '/images/kosmetika/hydratational-14.jpg',
  },
  {
    id: 'dermapen',
    name: 'Dermapen',
    slug: 'dermapen',
    image: '/images/kosmetika/hydratational-15.jpg',
  },
  {
    id: 'oboci-a-rasy',
    name: 'Obočí a řasy',
    slug: 'oboci-a-rasy',
    image: '/images/kosmetika/rasy4.jpg',
  },
]

export default function ScrollGalleryCSS() {
  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Naše <em className="italic">služby</em>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Objevte naše profesionální kosmetické služby a moderní technologie pro vaši krásu a pohodu.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/sluzby/${service.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg leading-tight">{service.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
