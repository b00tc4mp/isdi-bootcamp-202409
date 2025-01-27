


import bcrypt from 'bcryptjs'
import { User } from 'dat'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors

export default (name, password) => {
    validate.name(name)
    validate.password(password)

    return (async () => {
        let user
        try {
            user = await User.findOne({ name })
        } catch (error) { throw new SystemError(error.message) }
        if (!user) throw new CredentialsError('Usuario incorrecto')

        let match
        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) { throw new SystemError(error.message) }
        if (!match) throw new CredentialsError('Contraseña incorrecta')

        return {
            id: user._id.toString(),
            role: user.role
        }
    })()
}