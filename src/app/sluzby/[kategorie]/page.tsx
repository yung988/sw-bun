import ImageGallery from '@/components/ImageGallery'
import SectionTitle from '@/components/SectionTitle'
import SubcategoryTOC from '@/components/SubcategoryTOC'
import TrackedLink from '@/components/TrackedLink'
import { getCategoryMosaicServer } from '@/lib/server/images'
import {
  formatPrice,
  getCategories,
  getCategoryName,
  getServicesByCategory,
  getServicesBySubcategory,
  getSubcategoriesByCategory,
} from '@/lib/services'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ kategorie: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategorie } = await params
  const categoryName = await getCategoryName(kategorie)

  return {
    title: `${categoryName} | SW Beauty Hodonín`,
    description: `Objevte naše ${categoryName.toLowerCase()} služby - profesionální ošetření s okamžitými výsledky v Hodoníně.`,
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
  const services = await getServicesByCategory(kategorie)
  const categoryName = await getCategoryName(kategorie)

  if (services.length === 0) {
    notFound()
  }

  // Subkategorie a jejich služby
  const subcategories = await getSubcategoriesByCategory(kategorie)
  const lists = await Promise.all(subcategories.map((s) => getServicesBySubcategory(kategorie, s.id)))
  const fallbackMosaic = await getCategoryMosaicServer(kategorie)

  return (
    <main className="min-h-screen bg-white pb-24 pt-32 md:pt-40 lg:pt-44">
      <div className="mx-auto max-w-[1250px] px-6 py-16 md:py-24 lg:py-28">
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

        <div className="mt-16 grid gap-12 lg:grid-cols-[280px,1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">Podkategorie</p>
              <SubcategoryTOC subcategories={subcategories} />
            </div>
          </aside>

          {/* Content by subcategory */}
          <div className="space-y-16">
            {subcategories.map((s, idx) => {
              const group = lists[idx] || []
              // Build a small mosaic from services or category defaults
              const gallerySources = Array.from(
                new Set(
                  group
                    .flatMap((svc) => (svc.images?.length ? svc.images : [svc.image]))
                    .filter(Boolean)
                    .slice(0, 6)
                )
              )
              const gallery = (gallerySources.length ? gallerySources : fallbackMosaic).slice(0, 3)

              return (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-slate-900">{s.name}</h2>
                    {s.description && <p className="text-slate-600 mt-1">{s.description}</p>}
                  </div>

                  {gallery && gallery.length > 0 && (
                    <div className="mb-6">
                      <ImageGallery images={gallery.map((src) => ({ src, alt: s.name }))} columns={3} />
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.map((service) => (
                      <TrackedLink
                        key={service.slug}
                        href={`/sluzby/${kategorie}/${service.slug}`}
                        event="service_click"
                        data={{ from: 'category', category_id: kategorie, slug: service.slug }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-soft hover:-translate-y-1"
                      >
                        {service.isPackage && (
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                              Balíček
                            </span>
                          </div>
                        )}

                        <div className="mb-3 flex items-start gap-3">
                          {service.image && (
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-slate-900 group-hover:text-slate-700 transition line-clamp-2">
                              {service.name}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-2 mt-1">{service.shortDescription}</p>
                          </div>
                        </div>

                        <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                          <div>
                            <p className="text-2xl font-semibold text-slate-900">{formatPrice(service.price)}</p>
                            <p className="text-xs text-slate-500">
                              {service.duration ? `${service.duration} min` : null}
                              {service.duration && service.sessions ? ' • ' : null}
                              {service.sessions ? service.sessions : null}
                            </p>
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
                      </TrackedLink>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
