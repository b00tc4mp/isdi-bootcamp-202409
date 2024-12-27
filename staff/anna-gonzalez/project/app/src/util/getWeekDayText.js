export default () => {
    const now = new Date()
    const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    const weekDayText = weekDays[now.getDay()]

    return weekDayText
}