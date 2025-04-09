import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token
    const { receiverId, action } = req.body

    const result = await logic.createHeartbeat(userId, receiverId, action)

    res.status(201).json(result)
})