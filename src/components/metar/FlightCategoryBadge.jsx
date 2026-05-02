import { FLIGHT_CATEGORIES } from '../../constants/index.js'

export default function FlightCategoryBadge({ category, size = 'md', inverted = false }) {
  const cat = FLIGHT_CATEGORIES[category]
  if (!cat) return null

  if (inverted) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-white/20 text-white font-bold rounded-full px-3 py-1 text-sm border border-white/30">
        <span className="w-2 h-2 rounded-full bg-white shrink-0" />
        {cat.label}
      </span>
    )
  }

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3.5 py-1'

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold rounded-full ${sizeClasses} ${cat.badgeClass}`}>
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
      {cat.label}
    </span>
  )
}
