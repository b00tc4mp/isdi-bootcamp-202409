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
            }).lean() // Use lean for read-only check

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
            let createdMatch = null // Variable to hold the newly created match document if applicable
            if (action === 'right') {
                // Check if receiver has already liked sender
                const mutualHeartbeat = await Heartbeat.findOne({
                    sender: receiverId,
                    receiver: senderId,
                    action: 'right'
                }).lean() // Use lean for read-only check

                // If mutual like exists, create a match
                if (mutualHeartbeat) {
                    // Check if a match already exists to prevent duplicates (edge case)
                    const existingMatch = await Match.findOne({
                        users: { $all: [senderId, receiverId] }
                    }).lean()

                    if (!existingMatch) {
                        // Create new match
                        const match = new Match({
                            users: [senderId, receiverId],
                            messages: [] // Initialize with empty messages array
                        })

                        createdMatch = await match.save() // Save and get the created match document

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
                    } else {
                        createdMatch = existingMatch // Use existing match data if found
                    }
                }
            }

            // If a match was created, fetch its populated data to return
            let populatedMatchData = null
            if (createdMatch) {
                populatedMatchData = await Match.findById(createdMatch._id)
                    .populate({
                        path: 'users',
                        select: '_id name profilePicture pictures' // Used in MatchNotification
                    })
                    .lean()
            }

            // Return the heartbeat info and the populated match data if created
            return {
                heartbeat: heartbeat.toObject(), // Convert Mongoose doc to plain object
                match: populatedMatchData // This will be null if no match was created
            }
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error
            }
            console.error(error)
            throw new SystemError(error.message)
        }
    })()
}