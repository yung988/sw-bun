'use client'

import { useState } from 'react'
import Modal from './Modal'
import BookingForm from './BookingForm'

type Service = {
  id: string
  name: string
  price: string
  duration: number
}

type BookingModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  preselectedService?: Service
}

export default function BookingModal({ isOpen, onCloseAction, preselectedService }: BookingModalProps) {
  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseAction} title="Rezervace termínu">
      <BookingForm preselectedService={preselectedService} />
    </Modal>
  )
}

// Hook pro snadné použití
export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [service, setService] = useState<Service | undefined>()

  const open = (preselectedService?: Service) => {
    setService(preselectedService)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setService(undefined)
  }

  return { isOpen, open, close, service }
}
