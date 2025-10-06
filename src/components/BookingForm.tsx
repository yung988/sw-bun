'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const bookingSchema = z.object({
  service: z.string().min(1, 'Vyberte prosím službu'),
  name: z.string().min(2, 'Zadejte prosím jméno'),
  email: z.string().email('Zadejte prosím platný email'),
  phone: z
    .string()
    .min(9, 'Zadejte prosím platné telefonní číslo')
    .regex(/^(\+420)?[0-9]{9}$/, 'Zadejte platné české telefonní číslo (např. 773577899 nebo +420773577899)'),
  preferredDate: z.string().min(1, 'Vyberte prosím datum'),
  preferredTime: z.string().min(1, 'Vyberte prosím čas'),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

type Service = {
  id: string
  name: string
  price: string
  duration: number
}

type ServiceFromAPI = {
  slug: string
  name: string
  price: string
  duration: number
  category: string
  categoryId: string
}

type Props = {
  preselectedService?: Service
}

export default function BookingForm({ preselectedService }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [allServices, setAllServices] = useState<ServiceFromAPI[]>([])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/pricelist')
        if (response.ok) {
          const data = await response.json()
          setAllServices(data.map((item: {CategoryId: string; CategoryName: string; PackageName: string; Price: string; Duration: number}) => ({
            slug: `${item.CategoryId}-${item.PackageName.toLowerCase().replace(/\s+/g, '-')}`,
            name: item.PackageName,
            price: item.Price,
            duration: item.Duration,
            category: item.CategoryName,
            categoryId: item.CategoryId,
          })))
        }
      } catch (error) {
        console.error('Failed to load services:', error)
      }
    }
    loadServices()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: preselectedService?.name || '',
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    // Validate that date is not Sunday
    if (isSunday(data.preferredDate)) {
      alert('Salon je v neděli zavřený. Vyberte prosím jiný den.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setSelectedDate('')
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const [selectedDate, setSelectedDate] = useState('')
  const [timeSlots, setTimeSlots] = useState<string[]>([])

  // Helper function to check if date is Sunday
  const isSunday = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.getDay() === 0
  }, [])

  // Generate time slots based on day of week
  const generateTimeSlots = useCallback((dateString: string) => {
    if (!dateString) return []
    
    const date = new Date(dateString)
    const day = date.getDay()
    // Saturday: 10:00-18:00, Other days: 9:00-20:00
    const openHour = day === 6 ? 10 : 9
    const closeHour = day === 6 ? 18 : 20
    
    const slots: string[] = []
    for (let h = openHour; h < closeHour; h++) {
      slots.push(`${h}:00`)
    }
    
    return slots
  }, [])

  // Update time slots when date changes
  useEffect(() => {
    if (selectedDate && !isSunday(selectedDate)) {
      setTimeSlots(generateTimeSlots(selectedDate))
    } else {
      setTimeSlots([])
    }
  }, [selectedDate, isSunday, generateTimeSlots])

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-slate-600">
          Vyplňte formulář a my Vás budeme během 24 hodin kontaktovat pro potvrzení termínu.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 rounded-xl bg-slate-50  border border-slate-200  p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-slate-900  flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Úspěch</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-medium text-slate-900  text-sm">Rezervace odeslána!</p>
            <p className="text-slate-700  text-sm mt-1">Děkujeme! Brzy Vás budeme kontaktovat pro potvrzení termínu.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {preselectedService ? (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">{preselectedService.name}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Hodiny</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {preselectedService.duration} min
                  </span>
                  <span className="font-medium text-slate-900">{preselectedService.price}</span>
                </div>
              </div>
            </div>
            <input type="hidden" {...register('service')} value={preselectedService.name} />
          </div>
        ) : (
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
              Vyberte službu <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              {...register('service')}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            >
              <option value="">-- Vyberte službu --</option>
              {allServices.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name} - {service.price} ({service.duration} min)
                </option>
              ))}
            </select>
            {errors.service && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.service.message}
            </p>
          )}
          </div>
        )}

        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-700 mb-2">
            Preferovaný termín <span className="text-red-500">*</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            {...register('preferredDate', {
              onChange: (e) => setSelectedDate(e.target.value),
            })}
            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.preferredDate.message}
            </p>
          )}
          {selectedDate && isSunday(selectedDate) && (
            <p className="mt-1.5 text-xs text-amber-600 flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Varování</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Salon je v neděli zavřený. Vyberte prosím jiný den.
            </p>
          )}
          {selectedDate && !isSunday(selectedDate) && (
            <p className="mt-1.5 text-xs text-slate-500">
              Otevírací doba: {new Date(selectedDate).getDay() === 6 ? '10:00 - 18:00' : '9:00 - 20:00'}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-700  mb-2">
            Preferovaný čas <span className="text-red-500">*</span>
          </label>
          <select
            id="preferredTime"
            {...register('preferredTime')}
            className="w-full rounded-xl border border-slate-300  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
          >
            <option value="">Vyberte čas...</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.preferredTime.message}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700  mb-2">
              Jméno a příjmení <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Jana Nová"
              className="w-full rounded-xl border border-slate-300  bg-white  px-4 py-3 text-sm text-slate-900  placeholder:text-slate-400 outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700  mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              {...register('email')}
              placeholder="jana@email.cz"
              className="w-full rounded-xl border border-slate-300  bg-white  px-4 py-3 text-sm text-slate-900  placeholder:text-slate-400 outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700  mb-2">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register('phone')}
            placeholder="+420 773 577 899"
            className="w-full rounded-xl border border-slate-300  bg-white  px-4 py-3 text-sm text-slate-900  placeholder:text-slate-400 outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
          {!errors.phone && (
            <p className="mt-1.5 text-xs text-slate-500">
              Pro rychlé potvrzení termínu vám zavoláme nebo pošleme SMS
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700  mb-2">
            Poznámka (volitelné)
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            placeholder="Máte nějaké speciální požadavky nebo dotazy?"
            className="w-full rounded-xl border border-slate-300  bg-white  px-4 py-3 text-sm text-slate-900  placeholder:text-slate-400 outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200  resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-900  px-8 py-4 text-sm font-medium text-white  transition hover:bg-slate-800  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Odesílám...' : 'Odeslat nezávaznou poptávku'}
        </button>

        <p className="text-xs text-center text-slate-500">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů
        </p>
      </form>
    </div>
  )
}
