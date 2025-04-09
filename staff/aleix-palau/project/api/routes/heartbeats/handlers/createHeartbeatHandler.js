import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token (senderId)
    const { receiverId, action } = req.body
    const { io } = req // Get io instance from request object

    // Call the logic function
    const result = await logic.createHeartbeat(userId, receiverId, action)

    // Check if a match was created (logic now returns the populated match data)
    if (result.match) {
        const populatedMatchData = result.match

        // Ensure the io object and necessary user IDs exist before emitting
        if (io && populatedMatchData && populatedMatchData.users) {
            // Emit 'newMatch' to both users involved in the match
            populatedMatchData.users.forEach(user => {
                // Assuming userSockets maps userId to socketId (from socketSetup.js)
                // You might need to adjust how userSockets is accessed if not global/passed differently
                const targetSocketId = req.app.get('userSockets')?.get(user._id.toString()) // Access userSockets map (needs to be set on app)
                if (targetSocketId) {
                    io.to(targetSocketId).emit('newMatch', populatedMatchData)
                    console.log(`Emitted newMatch to user ${user._id} (socket ${targetSocketId})`)
                } else {
                    console.log(`Could not find socket ID for user ${user._id} to emit newMatch`)
                }
            })
        } else {
            console.warn("Could not emit newMatch event: io instance, match data, or users missing.", { io: !!io, match: !!populatedMatchData })
        }
    }

    // Respond with the result from the logic (contains heartbeat and potentially match)
    res.status(201).json(result)
})