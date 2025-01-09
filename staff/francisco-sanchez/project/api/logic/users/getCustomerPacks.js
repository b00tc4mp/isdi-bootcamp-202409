import { User, Pack } from 'dat'
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

                return {
                    ...customerPack,
                    formattedRemaining,
                    formattedPurchaseDate: await getFormattedDate(customerPack.purchaseDate),
                    formattedExpiryDate: await getFormattedDate(customerPack.expiryDate)
                }

            })
        )
        return formattedCustomerPacks

    } catch (error) {
        throw new SystemError(error.message)
    }
}