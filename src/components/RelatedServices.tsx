import type { MainService } from '@/lib/services'
import Link from 'next/link'
import Image from 'next/image'

type RelatedServicesProps = {
  currentService: MainService
  allServices: MainService[]
  maxItems?: number
}

export default function RelatedServices({ currentService, allServices, maxItems = 3 }: RelatedServicesProps) {
  // Filter out current service and get other services
  const relatedServices = allServices
    .filter((service) => service.serviceId !== currentService.serviceId)
    .slice(0, maxItems)

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Další služby</h2>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Objevte další naše služby, které by vás mohly zajímat.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedServices.map((service) => {
          const serviceImage = service.images && service.images.length > 0 ? service.images[0] : service.image

          return (
            <Link
              key={service.serviceId}
              href={`/sluzby/${service.slug}`}
              className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300"
            >
              {/* Image */}
              {serviceImage && (
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={serviceImage}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                  {service.name}
                </h3>
                {service.shortDescription && (
                  <p className="text-base text-slate-600 mb-6 leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                )}

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:gap-3 transition-all">
                  Zjistit více
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Šipka</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* View all services link */}
      <div className="mt-8 pt-8 border-t border-slate-200 text-center">
        <Link
          href="/sluzby"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm hover:shadow-md"
        >
          Zobrazit všechny služby
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Šipka</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}


