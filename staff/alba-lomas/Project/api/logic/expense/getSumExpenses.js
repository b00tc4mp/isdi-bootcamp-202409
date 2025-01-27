


import { Expense, User } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default async (userId) => {
    // Validación del ID de usuario
    validate.id(userId, 'userId')

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new NotFoundError('Usuario no encontrado')
        }

        // Obtener los gastos del usuario
        const expenses = await Expense.find({ author: userId }).lean()

        // Verificar si el usuario tiene gastos
        if (expenses.length === 0) {
            throw new NotFoundError('No se encontraron gastos para este usuario')
        }

        // Sumar los gastos por tipo
        const totalsByType = expenses.reduce((totals, expense) => {
            totals[expense.type] = (totals[expense.type] || 0) + expense.amount
            return totals
        }, {})

        return totalsByType

    } catch (error) {
        // Capturar y manejar errores
        if (error instanceof NotFoundError) {
            throw error // Lanzamos el error de tipo NotFoundError tal cual
        }
        // En otros casos, lanzamos un error genérico del sistema
        throw new SystemError(`Error al obtener los gastos: ${error.message}`)
    }
}