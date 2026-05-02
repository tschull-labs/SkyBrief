export default function CompassRose({ windDirection, windSpeed }) {
  const isVariable = windDirection == null || windDirection === 'VRB'
  const deg = isVariable ? 0 : Number(windDirection)
  const cx = 100, cy = 100, r = 78

  const ticks = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 10 * Math.PI) / 180
    const isMajor = i % 3 === 0
    const inner = r - (isMajor ? 10 : 5)
    return {
      x1: cx + Math.sin(angle) * inner,
      y1: cy - Math.cos(angle) * inner,
      x2: cx + Math.sin(angle) * r,
      y2: cy - Math.cos(angle) * r,
      isMajor,
    }
  })

  const cardinals = [
    { label: 'N', angle: 0 }, { label: 'E', angle: 90 },
    { label: 'S', angle: 180 }, { label: 'W', angle: 270 },
  ].map(({ label, angle }) => {
    const rad = (angle * Math.PI) / 180
    return { label, x: cx + Math.sin(rad) * (r - 20), y: cy - Math.cos(rad) * (r - 20) }
  })

  return (
    <div className="flex justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx={cx} cy={cy} r={r} fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5" />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.isMajor ? '#D97706' : '#FCD34D'}
            strokeWidth={t.isMajor ? 1.5 : 1} />
        ))}
        {cardinals.map(c => (
          <text key={c.label} x={c.x} y={c.y} textAnchor="middle" dominantBaseline="central"
            fontSize="11" fontWeight="800" fill="#92400E" fontFamily="Inter, sans-serif">
            {c.label}
          </text>
        ))}

        <circle cx={cx} cy={cy} r="5" fill="#F59E0B" />

        {!isVariable && (
          <g transform={`rotate(${deg}, ${cx}, ${cy})`}>
            <polygon points={`${cx},${cy - 58} ${cx - 8},${cy + 12} ${cx},${cy - 4} ${cx + 8},${cy + 12}`}
              fill="#F59E0B" opacity="0.95" />
            <polygon points={`${cx},${cy + 32} ${cx - 5},${cy + 12} ${cx + 5},${cy + 12}`}
              fill="#FCD34D" opacity="0.5" />
          </g>
        )}

        {isVariable && (
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
            fontSize="11" fontWeight="700" fill="#92400E" fontFamily="Inter, sans-serif">
            VRB
          </text>
        )}

        {!isVariable && windSpeed != null && (
          <text x={cx} y={cy + 52} textAnchor="middle" fontSize="9" fontWeight="700"
            fill="#92400E" fontFamily="Inter, sans-serif">
            {windSpeed} kt
          </text>
        )}
      </svg>
    </div>
  )
}
