import { BasePack } from 'dat'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {

    console.log('llego al getPacks de la api')

    return BasePack.find({ user: userId })
        .lean() // Usamos `.lean()` para convertir los documentos de Mongoose en objetos JavaScript simples.
        .then(basePack => {
            console.log('Fetched basePack:', basePack);
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
}