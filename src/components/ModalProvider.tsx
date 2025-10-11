'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import BookingModal from './BookingModal'
import VoucherModal from './VoucherModal'

type Service = {
  id: string
  name: string
  price: string
  duration: number
}

type ModalContextType = {
  openBooking: (service?: Service) => void
  openVoucher: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [voucherOpen, setVoucherOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | undefined>()

  const openBooking = (service?: Service) => {
    setSelectedService(service)
    setBookingOpen(true)
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setSelectedService(undefined)
  }

  const openVoucher = () => {
    setVoucherOpen(true)
  }

  const closeVoucher = () => {
    setVoucherOpen(false)
  }

  return (
    <ModalContext.Provider value={{ openBooking, openVoucher }}>
      {children}
      <BookingModal isOpen={bookingOpen} onCloseAction={closeBooking} preselectedService={selectedService} />
      <VoucherModal isOpen={voucherOpen} onCloseAction={closeVoucher} />
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModals musí být použit v rámci ModalProvider')
  }
  return context
}
