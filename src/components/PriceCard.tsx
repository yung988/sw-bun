import { motion } from 'framer-motion'
import React from 'react'

type Props = {
  title: string
  price: string
  sessions?: string
  description?: string
}

export default function PriceCard({ title, price, sessions, description }: Props) {
  return (
    <motion.div
      className="group relative h-full card-soft p-6"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white">{title}</h4>
        <div className="shrink-0 rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-900 dark:text-white shadow-soft">
          {price}
        </div>
      </div>
      {sessions && (
        <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
          {sessions} sezení
        </div>
      )}
      {description && <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
    </motion.div>
  )
}
