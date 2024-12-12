import { BasePack } from 'dat'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (basePackId) => {
    try {
        // Busca el BasePack por su ID
        const basePackInfo = await BasePack.findById(basePackId).lean()

        // Si no se encuentra, lanza un error
        if (!basePackInfo) {
            throw new NotFoundError('The pack does not exist')
        }

        // Devuelve la información encontrada
        return basePackInfo
    } catch (error) {
        // Si ocurre un error, lanza un SystemError
        throw new SystemError(error.message)
    }
}
