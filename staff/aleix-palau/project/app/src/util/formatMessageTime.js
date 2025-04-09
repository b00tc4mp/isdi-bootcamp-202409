export default timestamp => {
    if (!timestamp) return ''

    const messageDate = new Date(timestamp)
    const now = new Date()

    // Helper function to check if it's the same day
    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
    }

    // If it's today, return time in hours:minutes format
    if (isSameDay(messageDate, now)) {
        return messageDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase()
    }

    // Calculate time differences
    const diff = now - messageDate
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    // Helper to create simple plural forms
    const plural = (value, unit) =>
        value === 1 ? `1 ${unit}` : `${value} ${unit}s`

    // Check if it's yesterday
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (isSameDay(messageDate, yesterday)) {
        return 'Yesterday'
    }

    // Return appropriate time format based on elapsed time
    if (days < 7) {
        return `${plural(days, 'day')} ago`
    } else if (weeks < 4) {
        return `${plural(weeks, 'week')} ago`
    } else if (months < 12) {
        return `${plural(months, 'month')} ago`
    } else {
        return `${plural(years, 'year')} ago`
    }
}