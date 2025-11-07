'use client'

import { gsap } from '@/lib/gsap'
import { MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Service = {
  id?: string
  name: string
  price?: string
  duration?: number | null
}

type BookingModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  preselectedService?: Service
}

type FormData = {
  name: string
  phone: string
  email: string
  category: string
  service: string
  date: string
  time: string
}

const categories: Record<string, string[]> = {
  'Péče o pleť': [
    'Základní ošetření pleti',
    'Hloubkové čištění',
    'Anti-age ošetření',
    'Hydratační ošetření',
    'Lifting obličeje',
  ],
  Masáže: ['Masáž obličeje', 'Relaxační masáž hlavy', 'Lymfatická masáž', 'Kobido masáž'],
  'Make-up': [
    'Permanentní make-up obočí',
    'Permanentní make-up rtů',
    'Permanentní linky',
    'Denní make-up',
    'Večerní make-up',
  ],
  Depilace: ['Depilace obličej', 'Depilace nohy', 'Depilace celé tělo', 'Brazilská depilace'],
  'Manikúra & Pedikúra': ['Klasická manikúra', 'Gel lak', 'Akrylové nehty', 'Pedikúra', 'Spa pedikúra'],
  'Speciální procedury': ['Mikrojehlování', 'Chemický peeling', 'Mezoterapie', 'Ošetření IPL'],
}

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default function BookingModal({ isOpen, onCloseAction, preselectedService }: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    category: '',
    service: preselectedService?.name || '',
    date: '',
    time: '',
  })

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.category ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      alert('Prosím vyplňte všechna pole')
      return
    }
    console.log('Rezervace:', formData)
    alert('Děkujeme! Vaše rezervace byla odeslána. Brzy vás budeme kontaktovat.')
    onCloseAction()
  }

  const handleChange = (field: keyof FormData, value: string) => {
    const newData: FormData = {
      ...formData,
      [field]: value,
    }

    // Reset service when category changes
    if (field === 'category') {
      newData.service = ''
    }

    setFormData(newData)
  }

  const handleWhatsApp = () => {
    const message = `Dobrý den, chci si rezervovat termín:%0A%0AJméno: ${formData.name}%0ATelefon: ${formData.phone}%0AKategorie: ${formData.category}%0AProcedura: ${formData.service}%0ADatum: ${formData.date}%0AČas: ${formData.time}`
    window.open(`https://wa.me/420773577899?text=${message}`, '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+420773577899'
  }

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

      {/* Modal Container - centered with side panel effect */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="modal-content pointer-events-auto w-full max-w-md max-h-[95vh] bg-white/20 backdrop-blur-3xl shadow-2xl overflow-y-auto rounded-3xl border border-white/30"
        >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCloseAction}
          className="absolute top-5 right-5 text-white hover:text-white/70 transition-colors z-10 bg-black/20 rounded-full p-2"
          aria-label="Zavřít"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-4xl font-light text-white mb-2 drop-shadow-lg">Rezervace</h2>
          <p className="text-white/80 text-sm font-light mb-8 drop-shadow">
            Vyplňte formulář a my vás budeme kontaktovat
          </p>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Jméno a příjmení"
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white placeholder-white/70 shadow-lg"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Telefon"
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white placeholder-white/70 shadow-lg"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="E-mail"
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white placeholder-white/70 shadow-lg"
              />
            </div>

            {/* Category Selection */}
            <div>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white appearance-none cursor-pointer shadow-lg"
                style={{
                  color: formData.category ? 'white' : 'rgba(255,255,255,0.7)',
                }}
              >
                <option value="" style={{ color: '#333', background: '#fff' }}>
                  Vyberte kategorii
                </option>
                {Object.keys(categories).map((category, _index) => (
                  <option key={category} value={category} style={{ color: '#333', background: '#fff' }}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Selection - only show if category is selected */}
            {formData.category && (
              <div>
                <select
                  value={formData.service}
                  onChange={(e) => handleChange('service', e.target.value)}
                  className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white appearance-none cursor-pointer shadow-lg"
                  style={{
                    color: formData.service ? 'white' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  <option value="" style={{ color: '#333', background: '#fff' }}>
                    Vyberte proceduru
                  </option>
                  {categories[formData.category].map((service, _index) => (
                    <option key={service} value={service} style={{ color: '#333', background: '#fff' }}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white shadow-lg"
                style={{ colorScheme: 'dark' }}
              />
              <select
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all text-white appearance-none cursor-pointer shadow-lg"
                style={{
                  color: formData.time ? 'white' : 'rgba(255,255,255,0.7)',
                }}
              >
                <option value="" style={{ color: '#333', background: '#fff' }}>
                  Čas
                </option>
                {timeSlots.map((time, _index) => (
                  <option key={time} value={time} style={{ color: '#333', background: '#fff' }}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 bg-white/25 backdrop-blur-xl border border-white/50 text-white rounded-2xl hover:bg-white/35 transition-all duration-300 text-base font-light tracking-wide shadow-xl mt-2"
            >
              Odeslat rezervaci
            </button>

            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="py-4 bg-green-500/30 backdrop-blur-xl border border-green-400/50 text-white rounded-2xl hover:bg-green-500/40 transition-all duration-300 text-sm font-light flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCall}
                className="py-4 bg-white/20 backdrop-blur-xl border border-white/40 text-white rounded-2xl hover:bg-white/30 transition-all duration-300 text-sm font-light flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone size={18} />
                Zavolat
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </dialog>
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
