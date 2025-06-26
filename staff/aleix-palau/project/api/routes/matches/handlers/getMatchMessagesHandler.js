import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token
    const { matchId } = req.params

    const messages = await logic.getMatchMessages(userId, matchId)

    res.json(messages)
})