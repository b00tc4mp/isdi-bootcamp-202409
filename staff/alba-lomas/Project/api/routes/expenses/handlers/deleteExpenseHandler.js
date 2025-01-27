


import logic from "../../../logic/index.js"
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { expenseId } } = req

    // Llamamos a la lógica de eliminación del gasto
    return logic.deleteExpense(userId, expenseId)
        .then(() => res.status(204).send())  // Si se eliminó, respondemos con 204
        .catch(error => res.status(500).send({ error: 'SystemError', message: error.message }))  // Si ocurre un error, respondemos con el error
})