import { getServicesData, getImageUrl } from '../../data/csv-parser'

export function renderServices() {
  const services = getServicesData()

  return `
    <section id="sluzby" class="relative bg-white">
      <div class="hidden lg:flex flex-col lg:flex-row">
        <!-- Levá strana - text -->
        <div class="w-full lg:w-1/2 py-40 px-6 lg:pl-24">
          <div class="mb-32">
            <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Naše péče</span>
            <h2 class="text-5xl font-cormorant mt-2">Služby</h2>
          </div>

          <div id="servicesList" class="space-y-16">
            ${services.map((service, index) => {
              const images = service.image.split(';').filter(img => img.trim())
              const imageId = `service-img-${service.service_id}`

              return `
                <div class="service-item cursor-pointer group"
                     onmouseenter="changeServiceImage('${imageId}')"
                     onclick="openServiceDetail('${service.service_id}')">
                  <h3 class="text-3xl font-cormorant mb-3 group-hover:text-stone-600 transition-colors">
                    ${service.category_name}
                  </h3>
                  <p class="text-stone-600 font-light font-geist leading-relaxed">
                    ${service.short_description}
                  </p>
                  <button class="mt-4 text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-900 transition-colors font-geist">
                    Zobrazit detail →
                  </button>
                </div>
              `
            }).join('')}
          </div>
        </div>

        <!-- Pravá strana - sticky obrázek -->
        <div class="hidden lg:flex w-1/2 h-screen sticky top-0 items-center justify-center pointer-events-none">
          <div id="serviceImageCard" class="w-[460px] aspect-[3/4] relative overflow-hidden shadow-2xl">
            <div id="serviceImages" class="w-full h-full relative">
              ${services.map((service, index) => {
                const images = service.image.split(';').filter(img => img.trim())
                const imageId = `service-img-${service.service_id}`

                return `
                  <img
                    id="${imageId}"
                    src="${getImageUrl(images[0])}"
                    alt="${service.category_name}"
                    class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}"
                  >
                `
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile version -->
      <div class="lg:hidden py-20 px-6">
        <div class="mb-12">
          <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Naše péče</span>
          <h2 class="text-4xl font-cormorant mt-2">Služby</h2>
        </div>

        <div class="space-y-12">
          ${services.map(service => {
            const images = service.image.split(';').filter(img => img.trim())

            return `
              <div class="service-item cursor-pointer"
                   onclick="openServiceDetail('${service.service_id}')">
                <div class="aspect-[3/4] mb-4 overflow-hidden">
                  <img src="${getImageUrl(images[0])}" alt="${service.category_name}" class="w-full h-full object-cover">
                </div>
                <h3 class="text-2xl font-cormorant mb-2">${service.category_name}</h3>
                <p class="text-stone-600 font-light font-geist mb-3">${service.short_description}</p>
                <button class="text-xs uppercase tracking-widest text-stone-500 font-geist">
                  Zobrazit detail →
                </button>
              </div>
            `
          }).join('')}
        </div>
      </div>
    </section>
  `
}
