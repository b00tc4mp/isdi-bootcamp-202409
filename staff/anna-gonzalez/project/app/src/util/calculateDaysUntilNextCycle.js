export default (cyclesStart) => {
    //convert to Date
    const validCyclesStart = cyclesStart.map(date => new Date(date))

    //order from older to more recent
    validCyclesStart.sort((a, b) => a - b)
    //calculate days between two consecutive dates
    const durations = validCyclesStart.slice(1).map((date, i) => (date - validCyclesStart[i]) / (1000 * 60 * 60 * 24))

    //calculate durations average
    let averageCycleLength = durations.reduce((sum, days) => sum + days, 0) / durations.length
    //set next period start
    let nextPeriodStart = new Date(validCyclesStart[validCyclesStart.length - 1])
    nextPeriodStart.setDate(nextPeriodStart.getDate() + averageCycleLength)

    let daysUntilNextPeriod = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24))

    if (cyclesStart.length < 2) {
        averageCycleLength = 28
        nextPeriodStart = new Date(validCyclesStart)
        nextPeriodStart.setDate(nextPeriodStart.getDate() + averageCycleLength)

        daysUntilNextPeriod = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24))

        return daysUntilNextPeriod
    }

    return daysUntilNextPeriod
}