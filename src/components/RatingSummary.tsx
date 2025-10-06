import Image from 'next/image'

export default function RatingSummary() {
  const avatars = [
    '/images/team/sabina.jpg',
    '/images/salon/recepce.jpg',
    '/images/salon/cekarna.jpg',
    '/images/salon/logonazdi.jpg',
  ]
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex -space-x-3">
        {avatars.map((src) => (
          <div key={src} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white">
            <Image src={src} alt="avatar" fill sizes="32px" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="text-sm text-slate-600">
        <strong className="mr-1 text-slate-900">4,9</strong>z 1,5 tis. hodnocení
      </div>
    </div>
  )
}
