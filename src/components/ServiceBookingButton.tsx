'use client'

import OpenBookingButton from './OpenBookingButton'

type Service = {
  id: string
  name: string
  price: string
  duration: number
}

type Props = {
  service: Service
  className?: string
  children: React.ReactNode
}

export default function ServiceBookingButton({ service, className, children }: Props) {
  return (
    <OpenBookingButton service={service} className={className}>
      {children}
    </OpenBookingButton>
  )
}
