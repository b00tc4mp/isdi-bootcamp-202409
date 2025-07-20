import { BasePack, User, Pack } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError, DataIntegrityError } = errors

export default (userId, basePackId) => {
    validate.id(userId, 'userId')
    validate.id(basePackId, 'basePackId')

    return Promise.all([
        User.findById(userId).lean(),
        BasePack.findById(basePackId).lean()
    ])
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(([user, basePack]) => {
            if (!user) throw new NotFoundError('user not found')

            if (!basePack) throw new NotFoundError('basepack not found')

            if (basePack.user.toString() !== userId) {
                throw new OwnershipError('Your user is not the owner of this pack')
            }

            return Pack.findOne({ refPack: basePackId, status: 'Active' }).lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(packReferenced => {
                    if (packReferenced) {
                        throw new DataIntegrityError('This pack is assigned to one or more customers with Active status and cannot be deleted')
                    }

                    return BasePack.findByIdAndDelete(basePackId)
                        .catch(error => {
                            throw new SystemError(error.message)
                        })
                        .then(() => { })
                })
        })
}