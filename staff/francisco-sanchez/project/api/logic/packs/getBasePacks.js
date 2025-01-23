import { BasePack, User, Pack } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return BasePack.find({ user: userId })
                .lean() // Usamos `.lean()` para convertir los documentos de Mongoose en objetos JavaScript simples.
                .then(basePack => {
                    //console.log('Fetched basePack:', basePack);
                    //Este return lo tenemos que poner porqué sinó el segundo .then falla
                    return basePack
                })
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(async basePack => {
                    if (!basePack || basePack.length === 0) throw new NotFoundError('No basePack found for this userId')

                    //If found basePacks we'll count how many assigned and active packs are
                    const basePackIds = basePack.map(pack => pack._id)

                    // Consultamos el recuento de referencias en la colección `packs`
                    const counts = await Pack.aggregate([
                        { $match: { refPack: { $in: basePackIds } } },
                        { $group: { _id: "$refPack", count: { $sum: 1 } } }
                    ])

                    // Transformamos los resultados en un mapa para acceso rápido
                    const countMap = counts.reduce((acc, item) => {
                        acc[item._id.toString()] = item.count
                        return acc
                    }, {})

                    basePack.forEach(basePack => {
                        basePack.id = basePack._id.toString()
                        basePack.refCount = countMap[basePack.id] || 0
                        delete basePack._id
                    })
                    return basePack
                })
        })
}