'use client'

import { gsap } from '@/lib/gsap'
import type { MainService } from '@/lib/services'
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

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default function BookingModal({ isOpen, onCloseAction, preselectedService }: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [services, setServices] = useState<MainService[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    category: '',
    service: preselectedService?.name || '',
    date: '',
    time: '',
  })

  // Load services from API
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        }
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  // Build categories map from services
  const categories: Record<string, string[]> = {}
  services.forEach((service) => {
    if (service.subcategories && service.subcategories.length > 0) {
      // Parent category with subcategories
      categories[service.name] = service.subcategories.map((sub) => sub.name)
    } else if (service.pricing && service.pricing.length > 0) {
      // Service with pricing items
      categories[service.name] = service.pricing.map((p) => p.name)
    } else {
      // Simple service
      categories[service.name] = [service.name]
    }
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

      {/* Modal Container - centered with side panel effect */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="modal-content pointer-events-auto w-full max-w-md max-h-[95vh] bg-white shadow-2xl overflow-y-auto rounded-3xl border border-slate-200"
        >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCloseAction}
          className="absolute top-5 right-5 text-slate-600 hover:text-slate-900 transition-colors z-10 bg-slate-50 hover:bg-slate-100 rounded-full p-2"
          aria-label="Zavřít"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-4xl font-light text-slate-900 mb-2">Rezervace</h2>
          <p className="text-slate-600 text-sm font-light mb-8">
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
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Telefon"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="E-mail"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder-slate-400"
              />
            </div>

            {/* Category Selection */}
            <div>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                disabled={loading}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 appearance-none cursor-pointer"
              >
                <option value="">
                  {loading ? 'Načítání...' : 'Vyberte kategorii'}
                </option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
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
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="">Vyberte proceduru</option>
                  {categories[formData.category].map((service) => (
                    <option key={service} value={service}>
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
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900"
              />
              <select
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 appearance-none cursor-pointer"
              >
                <option value="">Čas</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all duration-300 text-base font-medium tracking-wide shadow-lg mt-2"
            >
              Odeslat rezervaci
            </button>

            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="py-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCall}
                className="py-4 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-lg border border-slate-200"
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
