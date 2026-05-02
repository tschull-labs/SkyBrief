export function getCloudLayers(metar) {
  const layers = []
  for (let i = 1; i <= 4; i++) {
    const cvg = metar[`cldCvg${i}`]
    const bas = metar[`cldBas${i}`]
    if (cvg && cvg !== 'CLR' && cvg !== 'SKC' && cvg !== 'CAVOK' && bas != null) {
      layers.push({
        coverage: cvg,
        baseFt: bas * 100,
        baseM: Math.round(bas * 100 * 0.3048),
      })
    }
  }
  return layers
}

export function knotsToKmh(kt) {
  return Math.round(kt * 1.852)
}

export function altimToInHg(hPa) {
  return (hPa / 33.8639).toFixed(2)
}

export function visibToMeters(sm) {
  if (sm >= 10) return null
  return Math.round(sm * 1609.34)
}

export function formatWindDir(wdir) {
  if (wdir === 'VRB' || wdir === null || wdir === undefined) return 'VRB'
  const num = Number(wdir)
  return `${String(num).padStart(3, '0')}°`
}

export function celsiusToFahrenheit(c) {
  return Math.round(c * 9 / 5 + 32)
}

export function coverageLabel(cvg) {
  const map = {
    FEW: 'Few',
    SCT: 'Scattered',
    BKN: 'Broken',
    OVC: 'Overcast',
    CLR: 'Clear',
    SKC: 'Sky Clear',
    CAVOK: 'CAVOK',
    OVX: 'Sky Obscured',
  }
  return map[cvg] ?? cvg
}
