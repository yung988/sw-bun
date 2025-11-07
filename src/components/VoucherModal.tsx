'use client'

import { gsap } from '@/lib/gsap'
import { Gift, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type VoucherModalProps = {
  isOpen: boolean
  onCloseAction: () => void
}

type FormData = {
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  recipientName: string
  message: string
  value: string
  customValue: string
  design: string
}

const cardValues = [
  { value: '500', label: '500 Kč' },
  { value: '1000', label: '1 000 Kč' },
  { value: '1500', label: '1 500 Kč' },
  { value: '2000', label: '2 000 Kč' },
  { value: '3000', label: '3 000 Kč' },
  { value: 'custom', label: 'Vlastní' },
]

const designs = [
  {
    id: 'rose',
    name: 'Růžový',
    gradient: 'from-pink-300 via-rose-300 to-pink-400',
  },
  {
    id: 'purple',
    name: 'Fialový',
    gradient: 'from-purple-300 via-pink-300 to-purple-400',
  },
  {
    id: 'gold',
    name: 'Zlatý',
    gradient: 'from-amber-200 via-yellow-200 to-amber-300',
  },
  {
    id: 'elegant',
    name: 'Elegantní',
    gradient: 'from-gray-200 via-gray-100 to-gray-200',
  },
]

export default function VoucherModal({ isOpen, onCloseAction }: VoucherModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    recipientName: '',
    message: '',
    value: '',
    customValue: '',
    design: 'rose',
  })

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    const finalValue = formData.value === 'custom' ? formData.customValue : formData.value

    if (!formData.buyerName || !formData.buyerEmail || !formData.buyerPhone || !formData.recipientName || !finalValue) {
      alert('Prosím vyplňte všechna povinná pole')
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/send-gift-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, finalValue }),
      })

      if (!response.ok) throw new Error('Chyba při odesílání')

      alert('Děkujeme! Vaše objednávka byla odeslána. Brzy vás budeme kontaktovat.')
      onCloseAction()
    } catch (error) {
      console.error(error)
      alert('Nastala chyba při odesílání. Zkuste to prosím znovu nebo nás kontaktujte.')
    } finally {
      setIsSending(false)
    }
  }

  const selectedDesign = designs.find((d) => d.id === formData.design)
  const displayValue = formData.value === 'custom' ? formData.customValue : formData.value

  useLayoutEffect(() => {
    if (!dialogRef.current) return
    const modal = dialogRef.current.querySelector('.modal-content') as HTMLElement
    const backdrop = dialogRef.current.querySelector('.modal-backdrop') as HTMLElement

    if (isOpen) {
      dialogRef.current.showModal()
      const tl = gsap.timeline()

      // Backdrop fade in - Apple style
      gsap.set(backdrop, { opacity: 0 })
      tl.to(
        backdrop,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      )

      // Modal - Apple style: scale + fade + subtle y movement
      gsap.set(modal, {
        scale: 0.92,
        opacity: 0,
        y: 20,
      })
      tl.to(
        modal,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple's spring-like easing
        },
        0.05
      )
    } else {
      const tl = gsap.timeline()

      // Modal fade out - Apple style
      tl.to(
        modal,
        {
          scale: 0.95,
          opacity: 0,
          y: 10,
          duration: 0.25,
          ease: 'power2.in',
        },
        0
      )

      tl.to(
        backdrop,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        0
      )

      tl.add(() => {
        dialogRef.current?.close()
      })
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 overflow-hidden bg-transparent backdrop:bg-transparent"
      onClick={(e) => {
        if (e.target === dialogRef.current) onCloseAction()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onCloseAction()
      }}
      onClose={onCloseAction}
    >
      {/* Backdrop - rozmazané a ztmavené pozadí */}
      <div
        className="modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={onCloseAction}
        onKeyDown={(e) => e.key === 'Enter' && onCloseAction()}
        aria-hidden="true"
      />

      {/* Modal Container - slide panel from right, centered */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="modal-content pointer-events-auto w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl"
        >
          <div className="relative w-full h-full grid lg:grid-cols-5 gap-6 p-8 overflow-y-auto">
            {/* Form Section */}
            <div className="lg:col-span-3 relative bg-white/25 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/40">
              <button
                type="button"
                onClick={onCloseAction}
                className="absolute top-5 right-5 text-white bg-black/30 rounded-full p-2 hover:text-white/70 z-10"
                aria-label="Zavřít"
              >
                <X size={22} />
              </button>

              <div className="p-10">
                <h2 className="text-5xl font-light text-white mb-3 drop-shadow-lg">Dárkový poukaz</h2>
                <p className="text-white text-base font-light mb-10 drop-shadow">Darujte radost a krásu svým blízkým</p>

                <div className="space-y-4">
                  {/* Name inputs */}
                  <input
                    type="text"
                    value={formData.buyerName}
                    onChange={(e) => handleChange('buyerName', e.target.value)}
                    placeholder="Vaše jméno"
                    className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none text-white placeholder-white/70 shadow-lg"
                  />

                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleChange('recipientName', e.target.value)}
                    placeholder="Pro koho je poukaz"
                    className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none text-white placeholder-white/70 shadow-lg"
                  />

                  {/* Email and Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={formData.buyerEmail}
                      onChange={(e) => handleChange('buyerEmail', e.target.value)}
                      placeholder="Váš e-mail"
                      className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none text-white placeholder-white/70 shadow-lg"
                    />
                    <input
                      type="tel"
                      value={formData.buyerPhone}
                      onChange={(e) => handleChange('buyerPhone', e.target.value)}
                      placeholder="Váš telefon"
                      className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none text-white placeholder-white/70 shadow-lg"
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Osobní vzkaz (volitelné)"
                    rows={2}
                    className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none text-white placeholder-white/70 shadow-lg resize-none"
                  />

                  {/* Value selection */}
                  <div className="grid grid-cols-3 gap-3">
                    {cardValues.map(({ value, label }) => (
                      <button
                        type="button"
                        key={value}
                        onClick={() => handleChange('value', value)}
                        className={`py-3 px-2 rounded-xl backdrop-blur-xl border text-sm transition-all shadow-lg ${
                          formData.value === value
                            ? 'bg-white/30 border-white/60 text-white font-medium'
                            : 'bg-white/20 border-white/40 text-white/80 hover:bg-white/25'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Custom value input */}
                  {formData.value === 'custom' && (
                    <input
                      type="number"
                      value={formData.customValue}
                      onChange={(e) => handleChange('customValue', e.target.value)}
                      placeholder="Zadejte částku v Kč"
                      className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none text-white placeholder-white/70 shadow-lg"
                    />
                  )}

                  {/* Design selection */}
                  <div className="grid grid-cols-4 gap-3">
                    {designs.map((d) => (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => handleChange('design', d.id)}
                        className={`py-3 rounded-xl backdrop-blur-xl border shadow-lg transition-all ${
                          formData.design === d.id
                            ? 'bg-white/30 border-white/60'
                            : 'bg-white/20 border-white/40 hover:bg-white/25'
                        }`}
                        aria-label={`Vybrat ${d.name} design`}
                      >
                        <div className={`w-8 h-8 mx-auto rounded-lg bg-gradient-to-br ${d.gradient}`} />
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSending}
                    className="w-full py-4 bg-white/25 backdrop-blur-xl border border-white/50 text-white rounded-2xl hover:bg-white/35 transition-all duration-300 text-base font-light tracking-wide shadow-xl mt-2 disabled:opacity-50"
                  >
                    {isSending ? 'Odesílám...' : 'Objednat poukaz'}
                  </button>

                  <p className="text-white/60 text-xs text-center mt-2 drop-shadow">
                    Po odeslání vás budeme kontaktovat pro dokončení
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl" />
                <div
                  className={`relative bg-gradient-to-br ${selectedDesign?.gradient} rounded-3xl shadow-2xl p-8 aspect-[1.6/1] flex flex-col justify-between overflow-hidden`}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <Gift className={formData.design === 'elegant' ? 'text-gray-700' : 'text-white/90'} size={28} />
                      <span
                        className={`${formData.design === 'elegant' ? 'text-gray-700' : 'text-white/90'} font-light text-lg`}
                      >
                        Dárkový poukaz
                      </span>
                    </div>

                    <div>
                      <p
                        className={`${formData.design === 'elegant' ? 'text-gray-600' : 'text-white/70'} text-sm font-light mb-1`}
                      >
                        Pro:
                      </p>
                      <p
                        className={`${formData.design === 'elegant' ? 'text-gray-800' : 'text-white'} text-2xl font-light mb-4`}
                      >
                        {formData.recipientName || 'Jméno obdarovaného'}
                      </p>

                      {formData.message && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-4">
                          <p
                            className={`${formData.design === 'elegant' ? 'text-gray-700' : 'text-white/90'} text-sm italic leading-relaxed`}
                          >
                            "{formData.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p
                        className={`${formData.design === 'elegant' ? 'text-gray-600' : 'text-white/70'} text-xs font-light mb-1`}
                      >
                        Hodnota
                      </p>
                      <p
                        className={`${formData.design === 'elegant' ? 'text-gray-800' : 'text-white'} text-4xl font-light`}
                      >
                        {displayValue ? `${displayValue} Kč` : '--- Kč'}
                      </p>
                    </div>
                    <p className={`${formData.design === 'elegant' ? 'text-gray-500' : 'text-white/60'} text-xs`}>
                      SW Beauty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

// Hook pro snadné použití
export function useVoucherModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close }
}
