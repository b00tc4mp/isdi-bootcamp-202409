export default date => {
    const messageDate = new Date(date)
    const now = new Date()

    // Normalize dates to midnight for accurate day comparison
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate())
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 7)

    if (messageDay.getTime() === today.getTime()) {
        return 'Today'
    } else if (messageDay.getTime() === yesterday.getTime()) {
        return 'Yesterday'
    } else if (messageDay > oneWeekAgo) {
        // Get the full name of the weekday (e.g., "Sunday")
        return messageDate.toLocaleDateString(undefined, { weekday: 'long' })
    } else {
        // Format as "DD MMMM YYYY" (e.g., "5 April 2025")
        const day = messageDate.getDate()
        const month = messageDate.toLocaleDateString(undefined, { month: 'long' })
        const year = messageDate.getFullYear()
        return `${day} ${month} ${year}`
    }
}