import { Payment, Pack } from "dat";

import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export default async (packId, amount, currency, method, paymentStatus) => {
    //Validations here
    //validate.number(amount)
    validate.currency(currency)
    validate.text(method)
    //validate.text(paymentStatus)
    validate.id(packId, 'packId')

    const floatAmount = parseFloat(amount)

    //Mover a donde toca
    if (!floatAmount || floatAmount <= 0) throw new ValidationError("Invalid payment amount");
    if (!currency) throw new ValidationError("Currency is required");
    if (!method) throw new ValidationError("Payment method is required");

    //TODO: TO DELETE PAYMENT STATUS FROM PAYMENTS COLLECTION
    if (!paymentStatus) { paymentStatus = 'partially payed' }

    return Pack.findById(packId).lean()
        .then(pack => {
            if (!pack) throw new NotFoundError('Pack not found')

            return Payment.create({ pack: packId, amount: floatAmount, currency, method, date: new Date() })
                .then(newPayment => {

                    return newPayment
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}