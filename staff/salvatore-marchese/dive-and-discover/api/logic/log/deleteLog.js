import { User, LogBook } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

//validate user and logbook
export default async (userId, logBookId ) => {
    try {
        // Validate IDs
        validate.id(userId, 'userId')
        validate.id(logBookId, 'logBookId')

        // Fetch the user and logbook simultaneously
        const [user, logBook] = await Promise.all([User.findById(userId).lean(), LogBook.findById(logBookId).lean()])

        if (!user) throw new NotFoundError('user not found')
        if (!logBook) throw new NotFoundError('logbook not found')

        // Delete the logbook
        const deletedLogBook = await LogBook.findByIdAndDelete(logBookId)
        if (!deletedLogBook) throw new NotFoundError('logbook not found')
        
        // Return successs message
        return { message: 'Logbook deleted successfully' }
    } catch (error) {
        console.error('Error in deleteLog:', error)
        throw new SystemError(error.message)
    }
}