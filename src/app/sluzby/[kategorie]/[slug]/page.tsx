import ImageGallery from '@/components/ImageGallery'
import ServiceBookingButton from '@/components/ServiceBookingButton'
import ServiceViewTracker from '@/components/ServiceViewTracker'
import { formatPrice, getAllServices, getServiceBySlug, getServicesByCategory } from '@/lib/services'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({
    kategorie: service.categoryId,
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: { params: Promise<{ kategorie: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Služba nenalezena',
    }
  }

  return {
    title: `${service.name} | SW Beauty`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ kategorie: string; slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const _relatedServices = (await getServicesByCategory(service.categoryId))
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-white pb-24 pt-20">
      {/* Analytics: page view */}
      <ServiceViewTracker slug={service.slug} categoryId={service.categoryId} price={service.price} />
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-t border-slate-200/70 hidden lg:block">
        <div className="mx-auto max-w-[1250px] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">{service.name}</p>
            <p className="text-lg font-medium text-slate-900">{formatPrice(service.price)}</p>
          </div>
          <ServiceBookingButton
            service={{
              id: service.slug,
              name: service.name,
              price: service.price,
              duration: service.duration,
            }}
            className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Rezervovat termín
          </ServiceBookingButton>
        </div>
      </div>

      <div className="mx-auto max-w-[1250px] px-6 py-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/sluzby" className="hover:text-slate-900 transition">
            Služby
          </Link>
          <span>/</span>
          <Link href={`/sluzby/${service.categoryId}`} className="hover:text-slate-900 transition">
            {service.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900">{service.name}</span>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
          {/* Left - Content */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {service.category}
                </span>
                {service.isPackage && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    Balíček se slevou
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-4">{service.name}</h1>
              {service.shortDescription && <p className="text-lg text-slate-600">{service.shortDescription}</p>}
              {service.image && (
                <div className="mt-6">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Product Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <div className="mb-2 text-sm font-medium text-slate-600">Cena</div>
                <div className="text-3xl font-bold text-slate-900">{formatPrice(service.price)}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <div className="mb-2 text-sm font-medium text-slate-600">Délka ošetření</div>
                <div className="text-3xl font-bold text-slate-900">{service.duration} min</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <div className="mb-2 text-sm font-medium text-slate-600">Počet sezení</div>
                <div className="text-3xl font-bold text-slate-900">{service.sessions}</div>
              </div>
            </div>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Benefity</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.slice(0, 6).map((b, _i) => (
                    <li key={b} className="flex items-start gap-3 text-slate-700">
                      <svg
                        className="h-5 w-5 text-emerald-600 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>Benefit</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mini Gallery */}
            {service.images && service.images.length > 1 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Galerie</h3>
                <ImageGallery
                  images={service.images.slice(0, 6).map((src) => ({ src, alt: service.name }))}
                  columns={3}
                />
              </div>
            )}

            {/* Category Services CTA */}
            <div className="mt-12 p-6 rounded-2xl border border-slate-200 bg-slate-50">
              <h2 className="text-xl font-medium text-slate-900 mb-3">Další služby v kategorii {service.category}</h2>
              <p className="text-slate-600 mb-4">
                Prohlédněte si všechny služby v této kategorii nebo použijte vyhledávání pro nalezení podobných
                ošetření.
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/cenik?category=${service.categoryId}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Prohlédnout kategorii
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Prohlédnout kategorii</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/cenik"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Všechny služby
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Všechny služby</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
              <h3 className="text-xl font-medium text-slate-900 mb-6">Rezervace</h3>

              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Okamžité potvrzení</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Okamžité potvrzení
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Flexibilní storno do 24h</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flexibilní storno do 24h
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Profesionální péče</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Profesionální péče
                </div>
              </div>

              <ServiceBookingButton
                service={{
                  id: service.slug,
                  name: service.name,
                  price: service.price,
                  duration: service.duration,
                }}
                className="block w-full rounded-full bg-slate-900 px-6 py-4 text-center text-sm font-medium text-white transition hover:bg-slate-800 mb-3"
              >
                Rezervovat termín
              </ServiceBookingButton>

              <Link
                href="/#kontakt"
                className="block w-full rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Mám dotaz
              </Link>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Důvěřuje nám</span>
                  <span className="font-medium text-slate-900">500+ klientů</span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} className="h-4 w-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                      <title>Hvězdička hodnocení</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-slate-600">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
