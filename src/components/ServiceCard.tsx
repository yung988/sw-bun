'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  title: string
  description: string
  price: string
  category: string
  href: string
}

const MotionLink = motion.create(Link)

export default function ServiceCard({ title, description, price, category, href }: Props) {
  return (
    <MotionLink
      href={href}
      className="block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card"
      whileHover={{
        y: -8,
        scale: 1.01,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="p-6">
        <div className="mb-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{category}</div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 min-h-[3.5rem]">{title}</h3>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 min-h-[4.5rem]">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{price}</span>
          </div>
          <motion.svg
            className="h-4 w-4 text-slate-400 dark:text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <title>Šipka doprava</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </div>
      </div>
    </MotionLink>
  )
}
