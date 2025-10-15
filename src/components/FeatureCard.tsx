type Props = {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: Props) {
  return (
    <div className="text-center p-6 rounded-2xl border border-slate-200 bg-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-200 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
