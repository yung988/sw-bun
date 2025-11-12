type LoadingSkeletonProps = {
  type?: 'text' | 'card' | 'image' | 'list'
  lines?: number
  className?: string
}

export default function LoadingSkeleton({ type = 'text', lines = 3, className = '' }: LoadingSkeletonProps) {
  if (type === 'text') {
    return (
      <div className={`animate-pulse space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-slate-200 rounded ${
              i === lines - 1 ? 'w-3/4' : i === 0 ? 'w-full' : 'w-5/6'
            }`}
          />
        ))}
      </div>
    )
  }

  if (type === 'card') {
    return (
      <div className={`animate-pulse rounded-2xl border border-slate-200 bg-white p-6 ${className}`}>
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-full mb-2" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`} style={{ aspectRatio: '16/9' }} />
    )
  }

  if (type === 'list') {
    return (
      <div className={`animate-pulse space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 bg-slate-200 rounded flex-shrink-0" />
            <div className="h-4 bg-slate-200 rounded flex-1" />
          </div>
        ))}
      </div>
    )
  }

  return null
}


