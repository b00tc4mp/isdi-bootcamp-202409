import { BasePack, User, Pack } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return (async () => {
        let user, basePacks

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) throw new NotFoundError('user not found')


        try {
            basePacks = await BasePack.find({ user: userId }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!basePacks || basePacks.length === 0) throw new NotFoundError('No basePack found for this userId')


        // Contar los packs asignados a cada basePack
        try {
            const basePacksWithCount = await Promise.all(
                basePacks.map(async (basePack) => {
                    const packCount = await Pack.countDocuments({ refPack: basePack._id })

                    basePack.id = basePack._id.toString()
                    delete basePack._id

                    return {
                        ...basePack,
                        refCount: packCount,
                    }
                })
            )

            return basePacksWithCount

        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}