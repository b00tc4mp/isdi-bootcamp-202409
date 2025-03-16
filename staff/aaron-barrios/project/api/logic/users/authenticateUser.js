import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors

export default (nickname, password) => {
    validate.nickname(nickname)
    validate.password(password)

    return (async () => {
        let user
        try {
            user = await User.findOne({ nickname })
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new CredentialsError('wrong credentials')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
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