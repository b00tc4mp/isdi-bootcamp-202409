export default (fromDateString) => {
  const date = new Date(fromDateString)
  if (isNaN(date)) return "Fecha inválida"

  const now = new Date()
  const diff = date - now // Cambiamos el orden para detectar fechas futuras

  if (diff > 0) {
    // Evento en el futuro
    const secs = Math.floor(diff / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30.44) // Promedio de días en un mes
    const years = Math.floor(months / 12)

    // Devuelve el mayor rango temporal válido
    if (secs < 60) return `En ${secs} segundos`
    if (mins < 60) return `En ${mins} minutos`
    if (hours < 24) return `En ${hours} horas`
    if (days < 7) return `En ${days} días`
    if (weeks < 2) return `En ${weeks} semana`
    if (weeks < 4.35) return `En ${weeks} semanas`
    if (months < 2) return `En ${months} mes`
    if (months < 12) return `En ${months} meses`
    return `En ${years} años`
  }

  // Evento en el pasado
  const pastDiff = now - date
  const secs = Math.floor(pastDiff / 1000)
  const mins = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(months / 12)

  if (secs < 60) return `Hace ${secs} segundos`
  if (mins < 60) return `Hace ${mins} minutos`
  if (hours < 24) return `Hace ${hours} horas`
  if (days < 7) return `Hace ${days} días`
  if (weeks < 4.35) {
    const roundedWeeks = Math.round(weeks)
    return roundedWeeks === 1
      ? `Hace ${roundedWeeks} semana`
      : `Hace ${roundedWeeks} semanas`
  }

  if (months < 12) return `Hace ${months} meses`
  return `Hace ${years} años`
}
