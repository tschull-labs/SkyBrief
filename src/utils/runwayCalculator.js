export function getActiveRunway(wdir, wspd) {
  if (wdir === 'VRB' || wdir === null || wdir === undefined) {
    return { type: 'variable' }
  }

  const speed = Number(wspd ?? 0)
  if (speed < 3) {
    return { type: 'calm' }
  }

  const dir = Number(wdir)
  let rwy = Math.round(dir / 10) % 36
  if (rwy === 0) rwy = 36

  let reciprocal = rwy <= 18 ? rwy + 18 : rwy - 18

  return {
    type: 'normal',
    active: rwy,
    reciprocal,
    windDir: dir,
    windSpeed: speed,
  }
}

export function formatRunway(num) {
  return String(num).padStart(2, '0')
}
