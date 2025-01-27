import { Payment, Pack, User } from "dat";

import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export default async (userId, packId, amount, currency, method, paymentStatus) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')
    validate.currency(currency)
    validate.method(method)

    const floatAmount = parseFloat(amount)
    //if (!floatAmount || floatAmount <= 0) throw new ValidationError("Invalid payment amount");
    validate.number(floatAmount)

    //TODO: TO DELETE PAYMENT STATUS FROM PAYMENTS COLLECTION
    if (!paymentStatus) { paymentStatus = 'partially payed' }

    return User.findById(userId).lean()
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Pack.findById(packId).lean()
                .then(pack => {
                    if (!pack) throw new NotFoundError('Pack not found')

                    return Payment.create({ pack: packId, amount: floatAmount, currency, method, date: new Date() })
                        .then(newPayment => {

                            return newPayment
                        })
                })
                .catch(error => {
                    if (error instanceof NotFoundError) {
                        throw error
                    } else {
                        throw new SystemError(error.message)
                    }
                })
        })
}