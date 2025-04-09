import { Match } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export default (userId, matchId) => {
    validate.id(userId, 'userId')
    validate.id(matchId, 'matchId')

    return (async () => {
        try {
            // Find the match
            const match = await Match.findById(matchId).lean()

            if (!match) throw new NotFoundError('match not found')

            // Check if user is a participant in the match
            if (!match.users.some(id => id.toString() === userId)) {
                throw new AuthorizationError('user is not part of this match')
            }

            // Return the messages array
            return match.messages
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError) {
                throw error
            }

            throw new SystemError(error.message)
        }
    })()
}