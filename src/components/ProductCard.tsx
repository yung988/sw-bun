import Image from 'next/image'

type Props = {
  image: string
  title: string
  subtitle?: string
  price?: string
}

export default function ProductCard({ image, title, subtitle, price }: Props) {
  return (
    <div className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-faint bg-white/90 p-4 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[calc(var(--radius-lg)-0.75rem)] bg-[#f3ede3]">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium tracking-tight text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        {price && <div className="pt-1 text-sm font-semibold text-slate-900">{price}</div>}
      </div>
    </div>
  )
}
