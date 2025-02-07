import { User, Pack, Payment } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, targetUserId) => {
    validate.id(userId)
    validate.id(targetUserId)

    try {
        const actualUser = await User.findById(userId).lean()
        if (!actualUser) throw new NotFoundError('userId not found')

        const user = await User.findById(targetUserId).lean()
        if (!user) throw new NotFoundError('targetUserId not found')

        const customerPacks = await Pack.find({ customer: targetUserId, provider: userId }).lean()
        if (!customerPacks || !customerPacks.length) throw new NotFoundError('There are not packs registered for this customer')

        //return customerPacks
        const formattedCustomerPacks = await Promise.all(
            customerPacks.map(async (customerPack) => {
                // Fetch payments for the current pack
                const payments = await Payment.find({ pack: customerPack._id }).lean()
                const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)

                const paymentMethods = [...new Set(payments.map((payment) => payment.method || 'Unknown'))].join(', ')

                // Check payment Status
                let paymentStatus = ''
                let payedAmountNum = 0
                if ((totalPayments < customerPack.price) && (totalPayments > 0)) { paymentStatus = 'partially payed' }
                else if (totalPayments === 0) { paymentStatus = 'pending' }
                else if (totalPayments === customerPack.price || payedAmountNum > customerPack.price) { paymentStatus = 'completed' }
                else if (totalPayments > customerPack.price) { paymentStatus = 'payment exceded' }

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
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}