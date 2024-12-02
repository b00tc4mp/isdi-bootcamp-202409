export default (now) => {
    const year = now.getFullYear()
    const month = now.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate() //31 ==> returns num of days of the month
    const days = []

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day)
    }

    return days
}