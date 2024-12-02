export default (now) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = now.getMonth()
    const monthText = months[month]

    return monthText
}