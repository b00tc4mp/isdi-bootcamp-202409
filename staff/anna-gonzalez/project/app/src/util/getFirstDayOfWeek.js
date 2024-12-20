export default (now) => {
    const year = now.getFullYear()
    const month = now.getMonth()
    const firstDayOfWeek = new Date(year, month, 1)
    const dayOfWeek = firstDayOfWeek.getDay()
    const adjustedDayOfWeek = (dayOfWeek === 0) ? 6 : dayOfWeek - 1

    return adjustedDayOfWeek
}