import { BasePack, User, Pack } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return BasePack.find({ user: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(basePack => {
                    return basePack
                })
                .then(basePack => {
                    if (!basePack || basePack.length === 0) throw new NotFoundError('No basePack found for this userId')

                    //If found basePacks we'll count how many assigned and active packs are
                    const basePackIds = basePack.map(pack => pack._id)

                    // Consultamos el recuento de referencias en la colección `packs`
                    return Pack.aggregate([
                        { $match: { refPack: { $in: basePackIds } } },
                        { $group: { _id: "$refPack", count: { $sum: 1 } } }
                    ])
                        .catch(error => { throw new SystemError(error.message) })
                        .then((counts) => {
                            //console.log(counts)
                            const countMap = new Map()
                            counts.forEach(({ _id, count }) => {
                                countMap.set(_id.toString(), count)
                            })
                            // Transformamos los resultados en un mapa para acceso rápido
                            basePack.forEach(basePack => {
                                basePack.refCount = countMap.get(basePack._id.toString()) || 0
                                basePack.id = basePack._id.toString()
                                delete basePack._id
                            })
                            return basePack
                        })
                })
        })
}