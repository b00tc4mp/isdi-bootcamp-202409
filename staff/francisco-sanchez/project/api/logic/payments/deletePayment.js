import { Payment, User } from "dat"
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, paymentId) => {
    // Validar que los IDs sean válidos
    validate.id(paymentId, 'paymentId')
    validate.id(userId, 'userId')

    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new NotFoundError('user not found')
        }

        const payment = await Payment.findById(paymentId).lean()
        if (!payment) {
            throw new NotFoundError('payment not found')
        }

        await Payment.findByIdAndDelete(paymentId)

        return {
            message: 'Payment deleted successfully',
            paymentId,
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}
