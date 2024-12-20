export default (dateNow) => {
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day)
    }

    return days
}