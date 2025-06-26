import { User, Heartbeat, Match, Notification } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ValidationError } = errors

// Creates a heartbeat (swipe) between users and handles match creation
export default (senderId, receiverId, action) => {
    validate.id(senderId, 'senderId')
    validate.id(receiverId, 'receiverId')
    validate.action(action)

    if (senderId === receiverId) throw new ValidationError('receiver cannot be the same as sender')

    return (async () => {
        try {
            // Verify no existing heartbeat & both users exist
            const [existingHeartbeat, sender, receiver] = await Promise.all([
                Heartbeat.findOne({ sender: senderId, receiver: receiverId }).lean(),
                User.findById(senderId).lean(),
                User.findById(receiverId).lean()
            ])

            if (existingHeartbeat) throw new ValidationError('already swiped on this user')
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

            // Early return for left swipes - no match processing needed
            if (action !== 'right') {
                return {
                    heartbeat: heartbeat.toObject(),
                    match: null
                }
            }

            // --- Match processing (only for right swipes) ---

            // Check for mutual interest
            const mutualHeartbeat = await Heartbeat.findOne({
                sender: receiverId,
                receiver: senderId,
                action: 'right'
            }).lean()

            // No mutual interest = no match
            if (!mutualHeartbeat) {
                return {
                    heartbeat: heartbeat.toObject(),
                    match: null
                }
            }

            // Check for existing match to prevent duplicates
            const existingMatch = await Match.findOne({
                users: { $all: [senderId, receiverId] }
            }).lean()

            // Use existing match or create new one
            const matchData = existingMatch || await createNewMatch(senderId, receiverId)

            // Return result with populated match data if created/found
            return {
                heartbeat: heartbeat.toObject(),
                match: matchData ? await populateMatchData(matchData._id) : null
            }
        } catch (error) {
            // Pass through validation/not found errors, wrap others
            if (error instanceof ValidationError || error instanceof NotFoundError)
                throw error

            throw new SystemError(error.message)
        }
    })()
}

// Creates a new match between users and their notifications
async function createNewMatch(user1Id, user2Id) {
    // Create the match
    const match = new Match({
        users: [user1Id, user2Id],
        messages: []
    })
    const createdMatch = await match.save()

    // Create notifications for both users (in parallel)
    await Promise.all([
        new Notification({
            from: user1Id,
            to: user2Id,
            type: 'match',
            matchId: createdMatch._id,
            date: new Date()
        }).save(),
        new Notification({
            from: user2Id,
            to: user1Id,
            type: 'match',
            matchId: createdMatch._id,
            date: new Date()
        }).save()
    ])

    return createdMatch
}

// Retrieves populated match data for UI display
async function populateMatchData(matchId) {
    return Match.findById(matchId)
        .populate({
            path: 'users',
            select: '_id name profilePicture pictures'
        })
        .lean()
}