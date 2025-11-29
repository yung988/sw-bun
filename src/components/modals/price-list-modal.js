import { getServicesData, getPricesData } from '../../data/csv-parser'

export function renderPriceListModal() {
  return `
    <div id="priceListModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="modal-backdrop" onclick="closePriceList()"></div>

      <div class="relative bg-white w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col" onclick="event.stopPropagation()">
        <button onclick="closePriceList()" class="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <div class="overflow-y-auto flex-1 p-8" data-lenis-prevent>
          <h2 class="text-4xl font-cormorant mb-6">Ceník služeb</h2>

          <div id="priceListContent" class="space-y-12">
            <!-- Bude naplněno dynamicky -->
          </div>
        </div>
      </div>
    </div>
  `
}
