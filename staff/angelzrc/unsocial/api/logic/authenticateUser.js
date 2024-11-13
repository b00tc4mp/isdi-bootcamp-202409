import db from 'dat'
import { validate, errors } from 'com'

const { SystemError, CredentialsError } = errors



export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return db.users.findOne({ username, password })
        .catch(error => { new SystemError(error.message) })
        .then(user => {
            if (!user) throw new CredentialsError('wrong credentials')

            return user._id.toString()
        })
}