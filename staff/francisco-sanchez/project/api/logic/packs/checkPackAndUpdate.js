import { Pack, User } from 'dat'
import { errors, validate } from 'com'
import { emailFinishedPack, emailLowTimeWarning, emailNearExpiryTime, emailExpirationWarning } from '../emailing/index.js'

const { SystemError, NotFoundError, ValidationError } = errors

export default async (packId) => {
    validate.id(packId, 'packId')

    try {
        // Busca el BasePack por su ID
        const packInfo = await Pack.findById(packId).lean()

        // Si no se encuentra, lanza un error
        if (!packInfo) {
            throw new NotFoundError('The pack does not exist')
        }

        const userInfo = await User.findById(packInfo.customer).lean()

        if (!userInfo) {
            throw new NotFoundError('The customer searched does not exist')
        }

        const currentDate = new Date()
        const expiryDate = new Date(packInfo.expiryDate)
        const remainingQuantity = packInfo.remainingQuantity || 0


        // 1. Validar si remainingQuantity < 2 horas/unidades > 0
        if (remainingQuantity <= 2 && remainingQuantity > 0) {
            const userInfo = await User.findById(packInfo.customer).lean()
            if (!userInfo) {
                throw new NotFoundError('The customer searched does not exist')
            }

            await emailLowTimeWarning(userInfo.email, userInfo.name, packInfo.description, packInfo.unit, packInfo.remainingQuantity)
        }

        // 2. Validar si remainingQuantity <= 0 (pack finalizado)
        if (remainingQuantity <= 0) {
            const userInfo = await User.findById(packInfo.customer).lean()

            if (!userInfo) {
                throw new NotFoundError('The customer searched does not exist')
            }

            await emailFinishedPack(userInfo.email, userInfo.name, packInfo.description)

            // Actualizar el estado del pack
            await Pack.findByIdAndUpdate(packId, { status: 'Finished' }, { new: true, runValidators: true }).lean()
        }

        // 3. Validar si expiryDate está a 2 meses o menos
        const twoMonthsFromNow = new Date()
        twoMonthsFromNow.setMonth(currentDate.getMonth() + 2)

        if (expiryDate <= twoMonthsFromNow && expiryDate >= currentDate) {
            await emailNearExpiryTime(userInfo.email, userInfo.name, packInfo.description, packInfo.expiryDate)
        }


        // 4. Validar si expiryDate ya ha pasado
        if (expiryDate < currentDate) {
            await emailExpirationWarning(userInfo.email, userInfo.name, packInfo.description, packInfo.expiryDate)

            // Actualizar el estado del pack
            await Pack.findByIdAndUpdate(packId, { status: 'Expired' }, { new: true, runValidators: true }).lean()
        }

        // Devuelve la información encontrada
        return packInfo
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}