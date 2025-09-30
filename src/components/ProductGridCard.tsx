'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  image: string
  price: number
  title: string
  category: string
  href?: string
}

export default function ProductGridCard({ image, price, title, category, href = '#' }: Props) {
  return (
    <motion.a
      href={href}
      className="block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f3ede3]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image src={image} alt={title} fill sizes="256px" className="object-cover" />
        </motion.div>
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 dark:bg-slate-800/95 px-3 py-1 text-[11px] font-medium text-slate-900 dark:text-white shadow-soft">
          <span>{price.toLocaleString('cs-CZ')} Kč</span>
        </div>
      </div>
      <div className="grid gap-1 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">{category}</div>
          <motion.svg
            className="h-3 w-3 text-slate-400 dark:text-slate-300"
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
        <div className="text-sm font-medium text-slate-900 dark:text-white">{title}</div>
      </div>
    </motion.a>
  )
}
