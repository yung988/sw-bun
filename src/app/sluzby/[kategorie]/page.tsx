// app/sluzby/[kategorie]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import ImageGallery from '@/components/ImageGallery'
import SectionTitle from '@/components/SectionTitle'
import SubcategoryTOC from '@/components/SubcategoryTOC'
import TrackedLink from '@/components/TrackedLink'
import CategoryClient from './_client'
import { getCategoryMosaicServer } from '@/lib/server/images'
import {
  formatPrice,
  getCategories,
  getCategoryName,
  getServicesByCategory,
  getServicesBySubcategory,
  getSubcategoriesByCategory,
} from '@/lib/services'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ kategorie: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategorie } = await params
  const categoryName = await getCategoryName(kategorie)
  return {
    title: `${categoryName} | SW Beauty Hodonín`,
    description: `Objevte naše ${categoryName.toLowerCase()} – profesionální ošetření s viditelnými výsledky v Hodoníně.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((kategorie) => ({ kategorie }))
}

export default async function CategoryPage({ params }: Props) {
  const { kategorie } = await params
  const services = await getServicesByCategory(kategorie)
  const categoryName = await getCategoryName(kategorie)
  if (services.length === 0) notFound()

  const subcategories = await getSubcategoriesByCategory(kategorie)
  const lists = await Promise.all(subcategories.map((s) => getServicesBySubcategory(kategorie, s.id)))
  const fallbackMosaic = await getCategoryMosaicServer(kategorie)

  return (
    <CategoryClient>
      <main className="min-h-screen bg-white pb-24 pt-28 md:pt-36 lg:pt-40">
        <div className="mx-auto max-w-[1250px] px-6">
          {/* Zpět */}
          <div data-reveal className="mb-6">
            <Link
              href="/sluzby"
              className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 transition"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zpět na všechny služby
            </Link>
          </div>

          {/* Header */}
          <div data-reveal>
            <SectionTitle
              eyebrow="Kategorie"
              title={categoryName}
              subtitle={`Prohlédněte si všechny ${categoryName.toLowerCase()} a vyberte si tu pravou pro vás.`}
            />
          </div>

          {/* Mobilní pills pro subkategorie */}
          {subcategories.length > 0 && (
            <nav
              data-reveal
              className="sticky top-16 z-10 mt-8 -mx-6 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 py-3 border-b border-slate-200 lg:hidden"
            >
              <ul className="flex gap-2 overflow-x-auto scrollbar-hide">
                {subcategories.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-slate-900 hover:text-slate-900 transition"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Layout: TOC + obsah */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[280px,1fr]">
            {/* TOC (desktop) */}
            {subcategories.length > 0 && (
              <aside data-reveal className="hidden lg:block">
                <div className="sticky top-24 rounded-[1.5rem] border border-slate-200 bg-white p-6">
                  <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">Podkategorie</p>
                  <SubcategoryTOC subcategories={subcategories} />
                </div>
              </aside>
            )}

            {/* Obsah */}
            <div className="space-y-16">
              {subcategories.map((s, idx) => {
                const group = lists[idx] || []
                // Mozaika (mood) – dynamicky z obrázků služeb, jinak fallback
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
                    <div data-reveal className="mb-6">
                      <h2 className="text-2xl font-light text-slate-900">{s.name}</h2>
                      {s.description && <p className="mt-1 text-slate-600">{s.description}</p>}
                    </div>

                    {gallery && gallery.length > 0 && (
                      <div data-reveal data-parallax className="mb-6">
                        <ImageGallery images={gallery.map((src) => ({ src, alt: s.name }))} columns={3} />
                      </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {group.map((service) => (
                        <TrackedLink
                          data-reveal
                          key={service.slug}
                          href={`/sluzby/${kategorie}/${service.slug}`}
                          event="service_click"
                          data={{ from: 'category', category_id: kategorie, slug: service.slug }}
                          className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-900"
                        >
                          {service.isPackage && (
                            <span className="absolute right-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                              Balíček
                            </span>
                          )}

                          <div className="mb-3 flex items-start gap-3">
                            {service.image && (
                              <img
                                src={service.image}
                                alt={service.name}
                                className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="line-clamp-2 text-lg font-medium text-slate-900 transition group-hover:text-slate-700">
                                {service.name}
                              </h3>
                              {service.shortDescription && (
                                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{service.shortDescription}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                            <div>
                              <p className="text-2xl font-semibold text-slate-900">{formatPrice(service.price)}</p>
                              <p className="text-xs text-slate-500">
                                {service.duration ? `${service.duration} min` : null}
                                {service.duration && service.sessions ? ' • ' : null}
                                {service.sessions ?? null}
                              </p>
                            </div>
                            <span className="inline-flex items-center text-sm font-medium text-slate-900 transition-all group-hover:gap-1">
                              Detail
                              <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden
                              >
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
    </CategoryClient>
  )
}
