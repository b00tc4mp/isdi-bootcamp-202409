import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { emitToUser, addUserToMatchRoom } from '../../../socketUtils.js'
import { Notification } from 'dat'

export default createFunctionalHandler(async (req, res) => {
    const { userId: senderId } = req
    const { receiverId, action } = req.body
    const { io } = req
    const userSockets = req.app.get('userSockets')

    const result = await logic.createHeartbeat(senderId, receiverId, action)

    // Process match creation (if any)
    if (result.match?._id)
        await notifyUsersAboutMatch(result.match, io, userSockets)

    // Return success response with result
    res.status(201).json(result)
})

// Notifies users about a new match via sockets
async function notifyUsersAboutMatch(matchData, io, userSockets) {
    if (!matchData._id || matchData.users?.length !== 2) return

    // Get match notifications
    const notifications = await Notification.find({
        matchId: matchData._id,
        type: 'match'
    }).lean()

    // Create notification map for quick lookup
    const notificationMap = new Map(
        notifications.map(n => [n.to.toString(), n._id.toString()])
    )

    // Notify both users
    await Promise.all(
        matchData.users.map(user => {
            const userId = user._id.toString()
            const otherUser = matchData.users.find(u => u._id.toString() !== userId)

            if (!otherUser) return

            // Add to match room
            addUserToMatchRoom(io, userSockets, userId, matchData._id)

            // Send notification
            const payload = {
                _id: matchData._id,
                notificationId: notificationMap.get(userId) || null,
                users: matchData.users,
                // Adding a specific user object for the notification display
                user: {
                    _id: otherUser._id,
                    name: otherUser.name,
                    profilePicture: otherUser.profilePicture || '/images/default-profile.jpeg'
                }
            }

            // Send match event to this user
            emitToUser(io, userSockets, userId, 'newMatch', payload)
        })
    )
}