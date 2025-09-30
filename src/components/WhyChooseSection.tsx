import Image from 'next/image'

type WhyItem = {
  icon: string
  title: string
  description: string
  tags?: string[]
}

type WhyChooseSectionProps = {
  eyebrow?: string
  title: string
  titleItalic?: string
  subtitle?: string
  items: WhyItem[]
  centerImage: string
}

export default function WhyChooseSection({
  eyebrow,
  title,
  titleItalic,
  subtitle,
  items,
  centerImage,
}: WhyChooseSectionProps) {
  return (
    <section id="Why-Choose-Us" className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        {eyebrow && (
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">{eyebrow}</span>
            <span className="text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Why Choose Us
            </span>
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-4">
          {title} {titleItalic && <em className="italic">{titleItalic}</em>}
        </h2>
        {subtitle && <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      {/* Grid Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
        {/* Left Column */}
        <div className="space-y-8">
          {items.slice(0, 2).map((item, index) => (
            <div key={index} className="text-left">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3">{item.description}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-3xl">
          <Image src={centerImage} alt="Why Choose Us" fill className="object-cover" />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {items.slice(2, 4).map((item, index) => (
            <div key={index} className="text-left">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3">{item.description}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
