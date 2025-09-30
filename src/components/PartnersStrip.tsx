import Image from 'next/image'

export default function PartnersStrip() {
  const logos = [
    { src: '/images/logo.svg', alt: 'Logo partnera' },
    { src: '/logo.svg', alt: 'Logo partnera' },
    { src: '/images/logobonw.png', alt: 'Logo partnera' },
    { src: '/images/logo.svg', alt: 'Logo partnera' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-6 py-8 bg-slate-50 dark:bg-slate-800">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-300">
        Naši partneři
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
        {logos.map((l, index) => (
          <div key={`${l.src}-${index}`} className="relative h-8 w-28">
            <Image src={l.src} alt={l.alt} fill sizes="112px" className="object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
}
