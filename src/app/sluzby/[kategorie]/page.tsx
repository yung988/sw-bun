import SectionTitle from '@/components/SectionTitle'
import { getCategories, getCategoryName, getServicesByCategory } from '@/lib/services'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ kategorie: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategorie } = await params
  const categoryName = getCategoryName(kategorie)

  return {
    title: `${categoryName} | SW Beauty Hodonín`,
    description: `Objevte naše ${categoryName.toLowerCase()} služby - profesionální ošetření s okamžitými výsledky v Hodoníně.`,
  }
}

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((kategorie) => ({
    kategorie,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { kategorie } = await params
  const services = getServicesByCategory(kategorie)
  const categoryName = getCategoryName(kategorie)

  if (services.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      <div className="mx-auto max-w-[1250px] px-6 py-20">
        <div className="mb-8">
          <Link
            href="/sluzby"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Zpět</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na všechny služby
          </Link>
        </div>

        <SectionTitle
          eyebrow="Kategorie"
          title={categoryName}
          subtitle={`Prohlédněte si všechny ${categoryName.toLowerCase()} služby a vyberte si tu pravou pro vás`}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/sluzby/${kategorie}/${service.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-soft hover:-translate-y-1"
            >
              {service.isPackage && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                    Balíček
                  </span>
                </div>
              )}

              <h3 className="mb-3 text-lg font-medium text-slate-900 group-hover:text-slate-700 transition line-clamp-2 pr-20">
                {service.name}
              </h3>

              <p className="mb-4 text-sm text-slate-600 line-clamp-3">{service.description}</p>

              <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-2xl font-light text-slate-900">{service.price}</p>
                  <p className="text-xs text-slate-500">{service.duration} min</p>
                </div>
                <span className="text-sm font-medium text-slate-900 group-hover:gap-1 inline-flex items-center transition-all">
                  Detail
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Detail</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
