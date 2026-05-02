export default function CompassRose({ windDirection, windSpeed }) {
  const isVariable = windDirection == null || windDirection === 'VRB'
  const deg = isVariable ? 0 : Number(windDirection)

  const cx = 100
  const cy = 100
  const r = 80

  const ticks = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 10 * Math.PI) / 180
    const isMajor = i % 3 === 0
    const inner = r - (isMajor ? 10 : 5)
    const x1 = cx + Math.sin(angle) * inner
    const y1 = cy - Math.cos(angle) * inner
    const x2 = cx + Math.sin(angle) * r
    const y2 = cy - Math.cos(angle) * r
    return { x1, y1, x2, y2, isMajor }
  })

  const cardinals = [
    { label: 'N', angle: 0 },
    { label: 'E', angle: 90 },
    { label: 'S', angle: 180 },
    { label: 'W', angle: 270 },
  ].map(({ label, angle }) => {
    const rad = (angle * Math.PI) / 180
    const dist = r - 22
    return {
      label,
      x: cx + Math.sin(rad) * dist,
      y: cy - Math.cos(rad) * dist,
    }
  })

  return (
    <div className="flex justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-sm">
        {/* Background circle */}
        <circle cx={cx} cy={cy} r={r} fill="rgba(186,230,253,0.2)" stroke="rgba(186,230,253,0.5)" strokeWidth="1.5" />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.isMajor ? 'rgba(100,149,185,0.7)' : 'rgba(148,195,220,0.5)'}
            strokeWidth={t.isMajor ? 1.5 : 1} />
        ))}

        {/* Cardinal labels */}
        {cardinals.map(c => (
          <text key={c.label} x={c.x} y={c.y} textAnchor="middle" dominantBaseline="central"
            fontSize="12" fontWeight="600" fill="rgba(30,80,120,0.8)" fontFamily="Inter, sans-serif">
            {c.label}
          </text>
        ))}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill="rgba(56,149,213,0.4)" />

        {/* Wind arrow */}
        {!isVariable && (
          <g transform={`rotate(${deg}, ${cx}, ${cy})`}>
            <polygon
              points={`${cx},${cy - 60} ${cx - 8},${cy + 10} ${cx},${cy - 5} ${cx + 8},${cy + 10}`}
              fill="#0ea5e9"
              opacity="0.9"
            />
            <polygon
              points={`${cx},${cy + 30} ${cx - 5},${cy + 10} ${cx + 5},${cy + 10}`}
              fill="rgba(14,165,233,0.35)"
            />
          </g>
        )}

        {/* Variable wind indicator */}
        {isVariable && (
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
            fontSize="11" fill="rgba(30,80,120,0.6)" fontFamily="Inter, sans-serif">
            VRB
          </text>
        )}

        {/* Speed label */}
        {!isVariable && windSpeed != null && (
          <text x={cx} y={cy + 52} textAnchor="middle" fontSize="10" fill="rgba(30,80,120,0.6)" fontFamily="Inter, sans-serif">
            {windSpeed} kt
          </text>
        )}
      </svg>
    </div>
  )
}
