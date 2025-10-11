'use client'
import { useState } from 'react'

const voucherAmounts = [
  { value: '500', label: '500 Kč' },
  { value: '1000', label: '1 000 Kč' },
  { value: '2000', label: '2 000 Kč' },
  { value: '3000', label: '3 000 Kč' },
  { value: '5000', label: '5 000 Kč' },
  { value: 'custom', label: 'Vlastní částka' },
]

export default function VoucherForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '1000',
    customAmount: '',
    recipient: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Nepodařilo se odeslat objednávku poukazu')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        amount: '1000',
        customAmount: '',
        recipient: '',
        message: '',
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Voucher form error:', err)
      setError('Nepodařilo se odeslat objednávku. Zkuste to prosím znovu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Helper text */}
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            Objednejte dárkový poukaz na libovolnou částku. Platnost 12 měsíců, použitelný na všechny služby.
          </p>
        </div>

        {/* Success message */}
        {submitted && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
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
              <p className="font-medium text-slate-900 text-sm">Objednávka odeslána!</p>
              <p className="text-slate-700 text-sm mt-1">Děkujeme! Brzy Vás budeme kontaktovat s platebními údaji.</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
            <svg
              className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Chyba</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Amount Selection */}
        <div>
          <span className="block text-sm font-medium text-slate-700  mb-3">Hodnota poukazu</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {voucherAmounts.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, amount: option.value })}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${
                  formData.amount === option.value
                    ? 'border-slate-900  bg-slate-900  text-white '
                    : 'border-slate-200  bg-white  text-slate-700  hover:border-slate-300 '
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {formData.amount === 'custom' && (
            <input
              type="number"
              required
              min="100"
              value={formData.customAmount}
              onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
              className="mt-3 w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
              placeholder="Zadejte částku v Kč"
            />
          )}
        </div>

        {/* Contact Info */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="v-name" className="block text-sm font-medium text-slate-700  mb-2">
              Vaše jméno
            </label>
            <input
              type="text"
              id="v-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
              placeholder="Jan Novák"
            />
          </div>

          <div>
            <label htmlFor="v-email" className="block text-sm font-medium text-slate-700  mb-2">
              Email
            </label>
            <input
              type="email"
              id="v-email"
              inputMode="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
              placeholder="jan@email.cz"
            />
          </div>
        </div>

        <div>
          <label htmlFor="v-phone" className="block text-sm font-medium text-slate-700  mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="v-phone"
            inputMode="tel"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200"
            placeholder="+420 773 577 899"
          />
          <p className="mt-1.5 text-xs text-slate-500">Pro domluvení platby a předání poukazu</p>
        </div>

        {/* Recipient */}
        <div>
          <label htmlFor="v-recipient" className="block text-sm font-medium text-slate-700  mb-2">
            Pro koho je poukaz (nepovinné)
          </label>
          <input
            type="text"
            id="v-recipient"
            value={formData.recipient}
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200"
            placeholder="Např. pro maminku"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="v-message" className="block text-sm font-medium text-slate-700  mb-2">
            Věnování (nepovinné)
          </label>
          <textarea
            id="v-message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-400  focus:ring-2 focus:ring-slate-200"
            placeholder="Např. K narozeninám s láskou..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Odesílám...' : 'Objednat poukaz'}
        </button>
      </form>
    </div>
  )
}
