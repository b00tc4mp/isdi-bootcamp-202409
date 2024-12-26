export default fromDateString => {
    const date = new Date(fromDateString)
    const now = new Date

    const diff = now - date

    console.log(typeof (diff) + ' ' + diff)

    const secs = Math.floor(diff / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)

    const remainingMins = mins % 60;
    const remainingSecs = secs % 60;

    return [`${hours}:${remainingMins}:${remainingSecs}`, diff]
}