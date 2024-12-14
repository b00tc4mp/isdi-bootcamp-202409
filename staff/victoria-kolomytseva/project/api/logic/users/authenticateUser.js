import bcrypt from 'bcryptjs' //Para verificar si la contraseña

import { User } from 'dat'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors

export default (email, password) => {
    validate.email(email)
    validate.password(password)

    return (async () => {
        let user

        try {
            user = await User.findOne({ email }) //Se busca en la base de datos un usuario con el nombre proporcionado
        } catch (error) {
            throw new SystemError(error.message)//si se falla error
        }
        if (!user) throw new CredentialsError('wrong credentials')

        let match

        try {
            match = await bcrypt.compare(password, user.password)//La variable match almacenará true o false dependiendo del resultado de la comparación.
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match) throw new CredentialsError('wrong credentials')

        return {
            id: user._id.toString(),
            role: user.role
        }
    })()

}