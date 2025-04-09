import { Match } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            // Find all matches where the user is a participant
            const matches = await Match
                .find({ users: userId })
                .populate({
                    path: 'users',
                    select: 'name profilePicture' // Only select needed fields
                })
                .sort({ lastActivity: -1 }) // Sort by most recent activity
                .lean()

            return matches
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}