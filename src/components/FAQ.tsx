'use client'
import { useState } from 'react'

type Item = { q: string; a: string }

export default function FAQ({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
      {items.map((it, idx) => (
        <div key={it.q} className="p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700">
          <button
            type="button"
            className="w-full text-left flex items-center justify-between gap-4 group"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="font-medium tracking-tight text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200">
              {it.q}
            </span>
            <span
              className="text-xl text-slate-400 dark:text-slate-300 transition-transform duration-200"
              style={{ transform: open === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              +
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: open === idx ? '500px' : '0',
              opacity: open === idx ? 1 : 0,
            }}
          >
            <p className="pt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
