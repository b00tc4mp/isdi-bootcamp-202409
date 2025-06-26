import { Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, matchId) => {
    validate.id(userId, 'userId')
    validate.id(matchId, 'matchId')

    return (async () => {
        try {
            // Mark all message notifications for this user in this match as read
            const result = await Notification.updateMany(
                { matchId: matchId, to: userId, type: 'message', read: false },
                { $set: { read: true } }
            )

            return { success: true, modifiedCount: result.modifiedCount }
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}