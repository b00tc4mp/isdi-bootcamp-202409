import { Payment, User } from "dat"
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, paymentId) => {
    validate.id(paymentId, 'paymentId')
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) { throw new NotFoundError('user not found') }

            return Payment.findById(paymentId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(payment => {
                    if (!payment) { throw new NotFoundError('payment not found') }

                    return Payment.findByIdAndDelete(paymentId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}
