// import { getLastCycleStart } from "../../api/logic/cycles"

// export default () => {
//     const now = new Date()

//     const lastCycleStart = getLastCycleStart()
//     const lastPeriodStart = new Date(lastCycleStart)
//     const cycleLength = 28

//     const nextPeriodStart = new Date(lastPeriodStart)
//     nextPeriodStart.setDate(lastPeriodStart.getDate() + cycleLength)

//     const daysUntilNextPeriod = Math.ceil((nextPeriodStart - now) / (1000 * 60 * 60 * 24))

//     return daysUntilNextPeriod
// }