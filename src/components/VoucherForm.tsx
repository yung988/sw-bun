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
    design: 'elegant', // 'elegant' nebo 'modern'
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

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
        design: 'elegant',
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
    <div className="p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Helper text */}
        <div className="pb-2">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Objednejte dárkový poukaz na libovolnou částku. Platnost 12 měsíců, použitelný na všechny služby.
          </p>
        </div>

        {/* Success message */}
        {submitted && (
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 flex items-start gap-4">
            <svg
              className="h-6 w-6 text-slate-900 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Úspěch</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-medium text-slate-900 text-base">Objednávka odeslána!</p>
              <p className="text-slate-700 text-sm mt-2 leading-relaxed">Děkujeme! Brzy Vás budeme kontaktovat s platebními údaji.</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-5 sm:p-6 flex items-start gap-4">
            <svg
              className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5"
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
            <p className="text-red-800 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Design Selection */}
        <div className="space-y-4">
          <span className="block text-sm font-semibold text-slate-900 tracking-wide">Vyberte design poukazu</span>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, design: 'elegant' })}
              className={`rounded-2xl border-2 px-5 py-5 text-sm font-medium transition-all duration-200 ${
                formData.design === 'elegant'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="font-semibold text-base">Světlý</div>
                <div className="text-xs opacity-70">Jemné barvy</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, design: 'modern' })}
              className={`rounded-2xl border-2 px-5 py-5 text-sm font-medium transition-all duration-200 ${
                formData.design === 'modern'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="font-semibold text-base">Tmavý</div>
                <div className="text-xs opacity-70">Luxusní černý</div>
              </div>
            </button>
          </div>
        </div>

        {/* Preview Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {showPreview ? 'Skrýt náhled poukazu' : 'Zobrazit náhled poukazu'}
        </button>

        {/* Live Preview - Collapsible */}
        {showPreview && (
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm">
            {formData.design === 'elegant' ? (
              <div className="aspect-[3/2] bg-gradient-to-br from-slate-50 via-white to-amber-50 p-8 sm:p-10 flex flex-col justify-between relative">
                <div className="text-left relative z-10">
                  <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">Dárkový poukaz</div>
                  <div className="text-3xl sm:text-4xl font-light text-slate-900">SW Beauty</div>
                </div>
                <div className="relative z-10">
                  {formData.recipient && (
                    <div className="text-sm text-slate-600 mb-2">Pro: {formData.recipient}</div>
                  )}
                  {formData.message && (
                    <div className="text-sm italic text-slate-600 mb-4 max-w-md leading-relaxed">"{formData.message}"</div>
                  )}
                </div>
                <div className="text-right relative z-10">
                  <div className="text-4xl sm:text-5xl font-light text-slate-900">
                    {formData.amount === 'custom' && formData.customAmount
                      ? `${formData.customAmount} Kč`
                      : `${formData.amount} Kč`}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">Platnost 12 měsíců</div>
                </div>
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-amber-100/50 blur-3xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-slate-100/50 blur-3xl" />
              </div>
            ) : (
              <div className="aspect-[3/2] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 flex flex-col justify-between relative">
                <div className="text-left relative z-10">
                  <div className="text-xs uppercase tracking-widest text-white/60 mb-3">Dárkový poukaz</div>
                  <div className="text-3xl sm:text-4xl font-light text-white">SW Beauty</div>
                </div>
                <div className="relative z-10">
                  {formData.recipient && (
                    <div className="text-sm text-white/80 mb-2">Pro: {formData.recipient}</div>
                  )}
                  {formData.message && (
                    <div className="text-sm italic text-white/80 mb-4 max-w-md leading-relaxed">"{formData.message}"</div>
                  )}
                </div>
                <div className="text-right relative z-10">
                  <div className="text-4xl sm:text-5xl font-light text-white">
                    {formData.amount === 'custom' && formData.customAmount
                      ? `${formData.customAmount} Kč`
                      : `${formData.amount} Kč`}
                  </div>
                  <div className="text-xs text-white/60 mt-2">Platnost 12 měsíců</div>
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-700/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-700/20 to-transparent rounded-full blur-3xl" />
              </div>
            )}
          </div>
        )}

        {/* Amount Selection */}
        <div className="space-y-4">
          <span className="block text-sm font-semibold text-slate-900 tracking-wide">Hodnota poukazu</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {voucherAmounts.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, amount: option.value })}
                className={`rounded-2xl border-2 px-5 py-4 text-sm font-medium transition-all duration-200 ${
                  formData.amount === option.value
                    ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md'
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
              className="mt-4 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:shadow-md"
              placeholder="Zadejte částku v Kč"
            />
          )}
        </div>

        {/* Contact Info */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label htmlFor="v-name" className="block text-sm font-semibold text-slate-900 tracking-wide">
              Vaše jméno
            </label>
            <input
              type="text"
              id="v-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:shadow-md"
              placeholder="Jan Novák"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="v-email" className="block text-sm font-semibold text-slate-900 tracking-wide">
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
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:shadow-md"
              placeholder="jan@email.cz"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="v-phone" className="block text-sm font-semibold text-slate-900 tracking-wide">
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
            className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:shadow-md"
            placeholder="+420 773 577 899"
          />
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">Pro domluvení platby a předání poukazu</p>
        </div>

        {/* Recipient */}
        <div className="space-y-3">
          <label htmlFor="v-recipient" className="block text-sm font-semibold text-slate-900 tracking-wide">
            Pro koho je poukaz <span className="text-slate-500 font-normal">(nepovinné)</span>
          </label>
          <input
            type="text"
            id="v-recipient"
            value={formData.recipient}
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:shadow-md"
            placeholder="Např. pro maminku"
          />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <label htmlFor="v-message" className="block text-sm font-semibold text-slate-900 tracking-wide">
            Věnování <span className="text-slate-500 font-normal">(nepovinné)</span>
          </label>
          <textarea
            id="v-message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:shadow-md resize-none"
            placeholder="Např. K narozeninám s láskou..."
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-slate-900 px-8 py-5 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Odesílám...' : 'Objednat poukaz'}
          </button>
        </div>
      </form>
    </div>
  )
}
