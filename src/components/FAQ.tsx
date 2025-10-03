'use client'
import { useState } from 'react'

type Item = { q: string; a: string }

export default function FAQ({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div
          key={it.q}
          className={`rounded-2xl border transition-all duration-500 ${
            open === idx
              ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-lg'
              : 'border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
            aria-controls={`faq-answer-${idx}`}
            className="w-full text-left flex items-start justify-between gap-4 p-6 lg:p-7 group"
          >
            <span
              id={`faq-question-${idx}`}
              className="font-medium text-base lg:text-lg tracking-tight text-slate-900 dark:text-white transition-colors pr-4"
            >
              {it.q}
            </span>
            <span className="flex-shrink-0 mt-0.5">
              <svg
                className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-all duration-500 ${
                  open === idx
                    ? 'rotate-180 text-slate-700 dark:text-slate-300'
                    : 'group-hover:text-slate-600 dark:group-hover:text-slate-400'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Rozbalit</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div
            id={`faq-answer-${idx}`}
            role="region"
            aria-labelledby={`faq-question-${idx}`}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              open === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 lg:px-7 pb-6 lg:pb-7">
              <p className="text-sm lg:text-base leading-relaxed text-slate-600 dark:text-slate-400 pt-2">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
