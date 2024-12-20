export default function calculateDistance([firstLat, firstLong], [secLat, secLong]) {
  const R = 6371
  const dLat = ((secLat - firstLat) * Math.PI) / 180
  const dLon = ((secLong - firstLong) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((firstLat * Math.PI) / 180) *
    Math.cos((secLat * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}