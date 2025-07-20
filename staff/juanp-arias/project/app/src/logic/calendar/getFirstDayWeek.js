export default (dateNow) => {
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth()
    const firstDayWeek = new Date(year, month, 1)
    const day = firstDayWeek.getDay()
    const dayOfWeek = (day === 0) ? 6 : day - 1

    return dayOfWeek
}