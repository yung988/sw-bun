'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = { quote: string; name: string; stars?: number; avatarSrc?: string }

export default function TestimonialCard({ quote, name, stars = 5, avatarSrc }: Props) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <motion.div
      className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-1 text-amber-400" aria-label={`Hodnocení: ${stars} z 5 hvězdiček`}>
        {[...Array(stars)].map((_, i) => (
          <svg
            key={`${name.replace(/\s/g, '')}-star-${i + 1}`}
            className="h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <title>Hvězdička</title>
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{quote}</p>
      <div className="mt-auto flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-slate-700 shadow-sm bg-slate-100 dark:bg-slate-700">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={name} fill sizes="40px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400">
              {initials}
            </div>
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-slate-900 dark:text-white">{name}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Zákazník</div>
        </div>
      </div>
    </motion.div>
  )
}
