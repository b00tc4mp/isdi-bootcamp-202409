import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { emitToUser, addUserToMatchRoom } from '../../../socketUtils.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token (senderId)
    const { receiverId, action } = req.body
    const { io } = req // Get io instance from request object
    const userSockets = req.app.get('userSockets')

    // Call the logic function
    const result = await logic.createHeartbeat(userId, receiverId, action)

    // Check if a match was created
    if (result.match) {
        const populatedMatchData = result.match

        // Ensure both users are in the match room
        if (populatedMatchData._id && populatedMatchData.users) {
            const matchId = populatedMatchData._id

            // Add both users to the match room if they're connected
            populatedMatchData.users.forEach(user => {
                if (user && user._id) {
                    const targetUserId = user._id.toString()

                    // Add user to match room
                    addUserToMatchRoom(io, userSockets, targetUserId, matchId)

                    // Emit newMatch event to the user
                    emitToUser(io, userSockets, targetUserId, 'newMatch', populatedMatchData)
                }
            })
        }
    }

    res.status(201).json(result)
})