import { User, Heartbeat, Match, Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ValidationError } = errors

export default (senderId, receiverId, action) => {
    validate.id(senderId, 'senderId')
    validate.id(receiverId, 'receiverId')
    validate.action(action)

    if (senderId === receiverId) throw new ValidationError('receiver cannot be the same as sender')

    return (async () => {
        try {
            // Check for existing heartbeat to prevent duplicates
            const existingHeartbeat = await Heartbeat.findOne({
                sender: senderId,
                receiver: receiverId
            })

            if (existingHeartbeat) throw new ValidationError('already swiped on this user')

            // Check if both users exist
            const [sender, receiver] = await Promise.all([
                User.findById(senderId).lean(),
                User.findById(receiverId).lean()
            ])

            if (!sender) throw new NotFoundError('sender not found')
            if (!receiver) throw new NotFoundError('receiver not found')

            // Create the heartbeat
            const heartbeat = new Heartbeat({
                sender: senderId,
                receiver: receiverId,
                action,
                date: new Date()
            })

            await heartbeat.save()

            // If it's a right swipe (like), check for mutual like
            let matchResult = null
            if (action === 'right') {
                // Check if receiver has already liked sender
                const mutualHeartbeat = await Heartbeat.findOne({
                    sender: receiverId,
                    receiver: senderId,
                    action: 'right'
                })

                // If mutual like exists, create a match
                if (mutualHeartbeat) {
                    // Create new match
                    const match = new Match({
                        users: [senderId, receiverId],
                        messages: []
                    })

                    await match.save()

                    // Create notification for both users
                    await Promise.all([
                        new Notification({
                            from: senderId,
                            to: receiverId,
                            type: 'match',
                            date: new Date()
                        }).save(),
                        new Notification({
                            from: receiverId,
                            to: senderId,
                            type: 'match',
                            date: new Date()
                        }).save()
                    ])

                    // Get populated match data
                    matchResult = await Match.findById(match._id).populate({
                        path: 'users',
                        select: 'name profilePicture'
                    })
                }
            }

            // Return the match info if created, otherwise just the heartbeat
            return matchResult
                ? { heartbeat, match: matchResult }
                : { heartbeat }
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error
            }

            throw new SystemError(error.message)
        }
    })()
}
// TODO: canviar name pictures => name profilePicture o altres?
// TODO: separar match reation a una altra logica?