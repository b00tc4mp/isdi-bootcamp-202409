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


    const time = [years, months, weeks, days, hours, mins, secs]
    const units = ['years', 'months', 'weeks', 'days', 'hours', 'mins', 'secs']
    const timeElapsed = time.find((a) => a > 0)
    const index = time.findIndex((a) => a > 0)
    const unit = units[index]
    const timeAgo = `${timeElapsed} ${unit} ago`
    return timeAgo
}