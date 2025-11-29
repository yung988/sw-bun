import { renderNavbar } from './components/sections/navbar'
import { renderHero } from './components/sections/hero'
import { renderServices } from './components/sections/services'
import { renderPhilosophy } from './components/sections/philosophy'
import { renderFounder } from './components/sections/founder'
import { renderFAQ } from './components/sections/faq'
import { renderVouchers } from './components/sections/vouchers'
import { renderReviews } from './components/sections/reviews'
import { renderInstagram } from './components/sections/instagram'
import { renderContact } from './components/sections/contact'

// Import modals
import { renderBookingModal } from './components/modals/booking-modal'
import { renderPriceListModal } from './components/modals/price-list-modal'
import { renderServiceDetailModal } from './components/modals/service-detail-modal'
import { renderGiftModal } from './components/modals/gift-modal'

// Import data and managers
import { loadServicesData } from './data/csv-parser'
import { initModalManager } from './lib/modal-manager'
import { initServicesManager } from './lib/services-manager'

export async function renderApp() {
  const app = document.getElementById('app')

  // Load CSV data first
  await loadServicesData()

  // Render all sections
  app.innerHTML = `
    ${renderNavbar()}
    ${renderHero()}
    ${renderServices()}
    ${renderPhilosophy()}
    ${renderFounder()}
    ${renderFAQ()}
    ${renderVouchers()}
    ${renderReviews()}
    ${renderInstagram()}
    ${renderContact()}

    <!-- Modals -->
    ${renderBookingModal()}
    ${renderPriceListModal()}
    ${renderServiceDetailModal()}
    ${renderGiftModal()}
  `

  // Initialize managers after DOM is ready
  initModalManager()
  initServicesManager()
}
