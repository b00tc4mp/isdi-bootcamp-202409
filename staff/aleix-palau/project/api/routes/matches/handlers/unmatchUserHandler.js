import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { emitToMatchRoom } from '../../../socketUtils.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token
    const { matchId } = req.params
    const { io } = req

    // Delete match from database first
    await logic.unmatchUser(userId, matchId)

    // Emit unmatch event to everyone in the match room
    emitToMatchRoom(io, matchId, 'unmatch', {
        matchId,
        initiatedBy: userId
    })

    res.status(204).send()
})