export default (cyclesStart) => {
    if (!cyclesStart || cyclesStart.length === 0) return null

    //convert dates to Date objects
    const normalizedCyclesStart = cyclesStart.map(date => new Date(date))

    //from older to more recent
    normalizedCyclesStart.sort((a, b) => a - b)

    //calculate durations between consecutive cycles
    const cycleLengths = normalizedCyclesStart
        .slice(1)
        .map((date, i) => (date - normalizedCyclesStart[i]) / (1000 * 60 * 60 * 24))

    //calculate average duration of cycles
    const averageCycleLength =
        cycleLengths.length > 0
            ? cycleLengths.reduce((sum, days) => sum + days, 0) / cycleLengths.length
            : 28

    const today = new Date()
    const lastCycleStart = normalizedCyclesStart[normalizedCyclesStart.length - 1]
    const daysSinceStart = Math.floor((today - lastCycleStart) / (1000 * 60 * 60 * 24))
    const phaseLength = averageCycleLength / 4

    if (daysSinceStart < phaseLength) {
        return 'Menstrual phase'
    } else if (daysSinceStart < phaseLength * 2) {
        return 'Follicular phase'
    } else if (daysSinceStart < phaseLength * 3) {
        return 'Ovulation phase'
    } else if (daysSinceStart < averageCycleLength) {
        return 'Luteal phase'
    } else {
        return `Luteal phase (day ${daysSinceStart})`
    }
}