import Link from 'next/link'

type Props = {
  title: string
  description: string
  price: string
  category: string
  href: string
}

export default function ServiceCard({ title, description, price, category, href }: Props) {
  return (
    <Link
      href={href}
      className="ui-card ui-card-hover block overflow-hidden group"
      aria-label={`Zobrazit detail služby ${title}`}
    >
      <div className="p-6">
        <div className="mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{category}</div>
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 min-h-[3.5rem]">{title}</h3>
        </div>

        <p className="text-sm text-slate-600 line-clamp-3 mb-4 min-h-[4.5rem]">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">{price}</span>
          </div>
          <svg
            className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Šipka doprava</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
