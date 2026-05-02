import { FLIGHT_CATEGORIES } from '../../constants/index.js'

export default function FlightCategoryBadge({ category, size = 'md' }) {
  const cat = FLIGHT_CATEGORIES[category]
  if (!cat) return null

  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5'
    : 'text-sm px-3 py-1'

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses} ${cat.badgeClass}`}>
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: cat.dotColor }}
      />
      {cat.label}
    </span>
  )
}
