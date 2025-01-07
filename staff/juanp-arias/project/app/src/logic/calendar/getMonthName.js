export default (dateNow) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = dateNow.getMonth()
    const monthText = months[month]

    return monthText
}