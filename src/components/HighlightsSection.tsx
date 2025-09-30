type Highlight = {
  icon: string
  title: string
  description: string
}

type HighlightsSectionProps = {
  highlights: Highlight[]
  eyebrow?: string
  title: string
  titleItalic?: string
  images?: string[]
}

export default function HighlightsSection({
  highlights,
  eyebrow,
  title,
  titleItalic,
  images,
}: HighlightsSectionProps) {
  return (
    <section id="highlights" className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        {eyebrow && (
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">{eyebrow}</span>
            <span className="text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">Highlights</span>
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white">
          {title} {titleItalic && <em className="italic">{titleItalic}</em>}
        </h2>
        {images && images.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700"
                style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Highlights Grid */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center text-2xl">{highlight.icon}</div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-white">{highlight.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
