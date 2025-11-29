import { getLenis } from './lenis'
import { createServiceDetailModal } from '../components/modals/service-detail-modal'

// Modal state management
let activeModal = null

export function initModalManager() {
  // Set up global modal functions
  window.openModal = openModal
  window.closeModal = closeModal
  window.openBookingModal = openBookingModal
  window.closeBookingModal = closeBookingModal
  window.openPriceList = openPriceList
  window.closePriceList = closePriceList
  window.openGiftModal = openGiftModal
  window.closeGiftModal = closeGiftModal
  window.openServiceDetail = openServiceDetail
  window.closeServiceDetail = closeServiceDetail
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) return

  modal.classList.remove('hidden')
  activeModal = modalId

  // Stop smooth scroll
  const lenis = getLenis()
  if (lenis) lenis.stop()
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) return

  modal.classList.add('hidden')
  activeModal = null

  // Resume smooth scroll
  const lenis = getLenis()
  if (lenis) lenis.start()
}

export function openBookingModal() {
  openModal('bookingModal')
}

export function closeBookingModal() {
  closeModal('bookingModal')
}

export function openPriceList() {
  openModal('priceListModal')
}

export function closePriceList() {
  closeModal('priceListModal')
}

export function openGiftModal() {
  openModal('giftModal')
}

export function closeGiftModal() {
  closeModal('giftModal')
}

export function openServiceDetail(serviceId) {
  // Create and insert the modal HTML
  const modalHTML = createServiceDetailModal(serviceId)
  if (!modalHTML) return

  document.body.insertAdjacentHTML('beforeend', modalHTML)

  // Stop smooth scroll
  const lenis = getLenis()
  if (lenis) lenis.stop()

  activeModal = 'serviceDetailModal'
}

export function closeServiceDetail() {
  const modal = document.getElementById('serviceDetailModal')
  if (modal) {
    modal.remove()
    const lenis = getLenis()
    if (lenis) lenis.start()
  }
}

export function getActiveModal() {
  return activeModal
}
