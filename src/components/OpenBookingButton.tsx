'use client'

import { useModals } from './ModalProvider'

type Service = {
  id: string
  name: string
  price: string
  duration: number
}

type Props = {
  service?: Service
  children: React.ReactNode
  className?: string
}

export default function OpenBookingButton({ service, children, className }: Props) {
  const { openBooking } = useModals()

  return (
    <button type="button" onClick={() => openBooking(service)} className={className}>
      {children}
    </button>
  )
}
