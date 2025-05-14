import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { emitToMatchRoomExcept } from '../../../socketUtils.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token (sender)
    const { matchId } = req.params
    const { text } = req.body
    const { io } = req
    const userSockets = req.app.get('userSockets')

    // Save message to database first
    const message = await logic.sendMessage(userId, matchId, text)

    // Include the matchId for the client to know which conversation it belongs to
    const messageWithMatchId = {
        ...message,
        matchId
    }

    // Emit to everyone in the match room except the sender
    emitToMatchRoomExcept(io, userSockets, matchId, userId, 'newMessage', messageWithMatchId)

    // Respond with the saved message
    res.status(201).json(message)
})