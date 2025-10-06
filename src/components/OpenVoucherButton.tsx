'use client'

import { useModals } from './ModalProvider'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function OpenVoucherButton({ children, className }: Props) {
  const { openVoucher } = useModals()

  return (
    <button type="button" onClick={openVoucher} className={className}>
      {children}
    </button>
  )
}
