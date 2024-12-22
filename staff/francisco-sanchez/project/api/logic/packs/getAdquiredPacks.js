import { User, Pack } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors;

export default (targetUserId) => {

    validate.id(targetUserId)

    return User.findById(targetUserId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Pack.find({ customer: targetUserId }).lean()
                .then(packs => {
                    if (!packs || packs.length === 0) {
                        throw new NotFoundError('No packs found for this customer')
                    }
                    return packs
                })
        })

        .catch(error => {
            throw new SystemError(error.message)
        })
}