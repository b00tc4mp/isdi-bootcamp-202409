import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token (senderId)
    const { receiverId, action } = req.body
    const { io } = req // Get io instance from request object
    const userSockets = req.app.get('userSockets') // Get the userSockets map

    // Call the logic function
    const result = await logic.createHeartbeat(userId, receiverId, action)

    // Check if a match was created
    if (result.match) {
        const populatedMatchData = result.match
        const newMatchId = populatedMatchData._id.toString()
        const roomName = `match:${newMatchId}` // Define the room name

        // Ensure the io object, userSockets map, and necessary user IDs exist
        if (io && userSockets && populatedMatchData && populatedMatchData.users) {

            // --- NEW: Explicitly join both users to the new match room ---
            populatedMatchData.users.forEach(user => {
                const userToJoinId = user._id.toString()
                const targetSocketId = userSockets.get(userToJoinId)

                if (targetSocketId) {
                    // Find the socket instance from the main io server
                    const socketInstance = io.sockets.sockets.get(targetSocketId)
                    if (socketInstance) {
                        socketInstance.join(roomName)
                        console.log(`Socket ${targetSocketId} (User ${userToJoinId}) forced to join room ${roomName}`)
                    } else {
                        console.log(`Could not find socket instance for socket ID ${targetSocketId} to join room ${roomName}`)
                    }
                } else {
                    console.log(`Could not find socket ID for user ${userToJoinId} to join room ${roomName}`)
                }
            })
            // --- End NEW section ---

            // Emit 'newMatch' to both users involved in the match (using direct socket IDs)
            populatedMatchData.users.forEach(user => {
                const targetSocketId = userSockets.get(user._id.toString())
                if (targetSocketId) {
                    // Emit the new match details directly to the user's socket
                    io.to(targetSocketId).emit('newMatch', populatedMatchData)
                    console.log(`Emitted newMatch to user ${user._id} (socket ${targetSocketId})`)
                } else {
                    console.log(`Could not find socket ID for user ${user._id} to emit newMatch`)
                }
            })
        } else {
            console.warn("Could not join room or emit newMatch event: io instance, userSockets map, match data, or users missing.", {
                io: !!io,
                userSockets: !!userSockets,
                match: !!populatedMatchData
            })
        }
    }

    // Respond with the result from the logic (contains heartbeat and potentially match)
    res.status(201).json(result)
})