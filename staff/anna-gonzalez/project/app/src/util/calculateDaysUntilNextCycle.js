export default (cyclesStart) => {
    const normalizedCyclesStart = cyclesStart.map(date => new Date(date))

    //order from older to more recent
    normalizedCyclesStart.sort((a, b) => a - b)

    //calculate durations between consecutive cycles
    const cycleLengths = normalizedCyclesStart
        .slice(1)
        .map((date, i) => (date - normalizedCyclesStart[i]) / (1000 * 60 * 60 * 24))

    //calculate average cycle duration
    let averageCycleLength = cycleLengths.length > 0
        ? cycleLengths.reduce((sum, days) => sum + days, 0) / cycleLengths.length
        : 28

    //calculate start of next cycle
    let nextPeriodStart

    if (normalizedCyclesStart.length > 1) {
        nextPeriodStart = new Date(normalizedCyclesStart[normalizedCyclesStart.length - 1])
        nextPeriodStart.setDate(nextPeriodStart.getDate() + averageCycleLength)
    } else {
        //if there's only a cycle, adjust the next start using that cycle's duration
        nextPeriodStart = new Date(normalizedCyclesStart[0])
        nextPeriodStart.setDate(nextPeriodStart.getDate() + averageCycleLength)
    }

    //calculate days until
    let daysUntilNextPeriod = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24))

    //if a cycle lasts more than 28 days, make sure the calculation is correct
    if (normalizedCyclesStart.length === 1 && averageCycleLength >= 28) {
        daysUntilNextPeriod = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24))
    }

    return daysUntilNextPeriod
}