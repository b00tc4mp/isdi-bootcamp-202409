import { Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            // Find all unread message notifications for the user
            const unreadNotifications = await Notification.find({
                to: userId,
                type: 'message',
                read: false
            }).lean()

            let totalUnreadCount = 0
            const unreadMatchesMap = {}

            unreadNotifications.forEach(notification => {
                if (notification.matchId) {
                    const matchIdStr = notification.matchId.toString() // Ensure string keys
                    unreadMatchesMap[matchIdStr] = (unreadMatchesMap[matchIdStr] || 0) + 1
                    totalUnreadCount++ // Increment total count as well
                }
            })

            // Return both the total count and the detailed map
            return { count: totalUnreadCount, matches: unreadMatchesMap }
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}
// Optionally, you could return more details like which matches have unread messages
// const unreadNotifications = await Notification.find({ to: userId, read: false, type: 'message' }).distinct('matchId').lean()