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

            // Ensure userId is compared correctly (ObjectId vs string)
            if (!match.users.some(id => id.toString() === userId.toString())) throw new AuthorizationError('user is not part of this match')

            // Create new message
            const newMessage = {
                _id: new mongoose.Types.ObjectId(), // Generate new ID for the message
                sender: userId,
                text: text.trim(),
                timestamp: new Date(),
            }

            // Add message to match using $push and update lastActivity atomically
            const updatedMatch = await Match.findByIdAndUpdate(
                matchId,
                {
                    $push: { messages: newMessage },
                    $set: { lastActivity: newMessage.timestamp }
                },
                { new: true } // Return the updated document if needed, though not strictly necessary here
            )

            if (!updatedMatch) throw new SystemError('Failed to save message to match')

            // Create notification for the other user
            const otherUserId = match.users.find(id => id.toString() !== userId.toString())

            if (otherUserId) { // Ensure other user exists
                await new Notification({
                    from: userId,
                    to: otherUserId,
                    type: 'message',
                    date: newMessage.timestamp, // Use message timestamp for notification
                    read: false,
                    matchId: matchId
                }).save()
            }

            // Return the newly created message object (including its _id)
            // Note: Because it's embedded, the _id is part of the object added to the array
            const savedMessage = updatedMatch.messages[updatedMatch.messages.length - 1]

            return {
                _id: savedMessage._id,
                sender: savedMessage.sender,
                text: savedMessage.text,
                timestamp: savedMessage.timestamp,
            }
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError) {
                throw error
            }

            throw new SystemError(error.message)
        }
    })()
}
// TODO: mirar lo de pagination pels missatges