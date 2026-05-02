function SkeletonLine({ width = 'w-full', height = 'h-4' }) {
  return <div className={`skeleton-shimmer ${width} ${height}`} />
}

export default function SkeletonCard() {
  return (
    <div className="glass-card p-4 space-y-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonLine width="w-40" height="h-5" />
          <SkeletonLine width="w-24" height="h-3" />
        </div>
        <SkeletonLine width="w-14" height="h-7" />
      </div>

      <div className="flex justify-center">
        <div className="skeleton-shimmer w-32 h-32 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <SkeletonLine width="w-16" height="h-3" />
          <SkeletonLine width="w-24" height="h-6" />
        </div>
        <div className="space-y-1">
          <SkeletonLine width="w-20" height="h-3" />
          <SkeletonLine width="w-20" height="h-6" />
        </div>
      </div>

      <div className="space-y-2">
        <SkeletonLine width="w-20" height="h-3" />
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-3/4" height="h-4" />
      </div>
    </div>
  )
}
