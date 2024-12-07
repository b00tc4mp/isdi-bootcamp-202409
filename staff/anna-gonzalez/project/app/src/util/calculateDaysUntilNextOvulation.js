export default (cyclesStart) => {
    //convert to Date
    const normalizedCyclesStart = cyclesStart.map(date => new Date(date))

    //from older to more recent
    normalizedCyclesStart.sort((a, b) => a - b)

    const cycleLengths = []
    for (let i = 1; i < normalizedCyclesStart.length; i++) {
        const previousDate = normalizedCyclesStart[i - 1]
        const currentDate = normalizedCyclesStart[i]
        const durationInMilliseconds = currentDate - previousDate
        const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24)
        cycleLengths.push(durationInDays)
    }

    let averageCycleLength
    let ovulationDate
    let daysUntilNextOvulation

    if (cycleLengths.length > 0) {
        averageCycleLength = cycleLengths.reduce((total, days) => total + days, 0) / cycleLengths.length

        if (isNaN(averageCycleLength)) {
            return null
        }
        const lastCycleStart = normalizedCyclesStart[normalizedCyclesStart.length - 1]

        ovulationDate = new Date(lastCycleStart)
        ovulationDate.setDate(ovulationDate.getDate() + averageCycleLength / 2)
        daysUntilNextOvulation = Math.ceil((ovulationDate - new Date()) / (1000 * 60 * 60 * 24))
    }

    if (cyclesStart.length < 2) {
        averageCycleLength = 28
        ovulationDate = new Date(normalizedCyclesStart)
        ovulationDate.setDate(ovulationDate.getDate() + averageCycleLength / 2)
        daysUntilNextOvulation = Math.ceil((ovulationDate - new Date()) / (1000 * 60 * 60 * 24))

        return daysUntilNextOvulation
    }

    return daysUntilNextOvulation
}