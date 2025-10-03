'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Props = { image: string; title: string; excerpt?: string; category?: string; href?: string }

export default function BlogCard({ image, title, excerpt, category, href = '#' }: Props) {
  return (
    <Link href={href}>
      <motion.article
        className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card"
        whileHover={{
          y: -8,
          scale: 1.01,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            <Image src={image} alt={title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            {/* Hover overlay s ikonou */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3 backdrop-blur-sm shadow-lg"
              >
                <svg
                  className="h-5 w-5 text-slate-900 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="space-y-2 p-5">
          <div className="flex items-center justify-between">
            {category && (
              <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                {category}
              </span>
            )}
            <motion.svg
              className="h-4 w-4 text-slate-400 dark:text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <title>Šipka doprava</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>
          <h3 className="font-medium text-slate-900 dark:text-white tracking-tight transition-colors group-hover:text-slate-700 dark:group-hover:text-slate-200">
            {title}
          </h3>
          {excerpt && <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{excerpt}</p>}
        </div>
      </motion.article>
    </Link>
  )
}
