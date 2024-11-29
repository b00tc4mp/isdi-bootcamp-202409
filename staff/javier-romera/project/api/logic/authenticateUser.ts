import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors, CustomError } from 'com'
const { SystemError, CredentialsError } = errors

export default (username: string, password: string): Promise<{ id: string, role: string }> => {
    validate.username(username)
    validate.password(password)

    return (async () => {
        let user

        try {
            user = await User.findOne({ username })
        } catch (error) {
            throw new SystemError((error as CustomError).message)
        }

        if (!user) throw new CredentialsError('cagaste')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError((error as CustomError).message)
        }

        if (!match) throw new CredentialsError('cagaste')

        return {
            id: user._id.toString(),
            role: user.role
        }
    })()
}