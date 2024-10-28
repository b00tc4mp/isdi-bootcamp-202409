export default fromDateString => {
    const date = new Date(fromDateString)
    const now = new Date

    const diff = now - date

    const secs = Math.floor(diff / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(weeks / 4)
    const years = Math.floor(months / 12)

    return `${years > 0 ? `${years}y ` : ''}${months < 12 && months > 0 ? `${months}m ` : ''}${weeks < 4 && weeks > 0 ? `${weeks}w ` : ''}${days < 7 && days > 0 ? `${days}d ` : ''}${hours < 24 && hours > 0 ? `${hours}h ` : ''}${mins < 60 && mins > 0 ? `${mins}m ` : ''}${secs < 60 ? `${secs}s` : ''}`
}