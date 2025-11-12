import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { getCategoryCoverServer } from '@/lib/server/images'
import Link from 'next/link'
import Carousel from './Carousel'
import SectionTitle from './SectionTitle'
import ServiceCard from './ServiceCard'

type ServicesSectionProps = {
  categories: {
    id: string
    name: string
    description: string
    priceRange: string
    slug: string
    serviceCount: number
  }[]
}

export default async function ServicesSection({ categories }: ServicesSectionProps) {
  // Resolve cover image for each category from existing files
  const imagesByCategory = new Map<string, string>()
  for (const c of categories) {
    imagesByCategory.set(c.id, await getCategoryCoverServer(c.id))
  }

  return (
    <Section id="sluzby">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16">
          <SectionTitle
            center={false}
            title={
              <>
                Naše <em className="italic">služby</em>
              </>
            }
          />

          <Link
            href="/sluzby"
            className="rounded-xl border-2 border-slate-200 px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm hover:shadow-md"
          >
            Všechny služby
          </Link>
        </div>

        <div>
          <Carousel auto autoSpeed={30}>
            {categories.map((category) => {
              const image = imagesByCategory.get(category.id) as string

              return (
                <div key={category.id} className="w-[320px] shrink-0 snap-start">
                  <ServiceCard
                    title={category.name}
                    description={category.description}
                    price={category.priceRange}
                    category={`${category.serviceCount} služeb`}
                    href={`/sluzby/${category.slug}`}
                    image={image}
                    compact={true}
                  />
                </div>
              )
            })}
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}
