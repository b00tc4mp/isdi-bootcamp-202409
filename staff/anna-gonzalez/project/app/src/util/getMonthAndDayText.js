export default () => {
    const now = new Date()
    const dayOfMonth = now.getDate()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[now.getMonth()]
    const monthAndDayText = `${month} ${dayOfMonth}`

    return monthAndDayText
}