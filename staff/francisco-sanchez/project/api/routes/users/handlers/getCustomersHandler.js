import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req.query

    if (!userId) {
        res.status(400).json({ error: 'Bad Request', message: 'userId is required' })
        return
    }

    const customers = await logic.getCustomers(userId)
    res.status(200).json(customers)
})