export default date => {
    const dateObj = new Date(date)

    // Array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const month = months[dateObj.getMonth()]
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()

    return `${month} ${day}, ${year}`
}