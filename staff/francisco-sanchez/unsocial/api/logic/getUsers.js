import { User } from 'dat'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export default () => {

    console.log('llego al getUsers de la api')


    return User.find()
        .lean() // Usamos `.lean()` para convertir los documentos de Mongoose en objetos JavaScript simples.
        .then(users => {
            console.log('Users fetched from database:', users);
            //Este return lo tenemos que poner porqué sinó el segundo .then falla
            return users
        })
        .catch(error => {
            throw new SystemError(error.message)
        })

        .then(users => {
            if (!users || users.length === 0) throw new NotFoundError('No users found')

            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
            })

            return users
        })
}