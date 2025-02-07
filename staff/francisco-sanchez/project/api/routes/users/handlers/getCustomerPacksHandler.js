import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    /* const { userId } = req */
    const { userId, params: { customerId } } = req

    try {
        const customerPacks = await logic.getCustomerPacks(userId, customerId)
        res.status(200).json(customerPacks)
    } catch (error) {
        console.error(error.message)
        throw error
    }
})