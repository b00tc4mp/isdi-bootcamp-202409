import { Match, Heartbeat } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export default (userId, matchId) => {
    validate.id(userId, 'userId')
    validate.id(matchId, 'matchId')

    return (async () => {
        try {
            // Find the match
            const match = await Match.findById(matchId)

            if (!match) {
                throw new NotFoundError('match not found')
            }

            // Check if user is part of the match
            if (!match.users.includes(userId)) {
                throw new AuthorizationError('user is not part of this match')
            }

            // Get the other user id
            const otherUserId = match.users.find(id => id.toString() !== userId.toString())

            // Delete both heartbeats (so they can match again in the future if they want)
            await Heartbeat.deleteMany({
                $or: [
                    { sender: userId, receiver: otherUserId },
                    { sender: otherUserId, receiver: userId }
                ]
            })

            // Delete the match
            await Match.findByIdAndDelete(matchId)

            return true
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError) {
                throw error
            }

            throw new SystemError(error.message)
        }
    })()
}