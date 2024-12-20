export default (start, end) => {
    if (!start || !end) return null

    const startDate = new Date(start)
    const endDate = new Date(end)

    //difference in milliseconds
    const durationInMs = endDate - startDate

    //convert from milliseconds to days (1000 ms * 60 s * 60 min * 24 hrs)
    const durationInDays = (durationInMs / (1000 * 60 * 60 * 24) + 1)

    return durationInDays
}