import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { emitToUser, addUserToMatchRoom } from '../../../socketUtils.js'
import { Notification } from 'dat'

export default createFunctionalHandler(async (req, res) => {
    const { userId: senderId } = req // from JWT token
    const { receiverId, action } = req.body
    const { io } = req
    const userSockets = req.app.get('userSockets')

    const result = await logic.createHeartbeat(senderId, receiverId, action)

    // Process match creation (if any)
    if (result.match && result.match._id)
        await notifyUsersAboutMatch(result.match, io, userSockets)

    // Return success response with result
    res.status(201).json(result)
})

// Notifies users about a new match via sockets
async function notifyUsersAboutMatch(matchData, io, userSockets) {
    const matchId = matchData._id
    const users = matchData.users || []

    if (!matchId || users.length !== 2) {
        console.error('[Match Notification] Invalid match data:', matchId, 'users:', users?.length)
        return
    }

    // Find all notifications for this match at once
    const matchNotifications = await Notification.find({
        matchId: matchId,
        type: 'match'
    }).lean()

    // Process each user
    for (const user of users) {
        if (!user?._id) continue

        const userId = user._id.toString()

        // Add user to match chat room
        addUserToMatchRoom(io, userSockets, userId, matchId)

        // Find this user's notification
        const userNotification = matchNotifications.find(n => n.to.toString() === userId)

        if (!userNotification)
            console.error(`[Socket] No match notification found for user ${userId} and match ${matchId}`)

        // Prepare payload with notification ID
        const eventPayload = {
            ...matchData,
            notificationId: userNotification?._id?.toString() || null
        }

        // Send match event to this user
        emitToUser(io, userSockets, userId, 'newMatch', eventPayload)
    }
}