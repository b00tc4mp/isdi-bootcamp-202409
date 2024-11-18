import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, CredentialsError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username, password })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new CredentialsError('Wrong credentials')

            return {
                id: user._id.toString(),
                role: user.role
            }
        })
}