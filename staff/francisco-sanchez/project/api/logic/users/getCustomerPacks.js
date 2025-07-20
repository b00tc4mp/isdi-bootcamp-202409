import { User, Pack, Payment } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId)
    validate.id(targetUserId)

    return (async () => {
        let actualUser, user, customerPacks
        try {
            actualUser = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!actualUser) throw new NotFoundError('userId not found')


        try {
            user = await User.findById(targetUserId).lean()
        } catch (error) {

        }
        if (!user) throw new NotFoundError('targetUserId not found')


        try {
            customerPacks = await Pack.find({ customer: targetUserId, provider: userId }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!customerPacks || !customerPacks.length) throw new NotFoundError('There are not packs registered for this customer')

        try {
            const formattedCustomerPacks = []

            for (const customerPack of customerPacks) {
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

                formattedCustomerPacks.push({
                    ...customerPack,
                    id: customerPack._id.toString(),
                    totalPayments: `${totalPayments}`,
                    paymentStatus,
                    paymentMethods
                })
            }
            return formattedCustomerPacks

        } catch (error) {
            throw new SystemError(error.message)
        }

    })()






}