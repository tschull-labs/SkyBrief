function Line({ w = 'w-full', h = 'h-4' }) {
  return <div className={`skeleton-shimmer ${w} ${h}`} />
}

export default function SkeletonCard() {
  return (
    <div className="glass-card p-5 space-y-5 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Line w="w-36" h="h-5" />
          <Line w="w-24" h="h-3" />
        </div>
        <Line w="w-16" h="h-8" />
      </div>
      <div className="flex justify-center">
        <div className="skeleton-shimmer w-28 h-28 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="space-y-1.5">
            <Line w="w-14" h="h-3" />
            <Line w="w-20" h="h-6" />
          </div>
        ))}
      </div>
    </div>
  )
}
