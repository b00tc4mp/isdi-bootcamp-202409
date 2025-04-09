import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token
    const { matchId } = req.params
    const { text } = req.body

    const message = await logic.sendMessage(userId, matchId, text)

    // Emit new message event via Socket.io
    req.io.to(`match:${matchId}`).emit('newMessage', {
        ...message,
        matchId
    })

    res.status(201).json(message)
})