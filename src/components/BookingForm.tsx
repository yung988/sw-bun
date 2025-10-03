'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const bookingSchema = z.object({
  service: z.string().min(1, 'Vyberte prosím službu'),
  name: z.string().min(2, 'Zadejte prosím jméno'),
  email: z.string().email('Zadejte prosím platný email'),
  phone: z.string().min(9, 'Zadejte prosím platné telefonní číslo'),
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

type Props = {
  preselectedService?: Service
}

export default function BookingForm({ preselectedService }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 md:p-10 shadow-card">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 mb-4">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Rezervace
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-slate-900 dark:text-white">
          Objednejte se na <em className="italic">{preselectedService ? preselectedService.name : 'ošetření'}</em>
        </h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Vyplňte formulář a my Vás budeme během 24 hodin kontaktovat pro potvrzení termínu.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-medium text-green-900 dark:text-green-100 text-sm">Rezervace odeslána!</p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Děkujeme! Brzy Vás budeme kontaktovat pro potvrzení termínu.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {preselectedService && (
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{preselectedService.name}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {preselectedService.duration} min
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">{preselectedService.price}</span>
                </div>
              </div>
            </div>
            <input type="hidden" {...register('service')} value={preselectedService.name} />
          </div>
        )}

        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Preferovaný termín <span className="text-red-500">*</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            {...register('preferredDate')}
            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.preferredDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Preferovaný čas <span className="text-red-500">*</span>
          </label>
          <select
            id="preferredTime"
            {...register('preferredTime')}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          >
            <option value="">Vyberte čas...</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.preferredTime.message}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Jméno a příjmení <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Jana Nová"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="jana@email.cz"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+420 123 456 789"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Poznámka (volitelné)
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            placeholder="Máte nějaké speciální požadavky nebo dotazy?"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Odesílám...' : 'Odeslat nezávaznou poptávku'}
        </button>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů
        </p>
      </form>
    </div>
  )
}
