import { User, Pack } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors;

export default (userId, targetUserId) => {
    validate.id(targetUserId, 'targetUserId')
    validate.id(userId, 'userId')

    return User.findById(targetUserId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Pack.find({ customer: targetUserId, provider: userId }).lean()
                .then(packs => {
                    if (!packs || packs.length === 0) {
                        throw new NotFoundError('No packs found for this customer')
                    }
                    packs.forEach(pack => {
                        pack.id = pack._id.toString()
                        delete pack._id
                    })

                    return packs
                })
        })

        .catch(error => {
            throw new SystemError(error.message)
        })
}