import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId, params: { targetUserId } } = req

    const name = await logic.getUserName(userId, targetUserId)
    res.json(name)
})