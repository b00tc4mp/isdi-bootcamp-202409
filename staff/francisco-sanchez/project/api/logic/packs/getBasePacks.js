import { BasePack, User } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {

    validate.id(userId)

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
                .then(basePack => {
                    if (!basePack || basePack.length === 0) throw new NotFoundError('No basePack found for this userId')

                    basePack.forEach(basePack => {
                        basePack.id = basePack._id.toString()
                        delete basePack._id
                    })
                    return basePack
                })
        })
}