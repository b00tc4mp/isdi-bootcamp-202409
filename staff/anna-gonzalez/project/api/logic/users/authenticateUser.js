import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors

export default (email, password) => {
    validate.email(email)
    validate.password(password)

    return (async () => {
        let user

        try {
            user = await User.findOne({ email })
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new CredentialsError('Wrong credentials')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match) throw new CredentialsError('Wrong credentials')

        return user._id.toString()
    })()
}