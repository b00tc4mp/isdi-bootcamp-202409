import { Pack, User } from 'dat'
import { errors } from 'com'
import { emailLowTimeWarning } from '../emailing/index.js'

const { SystemError, NotFoundError } = errors

export default async (packId) => {
    try {
        // Busca el BasePack por su ID
        const packInfo = await Pack.findById(packId).lean()

        // Si no se encuentra, lanza un error
        if (!packInfo) {
            throw new NotFoundError('The pack does not exist')
        }

        const currentDate = new Date();
        const expiryDate = new Date(packInfo.expiryDate);
        const remainingQuantity = packInfo.remainingQuantity || 0;


        // 1. Validar si remainingQuantity < 2 horas/unidades
        if (remainingQuantity < 2 && remainingQuantity > 0) {
            console.log('enviaré email avisando de pocas horas o sesiones')

            const userInfo = await User.findById(packInfo.customer).lean()
            if (!userInfo) {
                throw new NotFoundError('The customer searched does not exist')
            }
            console.log(userInfo)

            await emailLowTimeWarning(userInfo.email, userInfo.name, packInfo.description, packInfo.remainingQuantity)
        }

        // 2. Validar si remainingQuantity <= 0
        if (remainingQuantity <= 0) {
            console.log('actualizaré el status del pack')
            /* await sendMail(
                packInfo.customerEmail,
                'Your pack has expired',
                'Your pack has run out of time/units. Please contact us to renew or purchase a new pack.'
            ); */

            // Actualizar el estado del pack
            await Pack.findByIdAndUpdate(packId, { status: 'Finished' }, { new: true, runValidators: true }).lean();
        }

        // 3. Validar si expiryDate está a 2 meses o menos
        const twoMonthsFromNow = new Date();
        twoMonthsFromNow.setMonth(currentDate.getMonth() + 2);

        if (expiryDate <= twoMonthsFromNow && expiryDate >= currentDate) {
            console.log('enviaré un email avisando de caducidad cercana')

            /* await sendMail(
                packInfo.customerEmail,
                'Your pack is about to expire',
                'Your pack will expire soon. Please contact us if you wish to renew.'
            ); */
        }


        // 4. Validar si expiryDate ya ha pasado
        if (expiryDate < currentDate) {
            console.log('enviaré un email avisando que el pack ha caducado y actualizaré el status')

            /* await sendMail(
                packInfo.customerEmail,
                'Your pack has expired',
                'Your pack has expired. Please contact us to renew or purchase a new pack.'
            ); */

            // Actualizar el estado del pack
            await Pack.findByIdAndUpdate(packId, { status: 'Expired' }, { new: true, runValidators: true }).lean();
        }

        // Devuelve la información encontrada
        return packInfo
    } catch (error) {
        // Si ocurre un error, lanza un SystemError
        throw new SystemError(error.message)
    }
}