export default (cyclesStart) => {
    // Convertir fechas a objetos Date
    const normalizedCyclesStart = cyclesStart.map(date => new Date(date))

    // Ordenar de más antigua a más reciente
    normalizedCyclesStart.sort((a, b) => a - b)

    // Calcular duraciones entre ciclos consecutivos
    const cycleLengths = normalizedCyclesStart
        .slice(1)
        .map((date, i) => (date - normalizedCyclesStart[i]) / (1000 * 60 * 60 * 24))

    // Calcular la duración promedio de los ciclos
    let averageCycleLength = cycleLengths.length > 0
        ? cycleLengths.reduce((sum, days) => sum + days, 0) / cycleLengths.length
        : 28 // Si solo hay un ciclo, usar 28 días por defecto

    // Calcular el próximo inicio de ciclo
    let nextPeriodStart
    if (normalizedCyclesStart.length > 1) {
        nextPeriodStart = new Date(normalizedCyclesStart[normalizedCyclesStart.length - 1])
        nextPeriodStart.setDate(nextPeriodStart.getDate() + averageCycleLength)
    } else {
        // Si solo hay un ciclo, ajusta el próximo inicio usando la duración de ese ciclo
        nextPeriodStart = new Date(normalizedCyclesStart[0])
        nextPeriodStart.setDate(nextPeriodStart.getDate() + averageCycleLength)
    }

    // Calcular los días hasta el próximo período
    let daysUntilNextPeriod = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24))

    // Si la duración de un solo ciclo supera los 28 días, asegúrate de que el cálculo sea correcto
    if (normalizedCyclesStart.length === 1 && averageCycleLength >= 28) {
        daysUntilNextPeriod = Math.ceil((nextPeriodStart - new Date()) / (1000 * 60 * 60 * 24))
    }

    return daysUntilNextPeriod
}