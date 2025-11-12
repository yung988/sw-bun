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

      // Backdrop fade in - light style
      gsap.set(backdrop, { opacity: 0 })
      tl.to(
        backdrop,
        {
          opacity: 1,
          duration: 0.3,
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
      {/* Backdrop - světlé rozmazané pozadí */}
      <div
        className="modal-backdrop fixed inset-0 bg-white/80 backdrop-blur-md"
        onClick={onCloseAction}
        onKeyDown={(e) => e.key === 'Enter' && onCloseAction()}
        aria-hidden="true"
      />

      {/* Modal Container - slide panel from right, centered */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="modal-content pointer-events-auto w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200"
        >
          <div className="relative w-full h-full grid lg:grid-cols-5 gap-6 p-8 overflow-y-auto">
            {/* Form Section */}
            <div className="lg:col-span-3 relative bg-white rounded-3xl">
              <button
                type="button"
                onClick={onCloseAction}
                className="absolute top-5 right-5 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-2 hover:text-slate-900 z-10 transition-colors"
                aria-label="Zavřít"
              >
                <X size={22} />
              </button>

              <div className="p-10">
                <h2 className="text-5xl font-light text-slate-900 mb-3">Dárkový poukaz</h2>
                <p className="text-slate-600 text-base font-light mb-10">Darujte radost a krásu svým blízkým</p>

                <div className="space-y-4">
                  {/* Name inputs */}
                  <input
                    type="text"
                    value={formData.buyerName}
                    onChange={(e) => handleChange('buyerName', e.target.value)}
                    placeholder="Vaše jméno"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
                  />

                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleChange('recipientName', e.target.value)}
                    placeholder="Pro koho je poukaz"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
                  />

                  {/* Email and Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={formData.buyerEmail}
                      onChange={(e) => handleChange('buyerEmail', e.target.value)}
                      placeholder="Váš e-mail"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
                    />
                    <input
                      type="tel"
                      value={formData.buyerPhone}
                      onChange={(e) => handleChange('buyerPhone', e.target.value)}
                      placeholder="Váš telefon"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Osobní vzkaz (volitelné)"
                    rows={2}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400 resize-none"
                  />

                  {/* Value selection */}
                  <div className="grid grid-cols-3 gap-3">
                    {cardValues.map(({ value, label }) => (
                      <button
                        type="button"
                        key={value}
                        onClick={() => handleChange('value', value)}
                        className={`py-3 px-2 rounded-xl border text-sm transition-all ${
                          formData.value === value
                            ? 'bg-slate-900 border-slate-900 text-white font-medium shadow-lg'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
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
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
                    />
                  )}

                  {/* Design selection */}
                  <div className="grid grid-cols-4 gap-3">
                    {designs.map((d) => (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => handleChange('design', d.id)}
                        className={`py-3 rounded-xl border transition-all ${
                          formData.design === d.id
                            ? 'bg-slate-100 border-slate-400 shadow-md'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
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
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all duration-300 text-base font-medium tracking-wide shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Odesílám...' : 'Objednat poukaz'}
                  </button>

                  <p className="text-slate-500 text-xs text-center mt-2">
                    Po odeslání vás budeme kontaktovat pro dokončení
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
              <div className="w-full max-w-md relative">
                <div
                  className={`relative bg-gradient-to-br ${selectedDesign?.gradient} rounded-3xl shadow-xl p-8 aspect-[1.6/1] flex flex-col justify-between overflow-hidden border border-slate-200`}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/30 rounded-full translate-y-12 -translate-x-12" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <Gift className="text-slate-700" size={28} />
                      <span className="text-slate-700 font-light text-lg">
                        Dárkový poukaz
                      </span>
                    </div>

                    <div>
                      <p className="text-slate-600 text-sm font-light mb-1">
                        Pro:
                      </p>
                      <p className="text-slate-900 text-2xl font-light mb-4">
                        {formData.recipientName || 'Jméno obdarovaného'}
                      </p>

                      {formData.message && (
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/40">
                          <p className="text-slate-700 text-sm italic leading-relaxed">
                            "{formData.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p className="text-slate-600 text-xs font-light mb-1">
                        Hodnota
                      </p>
                      <p className="text-slate-900 text-4xl font-light">
                        {displayValue ? `${displayValue} Kč` : '--- Kč'}
                      </p>
                    </div>
                    <p className="text-slate-500 text-xs">
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
