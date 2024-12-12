import { User, LogBook } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default async (userId, logbookId) => {
    try {
        // Validate IDs
        validate.id(userId, 'userId')
        validate.logbook(logbookId, 'logbookId')

        // Fetch the user
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('user not found')

        // Fetch the logbook
        const logbook = await LogBook.findById(logbookId)
        if (!logbook) throw new NotFoundError('logbook not found')

        // Update the logbook
        const updatedLogbook = await LogBook.findByIdAndUpdate(logbookId, { new: true })
        if (updatedLogbook) {
            return updatedLogbook
        } else {
            throw new Error('logbook not found after update attempt')
        }
    } catch (error) {
        console.error('Error processing the request:', error) // Optional: for debugging
        throw new SystemError(error.message)
    }
}