export default (cyclesStart) => {
    if (!Array.isArray(cyclesStart) || cyclesStart.length < 2) {
        return null
    }

    const validCyclesStart = cyclesStart
        .map(date => new Date(date))
        .filter(date => !isNaN(date))

    if (validCyclesStart.length < 2) {
        return null
    }

    validCyclesStart.sort((a, b) => a - b)

    const durations = []
    for (let i = 1; i < validCyclesStart.length; i++) {
        const previousDate = validCyclesStart[i - 1]
        const currentDate = validCyclesStart[i]
        const durationInMilliseconds = currentDate - previousDate
        const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24)
        durations.push(durationInDays)
    }

    const averageCycleLength = durations.reduce((total, days) => total + days, 0) / durations.length

    return averageCycleLength
}