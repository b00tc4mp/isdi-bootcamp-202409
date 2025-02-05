import bcrypt from 'bcryptjs'

import { User } from 'dat'

import { validate, errors } from 'com'

const { SystemError, CredentialsError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return (async () => {
        let user

        try {
            user = await User.findOne({ username })
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new CredentialsError('user not found')

        let match
        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match) throw new CredentialsError('incorrect password')

        return {
            id: user._id.toString(),
            role: user.role
        }
    })()

}