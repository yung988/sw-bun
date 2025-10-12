'use client'

import { useEffect } from 'react'

type ModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  children: React.ReactNode
  title?: string
}

export default function Modal({ isOpen, onCloseAction, children, title }: ModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseAction()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onCloseAction])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6">
      {/* Backdrop - rozmazané pozadí */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCloseAction} aria-hidden="true" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-xl md:max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ maxHeight: 'calc(100dvh - 48px)', overflowY: 'auto' }}
      >
        {/* Header */}
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <h2 className="font-display text-2xl font-light text-slate-900">{title}</h2>
            <button
              type="button"
              onClick={onCloseAction}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Zavřít"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <title>Zavřít</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
