export default (cyclesStart) => {
    const validCyclesStart = cyclesStart
        .map(date => new Date(date))

    validCyclesStart.sort((a, b) => a - b)

    const durations = []
    for (let i = 1; i < validCyclesStart.length; i++) {
        const previousDate = validCyclesStart[i - 1]
        const currentDate = validCyclesStart[i]
        const durationInMilliseconds = currentDate - previousDate
        const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24)
        durations.push(durationInDays)
    }

    let averageCycleLength
    let ovulationDate
    let normalizedOvulationDate

    if (durations.length > 0) {
        averageCycleLength = durations.reduce((total, days) => total + days, 0) / durations.length

        if (isNaN(averageCycleLength)) {
            return null
        }
        const lastCycleStart = validCyclesStart[validCyclesStart.length - 1]

        ovulationDate = new Date(lastCycleStart)
        ovulationDate.setDate(ovulationDate.getDate() + averageCycleLength / 2)
        normalizedOvulationDate = Math.ceil((ovulationDate - new Date()) / (1000 * 60 * 60 * 24))
    }

    if (cyclesStart.length < 2) {
        averageCycleLength = 28
        ovulationDate = new Date(validCyclesStart)
        ovulationDate.setDate(ovulationDate.getDate() + averageCycleLength / 2)
        normalizedOvulationDate = Math.ceil((ovulationDate - new Date()) / (1000 * 60 * 60 * 24))

        return normalizedOvulationDate
    }

    return normalizedOvulationDate
}