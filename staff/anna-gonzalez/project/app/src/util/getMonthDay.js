export default () => {
    const now = new Date()
    const dayOfMonth = now.getDate()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[now.getMonth()]
    const monthDay = `${month} ${dayOfMonth}`

    return monthDay
}