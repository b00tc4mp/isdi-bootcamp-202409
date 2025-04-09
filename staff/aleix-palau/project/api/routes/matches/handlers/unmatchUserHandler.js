import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token
    const { matchId } = req.params

    await logic.unmatchUser(userId, matchId)

    // Emit unmatch event via Socket.io
    req.io.to(`match:${matchId}`).emit('unmatch', {
        matchId,
        initiatedBy: userId
    })

    res.status(204).send()
})