import SectionTitle from '@/components/SectionTitle'
import ServicesLayout from '@/components/ServicesLayout'
import { getServiceBySlug, getCategories, getAllServices } from '@/lib/services'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ kategorie: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategorie } = await params
  const service = await getServiceBySlug(kategorie)

  if (!service) {
    return {
      title: 'Služba nenalezena | SW Beauty Hodonín',
    }
  }

  return {
    title: `${service.name} | SW Beauty Hodonín`,
    description: service.shortDescription || `Objevte naše ${service.name.toLowerCase()} služby - profesionální ošetření s okamžitými výsledky v Hodoníně.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((kategorie) => ({
    kategorie,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { kategorie } = await params
  const service = await getServiceBySlug(kategorie)

  if (!service) {
    notFound()
  }

  // Build left list of services for this page
  const allServices = await getAllServices()
  const hasSubcategories = service.subcategories && service.subcategories.length > 0

  let list: typeof allServices = []
  if (hasSubcategories) {
    // show subcategories of this parent category
    list = service.subcategories
  } else if (service.parentId) {
    // show siblings within the same parent category
    const parent = allServices.find((s) => s.serviceId === service.parentId)
    list = parent?.subcategories ?? []
  } else {
    // fallback – show all top-level services
    list = allServices
  }

  // Ensure the current service is the first item in the list
  const servicesForLayout = [service, ...list.filter((s) => s.serviceId !== service.serviceId)]

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-white">
      <div className="pt-24 md:pt-32 lg:pt-40 px-4 md:px-6 lg:px-8 max-w-[1920px] mx-auto lg:h-full lg:flex lg:flex-col">
        <div className="mb-8 lg:mb-6 flex-shrink-0">
          <SectionTitle
            eyebrow={service.categoryName}
            title={service.name}
            subtitle={service.shortDescription || 'Vyberte službu ze seznamu a prohlédněte si detaily, výhody a ceník.'}
          />
        </div>

        <div className="lg:flex-1 lg:min-h-0">
          <ServicesLayout services={servicesForLayout} />
        </div>
      </div>
    </main>
  )
}
