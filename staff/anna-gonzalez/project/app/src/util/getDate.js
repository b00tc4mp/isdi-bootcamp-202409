export default (selectedDay, selectedMonth, selectedYear) => {
    const day = selectedDay
    const month = selectedMonth
    const year = selectedYear
    const date = new Date(year, month, day)

    return date
}