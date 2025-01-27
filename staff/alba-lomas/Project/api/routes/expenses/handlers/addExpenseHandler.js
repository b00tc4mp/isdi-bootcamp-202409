


import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { amount, type, provider, date } } = req

    return logic.addExpense(userId, amount, type, provider, date).then(() => res.status(201).send())
})