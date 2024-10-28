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

    return `${years > 0 ? `${years} years ` : ''}
            ${months > 0 && months < 12 ? `${months} months ` : ''}
            ${weeks > 0 && weeks < 4 ? `${weeks} weeks ` : ''}
            ${days > 0 && days < 7 ? `${days} days ` : ''}
            ${hours > 0 && hours < 24 ? `${hours} hours ` : ''}
            ${mins > 0 && mins < 60 ? `${mins} minutes ` : ''}
            ${secs > 0 && secs < 60 ? `${secs} seconds ` : ''}
    `
}