import { Payment, Pack, User } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, packId) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Pack.findById(packId).lean()
                .then(pack => {
                    if (!pack) throw new NotFoundError('pack not found')

                    return Payment.find({ pack: packId }).lean()
                        .then(payments => {
                            if (!payments || payments.length === 0)
                                throw new NotFoundError('no payments found for this pack')

                            payments.forEach(payment => {
                                payment.id = payment._id.toString()
                                delete payment._id
                            })

                            return payments
                        })
                })
        })
}



