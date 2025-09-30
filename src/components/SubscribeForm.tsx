'use client'
import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 dark:from-slate-800 to-white dark:to-slate-800 p-10 md:p-12 shadow-soft">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-4 py-1.5 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 shadow-sm">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Odběr novinek
          </div>
          <h3 className="mt-4 font-display text-2xl text-slate-900 dark:text-white md:text-[2rem] leading-tight">
            Sledujte naše <em className="italic">novinky a akce</em>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Přihlaste se k odběru novinek a získejte slevu 10% na první ošetření.
          </p>
        </div>
        <form onSubmit={submit} className="flex w-full flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.cz"
              className="flex-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-300 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg whitespace-nowrap"
            >
              Odeslat
            </button>
          </div>
          {submitted && (
            <p className="text-xs text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Děkujeme! Budeme vás informovat.
            </p>
          )}
        </form>
      </div>
      <div className="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-400 md:grid-cols-3 border-t border-slate-200 dark:border-slate-700 pt-6">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-slate-400 dark:text-slate-300 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Speciální akce
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-slate-400 dark:text-slate-300 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Tipy od expertů
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-slate-400 dark:text-slate-300 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Sleva 10% na první ošetření
        </div>
      </div>
    </div>
  )
}
