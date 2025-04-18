import { Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, matchId) => {
    validate.id(userId, 'userId')
    validate.id(matchId, 'matchId')

    return (async () => {
        try {
            // Mark all notifications for this user in this match as read
            const result = await Notification.updateMany(
                { to: userId, matchId: matchId, read: false, type: 'message' },
                { $set: { read: true } }
            )

            // Optional: Check if any documents were modified
            // if (result.matchedCount === 0) {
            //     console.log(`No unread notifications found for user ${userId} in match ${matchId}`);
            // }

            return { success: true, modifiedCount: result.modifiedCount };

        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}