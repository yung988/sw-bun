import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  description: string
  price: string
  category: string
  href: string
  image?: string
  compact?: boolean // Pro použití v carouselu na hlavní stránce
}

export default function ServiceCard({ title, description, price, category, href, image, compact = false }: Props) {
  const cardClasses = compact
    ? 'group block w-[320px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1'
    : 'group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1'

  return (
    <Link href={href} className={cardClasses} aria-label={`Zobrazit detail služby ${title}`}>
      {/* Image Section - jen pro compact verzi */}
      {compact && (
        <div className="relative aspect-[4/3] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="320px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-4xl opacity-50">✨</div>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className={compact ? 'p-6' : 'p-6'}>
        <div className="mb-4">
          <div
            className={`text-xs ${compact ? 'uppercase tracking-wide' : 'text-slate-500 uppercase tracking-wider'} font-medium mb-2`}
          >
            {category}
          </div>
          <h3
            className={`text-lg font-semibold text-slate-900 ${compact ? 'line-clamp-2' : 'line-clamp-2 min-h-[3.5rem]'}`}
          >
            {title}
          </h3>
        </div>

        <p className={`text-sm text-slate-600 mb-4 ${compact ? 'line-clamp-2' : 'line-clamp-3 min-h-[4.5rem]'}`}>
          {description}
        </p>

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
