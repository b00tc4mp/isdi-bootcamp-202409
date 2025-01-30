import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default () => {
    try {
        // Generamos datos fake para usuarios y estadísticas
        const userStats = {
            totalUsers: 1000, // Número total de usuarios
            activeUsers: 800, // Usuarios que han iniciado sesión recientemente
            packsSold: 1500, // Número total de packs vendidos
            revenueGenerated: 75000, // Ingresos generados en euros
            mostActiveRegion: 'Europe', // Región más activa
            avgSessionDuration: '1h 30m', // Duración promedio de una sesión
        }

        // Validación opcional (si fuera necesaria)
        validate.number(userStats.totalUsers)
        validate.number(userStats.activeUsers)
        validate.number(userStats.packsSold)
        validate.number(userStats.revenueGenerated)
        validate.text(userStats.mostActiveRegion, 'mostActiveRegion')

        return userStats
    } catch (error) {
        if (error instanceof SystemError || error instanceof NotFoundError) {
            console.error('Error generating fake data:', error.message)
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}
