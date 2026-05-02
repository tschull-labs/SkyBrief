export function deriveFlightCategory(ceilingFt, visibSM) {
  const ceil = ceilingFt ?? Infinity
  const vis = visibSM ?? Infinity

  if (ceil < 500 || vis < 1) return 'LIFR'
  if (ceil < 1000 || vis < 3) return 'IFR'
  if (ceil <= 3000 || vis <= 5) return 'MVFR'
  return 'VFR'
}
