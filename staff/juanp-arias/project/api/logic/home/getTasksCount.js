import { User, Task } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')
    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Task.countDocuments({ assignes: userId, viewed: { $ne: userId } }) //funcion de consulta en mongo que te dice el número de documentos en los que se cumple la condición.
        })
        .then(unseenTaskCount => {
            return unseenTaskCount
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}