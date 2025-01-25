import { Payment, Pack } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (packId) => {
    validate.id(packId, 'packId')

    return Pack.findById(packId).lean()
        .then(pack => {
            if (!pack) throw new NotFoundError('Pack not found')

            return Payment.find({ pack: packId }).lean()
                .then(payments => {
                    if (!payments) throw new NotFoundError('No payments found for this pack')

                    payments.forEach(payment => {
                        payment.id = payment._id.toString()
                        delete payment._id
                    })

                    return payments
                })

                .catch(error => {
                    throw new SystemError(error.message)
                })

        })
        .catch(error => {
            throw new SystemError(error.message)
        })


}



