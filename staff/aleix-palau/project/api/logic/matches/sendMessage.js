import mongoose from 'mongoose'
import { Match, Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export default (userId, matchId, text) => {
    validate.id(userId, 'userId')
    validate.id(matchId, 'matchId')
    validate.text(text, 'message text', 500)

    return (async () => {
        try {
            // Find the match and check if user is a participant
            const match = await Match.findById(matchId)

            if (!match) throw new NotFoundError('match not found')

            if (!match.users.some(id => id.toString() === userId.toString()))
                throw new AuthorizationError('user is not part of this match')

            // Create new message
            const newMessage = {
                _id: new mongoose.Types.ObjectId(),
                sender: userId,
                text: text.trim(),
                timestamp: new Date(),
            }

            // Add message and update lastActivity
            const updatedMatch = await Match.findByIdAndUpdate(
                matchId,
                {
                    $push: { messages: newMessage },
                    $set: { lastActivity: newMessage.timestamp }
                },
                { new: true }
            )

            if (!updatedMatch) throw new SystemError('Failed to save message to match')

            // Find the other user to notify
            const otherUserId = match.users.find(id => id.toString() !== userId.toString())

            // Create notification if there's another user to notify
            if (otherUserId) {
                await new Notification({
                    from: userId,
                    to: otherUserId,
                    type: 'message',
                    date: newMessage.timestamp,
                    read: false,
                    matchId: matchId
                }).save()
            }

            // Get the saved message from the updated match
            const savedMessage = updatedMatch.messages[updatedMatch.messages.length - 1]

            return {
                _id: savedMessage._id,
                sender: savedMessage.sender,
                text: savedMessage.text,
                timestamp: savedMessage.timestamp,
            }
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError)
                throw error

            throw new SystemError(error.message)
        }
    })()
}