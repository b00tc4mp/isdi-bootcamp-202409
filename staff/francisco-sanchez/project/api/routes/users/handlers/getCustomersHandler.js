import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req

    try {
        const customers = await logic.getCustomers(userId)
        res.status(200).json(customers)
    } catch (error) {
        console.error(error.message)
        throw error
    }
})