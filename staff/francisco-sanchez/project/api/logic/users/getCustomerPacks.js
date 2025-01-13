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
                let formattedRemaining
                if (customerPack.unit === 'hours') {
                    formattedRemaining = await getDecimalToTimeFormat(customerPack.remainingQuantity)
                    formattedRemaining += ' h'
                } else if (customerPack.unit === 'units') {
                    formattedRemaining = `${customerPack.remainingQuantity} un.`; // Mostrar directamente con la unidad
                }

                // Formated Price
                const formattedPrice = `${customerPack.price} ${customerPack.currency || ''}`


                // Fetch payments for the current pack
                const payments = await Payment.find({ pack: customerPack._id }).lean()
                const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)

                // Fetch payment methods
                //const paymentMethods = [...new Set(payments.map((payment) => payment.method || 'Unknown'))]
                //const paymentMethods = payments.map((payment) => payment.method || 'Unknown').join(', ')
                const paymentMethods = [...new Set(payments.map((payment) => payment.method || 'Unknown'))].join(', ')


                // Check payment Status
                let paymentStatus = ''
                if ((totalPayments < customerPack.price) && (totalPayments > 0)) { paymentStatus = 'partially payed' }
                else if (totalPayments === 0) { paymentStatus = 'pending' }
                else if (totalPayments === customerPack.price || payedAmountNum > customerPack.price) { paymentStatus = 'completed' }


                return {
                    ...customerPack,
                    formattedRemaining,
                    formattedPurchaseDate: await getFormattedDate(customerPack.purchaseDate),
                    formattedExpiryDate: await getFormattedDate(customerPack.expiryDate),
                    formattedPrice,
                    totalPayments: `${totalPayments} ${customerPack.currency || ''}`, // Include currency if available
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