type Props = {
  icon: React.ReactNode
  label: string
  value: string
}

export default function ContactInfoCard({ icon, label, value }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-900">{label}</div>
        <div className="text-sm text-slate-600">{value}</div>
      </div>
    </div>
  )
}

