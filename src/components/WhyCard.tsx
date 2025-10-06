'use client'
import { motion } from 'framer-motion'

type Props = { icon?: string; title: string; description: string; badges?: string[] }

export default function WhyCard({ icon, title, description, badges }: Props) {
  return (
    <motion.div
      className="rounded-2xl bg-slate-50  p-7"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {icon && (
        <motion.div
          className="mb-4 text-3xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span aria-hidden>{icon}</span>
        </motion.div>
      )}
      <div className="mb-3">
        <strong className="text-lg font-normal text-slate-900">{title}</strong>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      {badges && badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <motion.span
              key={badge}
              className="rounded-full border border-slate-200  bg-white  px-3 py-1 text-xs text-slate-600"
              whileHover={{ borderColor: 'rgb(148, 163, 184)' }}
              transition={{ duration: 0.2 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
