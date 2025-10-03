import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServices } from '@/lib/services'
import BookingForm from '@/components/BookingForm'

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{service.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{service.name}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Cena</span>
                  <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Délka procedury</span>
                  <span className="text-lg font-semibold text-gray-900">{service.duration} minut</span>
                </div>
                {service.sessions && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Počet sezení</span>
                    <span className="text-lg font-semibold text-gray-900">{service.sessions}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">O proceduře</h2>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Rezervace</h2>
              <BookingForm
                preselectedService={{
                  id: service.slug,
                  name: service.name,
                  price: service.price,
                  duration: service.duration,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
