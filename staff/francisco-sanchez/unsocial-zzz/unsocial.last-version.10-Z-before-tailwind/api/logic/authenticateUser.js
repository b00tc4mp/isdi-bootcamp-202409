//import { models } from 'dat'
import { User } from 'dat'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors

//const { User } = models

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username, password })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new CredentialsError('User or pass incorrect')

            return {
                id: user._id.toString(),
                role: user.role
            }
        })

}