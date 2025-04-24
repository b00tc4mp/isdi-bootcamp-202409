import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { emitToMatchRoomExcept } from '../../../socketUtils.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token (sender)
    const { matchId } = req.params
    const { text } = req.body
    const { io } = req // Get io instance from request object
    const userSockets = req.app.get('userSockets')

    // Save message to database first (ensures persistence)
    const message = await logic.sendMessage(userId, matchId, text)

    // Emit to everyone in the room except the sender
    emitToMatchRoomExcept(io, userSockets, matchId, userId, 'newMessage', {
        ...message,
        matchId // Include matchId in the event data for easier handling
    })

    // Respond with the saved message
    res.status(201).json(message)
})