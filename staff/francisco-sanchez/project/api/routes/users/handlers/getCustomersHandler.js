import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const { targetUserId } = req.params; // Esto viene de la URL

    try {
        const customers = await logic.getCustomers(userId, targetUserId)
        res.status(200).json(customers)
    } catch (error) {
        console.error(error.message)
        throw error
    }

    /* if (!userId) {
        res.status(400).json({ error: 'Bad Request', message: 'userId is required' })
        return
    }

    const customers = await logic.getCustomers(userId)
    res.status(200).json(customers) */
})