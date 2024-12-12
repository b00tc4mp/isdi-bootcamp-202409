import { User, LogBook } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

//validate user and logbook
export default (userId, logBookId ) => {
    validate.id(userId, 'userId')
    validate.id(logBookId, 'logBookId')

    return Promise.all([User.findById(userId).lean(), LogBook.findById(logBookId).lean()])
        .then(([user, logBook]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!logBook) throw new NotFoundError('logbook not found')

        return LogBook.findByIdAndDelete(logBookId)
        })
        .then(deletedLogBook => {
            if (!deletedLogBook) throw new NotFoundError('logbook not found')
            return { message: 'Logbook deleted successfully' }
        })
        .catch(error => { throw new SystemError(error.message) })
}