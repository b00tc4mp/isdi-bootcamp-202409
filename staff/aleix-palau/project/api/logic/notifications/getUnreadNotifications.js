import { Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

// Retrieves unread notifications (both match and message) for a user
export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            // Run both queries in parallel for better performance
            const [matchNotifications, messageNotifications] = await Promise.all([
                getUnreadMatchNotifications(userId),
                getUnreadMessageNotifications(userId)
            ])

            // Process message notifications into counts by match
            const { count, matches } = processMessageNotifications(messageNotifications)

            return {
                messageNotificationCounts: {
                    count,
                    matches
                },
                pendingMatchNotifications: matchNotifications
            }
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

// Fetches and formats unread match notifications
async function getUnreadMatchNotifications(userId) {
    const unreadMatches = await Notification.find({
        to: userId,
        type: 'match',
        read: false
    })
        .sort({ date: 1 }) // Oldest first
        .populate({
            path: 'from',
            select: 'name profilePicture _id' // For MatchNotification modal
        })
        .lean()

    // Format notifications for frontend use
    return unreadMatches
        .map(notification => {
            // Skip notifications without proper user data
            if (!notification.from || !notification.from._id) return null

            return {
                _id: notification._id, // Notification document ID
                matchId: notification.matchId, // Match document ID
                user: { // The user they matched with
                    _id: notification.from._id,
                    name: notification.from.name,
                    profilePicture: notification.from.profilePicture || '/images/default-profile.jpeg'
                },
                date: notification.date
            }
        })
        .filter(Boolean) // Remove any null entries
}

// Fetches unread message notifications
async function getUnreadMessageNotifications(userId) {
    return Notification.find({
        to: userId,
        type: 'message',
        read: false
    }).lean()
}

// Processes message notifications into count data
function processMessageNotifications(notifications) {
    let totalCount = 0
    const matchCounts = {}

    notifications.forEach(notification => {
        if (notification.matchId) {
            const matchIdStr = notification.matchId.toString()
            matchCounts[matchIdStr] = (matchCounts[matchIdStr] || 0) + 1
            totalCount++
        }
    })

    return {
        count: totalCount,
        matches: matchCounts
    }
}