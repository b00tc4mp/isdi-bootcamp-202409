export default fromDateString => {
    const date = new Date(fromDateString)
    const now = new Date

    const diff = now - date

    const secs = Math.floor(diff / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    return `${years > 0 ? `${years} years ` : ''}${months < 12 && months > 0 ? `${months} months ` : ''}${days < 30 && days > 0 ? `${days} days ` : ''}${hours < 24 && hours > 0 ? `${hours} hours ` : ''}${mins < 60 && mins > 0 ? `${mins} minutes ` : ''}${secs < 60 ? `${secs} seconds` : ''}`
}