import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getServicesByCategory, getCategoryName } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Všechny služby | SW Beauty',
  description:
    'Kompletní přehled všech služeb SW Beauty - kosmetika, HIFU facelift, budování svalů, endos-roller a další.',
}

export default function AllServicesPage() {
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Všechny služby</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prohlédněte si kompletní nabídku našich procedur a ošetření
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((categoryId) => {
            const services = getServicesByCategory(categoryId)
            const categoryName = getCategoryName(categoryId)

            return (
              <div key={categoryId} className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-gray-200 pb-4">{categoryName}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/sluzby/${service.slug}`}
                      className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 line-clamp-2 flex-1">
                          {service.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                          <p className="text-sm text-gray-500">{service.duration} minut</p>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          Rezervovat →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
