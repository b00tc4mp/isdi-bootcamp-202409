import { User, Pack, Payment } from 'dat'
import { errors, validate } from 'com'
import { getDecimalToTimeFormat, getFormattedDate } from '../helpers/index.js'

const { SystemError, NotFoundError } = errors

export default async (userId) => {
    validate.id(userId)

    try {
        const user = await User.findById(userId).lean()
        if (!user) throw new NotFoundError('user not found')

        const customerPacks = await Pack.find({ customer: userId }).lean()
        if (!customerPacks) throw new NotFoundError('There are not packs registered for this customer')

        //return customerPacks
        const formattedCustomerPacks = await Promise.all(
            customerPacks.map(async (customerPack) => {
                // Fetch payments for the current pack
                const payments = await Payment.find({ pack: customerPack._id }).lean()
                const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)

                const paymentMethods = [...new Set(payments.map((payment) => payment.method || 'Unknown'))].join(', ')

                // Check payment Status
                let paymentStatus = ''
                if ((totalPayments < customerPack.price) && (totalPayments > 0)) { paymentStatus = 'partially payed' }
                else if (totalPayments === 0) { paymentStatus = 'pending' }
                else if (totalPayments === customerPack.price || payedAmountNum > customerPack.price) { paymentStatus = 'completed' }

                customerPack.id = customerPack._id
                delete customerPack._id

                return {
                    ...customerPack,
                    totalPayments: `${totalPayments}`, // Include currency if available
                    paymentStatus,
                    paymentMethods
                }
            })
        )
        return formattedCustomerPacks

    } catch (error) {
        throw new SystemError(error.message)
    }
}