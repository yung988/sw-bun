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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount

    const subject = encodeURIComponent(`Objednávka poukazu - ${finalAmount} Kč`)
    const body = encodeURIComponent(
      `OBJEDNÁVKA DÁRKOVÉHO POUKAZU\n\nHodnota poukazu: ${finalAmount} Kč\n\nKONTAKTNÍ ÚDAJE:\nJméno: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nPro koho: ${formData.recipient || 'Neuvedeno'}\nVěnování: ${formData.message || 'Bez věnování'}`
    )

    window.location.href = `mailto:info@swbeauty.cz?subject=${subject}&body=${body}`

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        amount: '1000',
        customAmount: '',
        recipient: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Selection */}
      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Hodnota poukazu</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {voucherAmounts.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, amount: option.value })}
              className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${
                formData.amount === option.value
                  ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
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
            className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            placeholder="Zadejte částku v Kč"
          />
        )}
      </div>

      {/* Contact Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="v-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Vaše jméno
          </label>
          <input
            type="text"
            id="v-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            placeholder="Jan Novák"
          />
        </div>

        <div>
          <label htmlFor="v-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="v-email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            placeholder="jan@email.cz"
          />
        </div>
      </div>

      <div>
        <label htmlFor="v-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="v-phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="+420 123 456 789"
        />
      </div>

      {/* Recipient */}
      <div>
        <label htmlFor="v-recipient" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Pro koho je poukaz (nepovinné)
        </label>
        <input
          type="text"
          id="v-recipient"
          value={formData.recipient}
          onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="Např. pro maminku"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="v-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Věnování (nepovinné)
        </label>
        <textarea
          id="v-message"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="Např. K narozeninám s láskou..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 dark:bg-white px-6 py-4 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100"
      >
        {submitted ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Odesláno
          </span>
        ) : (
          'Objednat poukaz'
        )}
      </button>

      <p className="text-xs text-center text-slate-500 dark:text-slate-400">
        Po odeslání vás budeme kontaktovat s platebními údaji a podrobnostmi o vyzvednutí poukazu.
      </p>
    </form>
  )
}
