import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getUserProfile(userId, targetUserId).then(targetUser => res.json(targetUser))
})