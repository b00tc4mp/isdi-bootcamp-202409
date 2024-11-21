import db from 'dat'
import { validate, errors }  from 'com'

const { ObejctId } = db
const { SystemError, NotFoundError } = errors


export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return db.users.findOne({_id: ObejctId.createFromHexString(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.users.findOne({_id: ObejctId.createFromHexString(targetUserId) })
                .catch(error => { throw new SystemError(error.message)})
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

                return user.name
        })
    }