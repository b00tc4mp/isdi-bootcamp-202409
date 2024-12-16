export default (cycle) => {
    const { start, end } = cycle

    // Si el ciclo ya ha terminado
    if (end) {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) // Diferencia en días
        return `${duration} days`
    }

    // Si el ciclo no ha terminado
    const currentDate = new Date()
    const startDate = new Date(start)
    const durationInProgress = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) // Diferencia en días
    return `${durationInProgress} days (in progress)`
}