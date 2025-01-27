


import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { params: { expenseId }, body: { amount, type, provider } } = req

    // Validación de datos
    if (!expenseId || !amount || isNaN(amount) || !type || !provider) {
        return res.status(400).send({ error: 'Todos los campos (expenseId, amount, type, provider) son obligatorios y válidos.' })
    }

    // Actualización del gasto
    return logic.updateExpense(expenseId, parseFloat(amount), type, provider)
        .then(() => res.status(200).send({ message: 'Gasto actualizado con éxito.' }))
        .catch(error => {
            console.error(error)

            if (error.name === 'ValidationError') {
                return res.status(400).send({ error: error.message })
            }

            res.status(500).send({ error: 'Error interno del servidor.' })
        })
})