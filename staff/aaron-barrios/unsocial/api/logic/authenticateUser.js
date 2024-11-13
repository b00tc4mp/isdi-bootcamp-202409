import { models } from 'dat'
import validate from './helpers/validate.js'
import { errors } from 'com'

const { SystemError, CredentialsError } = errors
const { User } = models

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username, password })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new CredentialsError('wrong credentials')

            return user._id.toString()
        })
}