import { Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, notificationId) => {
    validate.id(userId, 'userId')
    validate.id(notificationId, 'notificationId')

    return (async () => {
        try {
            // Mark the specific match notification as read
            const result = await Notification.updateOne(
                { _id: notificationId, to: userId, type: 'match', read: false },
                { $set: { read: true } }
            )

            return { success: true, modifiedCount: result.modifiedCount }
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}