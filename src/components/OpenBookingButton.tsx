'use client'

import { useModals } from './ModalProvider'
import { track } from '@/lib/analytics'

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
    <button
      type="button"
      onClick={() => {
        if (service) {
          track('reserve_click', {
            service_id: service.id,
            service_name: service.name,
            price: service.price,
            duration: service.duration,
          })
        } else {
          track('reserve_click', { service_id: 'unknown' })
        }
        openBooking(service)
      }}
      className={className}
    >
      {children}
    </button>
  )
}
