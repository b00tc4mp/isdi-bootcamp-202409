import { Payment, Pack } from "dat";

import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export default async (packId, amount, currency, method, paymentStatus) => {
    //Validations here
    validate.id(packId, 'packId')

    //Mover a donde toca
    if (!amount || amount <= 0) throw new ValidationError("Invalid payment amount");
    if (!currency) throw new ValidationError("Currency is required");
    if (!method) throw new ValidationError("Payment method is required");

    try {
        const pack = await Pack.findById(packId).lean()
        if (!pack) throw new NotFoundError('Pack not found')

        //Add payment
        const newPayment = await Payment.create({
            pack: packId,
            amount,
            currency,
            method,
            status: paymentStatus,
            date: new Date()
        })

        return {
            message: 'Payment added successfully',
            payment: newPayment
        }

    } catch (error) {
        console.error(error.message)
        throw new SystemError(error.message)
    }
}