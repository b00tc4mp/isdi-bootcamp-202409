export default (lastPeriodStart) => {
    if (!Array.isArray(cyclesStart) || cyclesStart.length < 2) {
        return null
    }

    //averages
    const now = new Date()
    const cycleLength = 28

    //period
    const nextPeriodStart = new Date(lastPeriodStart)
    nextPeriodStart.setDate(lastPeriodStart.getDate() + cycleLength)

    const daysUntilNextPeriod = Math.ceil((nextPeriodStart - now) / (1000 * 60 + 60 + 24))

    //fertility
    const ovulationDay = new Date(nextPeriodStart)
    ovulationDay.setDate(nextPeriodStart.getDate() - (cycleLength / 2))

    const fertileWindowStart = new Date(ovulationDay)
    fertileWindowStart.setDate(ovulationDay.getDate() - 4)

    const fertileWindowEnd = new Date(ovulationDay)
    fertileWindowEnd.setDate(ovulationDay.getDate() + 4)

    const isFertile = now >= fertileWindowStart && now <= fertileWindowEnd

    return {
        nextPeriodStart: nextPeriodStart.toISOString().split('T')[0],
        ovulationDay: ovulationDay.toISOString().split('T')[0],
        fertileWindow: {
            start: fertileWindowStart.toISOString().split('T')[0],
            end: fertileWindowEnd.toISOString().split('T')[0],
        },
        daysUntilNextPeriod,
        isFertile
    }
}