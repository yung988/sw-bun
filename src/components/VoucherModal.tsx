'use client'

import { useState } from 'react'
import Modal from './Modal'
import VoucherForm from './VoucherForm'

type VoucherModalProps = {
  isOpen: boolean
  onCloseAction: () => void
}

export default function VoucherModal({ isOpen, onCloseAction }: VoucherModalProps) {
  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseAction} title="Objednat dárkový poukaz">
      <VoucherForm />
    </Modal>
  )
}

// Hook pro snadné použití
export function useVoucherModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close }
}
