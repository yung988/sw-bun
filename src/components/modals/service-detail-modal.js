// Service detail modal is dynamically created by modal-manager.js
// This file exports a function to generate the modal HTML

import { getServicesData, getPricesData, getImageUrl } from '../../data/csv-parser'

export function createServiceDetailModal(serviceId) {
  const servicesData = getServicesData()
  const pricesData = getPricesData()

  const service = servicesData.find(s => s.service_id === serviceId)
  if (!service) return ''

  const benefits = service.benefits.split(',').filter(b => b.trim())
  const indications = service.indications.split(',').filter(i => i.trim())
  const contraindications = service.contraindications.split(',').filter(c => c.trim())
  const images = service.image.split(';').filter(img => img.trim())

  const servicePrices = pricesData.filter(p => p.service_id === serviceId)

  return `
    <div id="serviceDetailModal" class="fixed inset-0 z-[80] flex items-center justify-center p-4" onclick="closeServiceDetail()">
      <div class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>

      <div class="relative bg-white w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col" onclick="event.stopPropagation()">
        <button onclick="closeServiceDetail()" class="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <div class="overflow-y-auto flex-1" data-lenis-prevent>
          <div class="w-full h-64 md:h-96 bg-stone-100 relative overflow-hidden">
            ${images.length > 0 ? `
              <img src="${getImageUrl(images[0])}" alt="${service.category_name}" class="w-full h-full object-cover">
            ` : ''}
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
              <h2 class="text-4xl md:text-5xl font-cormorant text-white font-medium">${service.category_name}</h2>
            </div>
          </div>

          <div class="p-8 md:p-12 space-y-8">
            <div>
              <p class="text-xl text-stone-600 font-light font-geist italic">${service.short_description}</p>
            </div>

            <div>
              <h3 class="text-2xl font-cormorant text-stone-900 mb-4">O ošetření</h3>
              <p class="text-stone-600 font-light font-geist leading-relaxed">${service.full_description}</p>
            </div>

            ${benefits.length > 0 ? `
              <div>
                <h3 class="text-2xl font-cormorant text-stone-900 mb-4">Přínosy</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${benefits.map(b => `
                    <li class="flex items-start gap-2 text-stone-600 font-geist">
                      <svg class="w-5 h-5 text-stone-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>${b.trim()}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}

            ${servicePrices.length > 0 ? `
              <div>
                <h3 class="text-2xl font-cormorant text-stone-900 mb-4">Ceník</h3>
                <div class="space-y-3">
                  ${servicePrices.map(price => `
                    <div class="flex justify-between items-center gap-4 border-b border-stone-100 pb-3">
                      <div class="flex-1">
                        <span class="font-geist text-stone-900">${price.name}</span>
                        ${price.duration_in_minutes ? `<span class="text-sm text-stone-400 ml-2">(${price.duration_in_minutes} min)</span>` : ''}
                      </div>
                      <span class="font-geist font-medium text-stone-900">${price.price_in_czk} Kč</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="pt-6">
              <button onclick="closeServiceDetail(); openBookingModal();" class="w-full bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors font-geist text-sm uppercase tracking-widest">
                Rezervovat termín
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
