'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [allServices, setAllServices] = useState<ServiceFromAPI[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [timeSlots, setTimeSlots] = useState<string[]>([])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/pricelist')
        if (response.ok) {
          const data = await response.json()
          setAllServices(
            data.map(
              (item: {
                CategoryId: string
                CategoryName: string
                PackageName: string
                Price: string
                Duration: number
              }) => ({
                slug: `${item.CategoryId}-${item.PackageName.toLowerCase().replace(/\s+/g, '-')}`,
                name: item.PackageName,
                price: item.Price,
                duration: item.Duration,
                category: item.CategoryName,
                categoryId: item.CategoryId,
              })
            )
          )
        }
      } catch (error) {
        console.error('Nepodařilo se načíst služby:', error)
      }
    }
    loadServices()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: preselectedService?.name || '',
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    // Validace, že datum není neděle
    if (isSunday(data.preferredDate)) {
      setErrorMessage('Salon je v neděli zavřený. Vyberte prosím jiný den.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (response.ok || response.status === 202) {
        // 200 OK = úplný úspěch
        // 202 Accepted = rezervace přijata, ale email chyba
        setIsSuccess(true)
        if (responseData.error) {
          setErrorMessage(responseData.error)
        } else {
          setErrorMessage('')
        }
        reset()
        setSelectedDate(undefined)
        setTimeout(() => {
          setIsSuccess(false)
          setErrorMessage('')
        }, 6000)
      } else {
        setErrorMessage(responseData.error || 'Chyba při odesílání rezervace. Zkuste to prosím znovu.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      setErrorMessage('Nastala chyba při odesílání. Zkuste to prosím znovu nebo nás kontaktujte.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Pomocná funkce pro kontrolu, zda je datum neděle
  const isSunday = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.getDay() === 0
  }, [])

  // Pomocná funkce pro kontrolu, zda je datum neděle (Date objekt)
  const isSundayDate = useCallback((date: Date | undefined) => {
    if (!date) return false
    return date.getDay() === 0
  }, [])

  // Generování časových slotů podle dne v týdnu
  const generateTimeSlots = useCallback((date: Date) => {
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

  // Aktualizace časových slotů při změně data
  useEffect(() => {
    if (selectedDate && !isSundayDate(selectedDate)) {
      setTimeSlots(generateTimeSlots(selectedDate))
    } else {
      setTimeSlots([])
    }
  }, [selectedDate, isSundayDate, generateTimeSlots])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-slate-600">
          Vyplňte formulář a my Vás budeme během 24 hodin kontaktovat pro potvrzení termínu.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-slate-900 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Úspěch</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-medium text-slate-900 text-sm">Rezervace odeslána!</p>
            <p className="text-slate-700 text-sm mt-1">Děkujeme! Brzy Vás budeme kontaktovat pro potvrzení termínu.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Chyba</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="font-medium text-red-900 text-sm">Chyba při odesílání</p>
            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
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
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Vyberte službu --" />
                  </SelectTrigger>
                  <SelectContent>
                    {allServices.map((service) => (
                      <SelectItem key={service.slug} value={service.name}>
                        {service.name} - {service.price} ({service.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
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
          <Controller
            name="preferredDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !selectedDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: cs }) : <span>Vyberte datum</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      if (date) {
                        field.onChange(format(date, 'yyyy-MM-dd'))
                      }
                    }}
                    disabled={(date) => {
                      // Disable past dates and Sundays
                      const tomorrow = new Date()
                      tomorrow.setHours(0, 0, 0, 0)
                      tomorrow.setDate(tomorrow.getDate() + 1)
                      return date < tomorrow || date.getDay() === 0
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.preferredDate.message}
            </p>
          )}
          {selectedDate && isSundayDate(selectedDate) && (
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
          {selectedDate && !isSundayDate(selectedDate) && (
            <p className="mt-1.5 text-xs text-slate-500">
              Otevírací doba: {selectedDate.getDay() === 6 ? '10:00 - 18:00' : '9:00 - 20:00'}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-700  mb-2">
            Preferovaný čas <span className="text-red-500">*</span>
          </label>
          <Controller
            name="preferredTime"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vyberte čas..." />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
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
            <Input id="name" type="text" {...register('name')} placeholder="Jana Nová" />
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
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              {...register('email')}
              placeholder="jana@email.cz"
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
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register('phone')}
            placeholder="+420 773 577 899"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
          {!errors.phone && (
            <p className="mt-1.5 text-xs text-slate-500">Pro rychlé potvrzení termínu vám zavoláme nebo pošleme SMS</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700  mb-2">
            Poznámka (volitelné)
          </label>
          <Textarea
            id="message"
            {...register('message')}
            rows={4}
            placeholder="Máte nějaké speciální požadavky nebo dotazy?"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Odesílám...' : 'Odeslat nezávaznou poptávku'}
        </Button>

        <p className="text-xs text-center text-slate-500">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů
        </p>
      </form>
    </div>
  )
}
