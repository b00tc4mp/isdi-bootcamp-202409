import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors

import { Payload } from '../../types.js'

export default (username: string, password: string, userId?: string): Promise<Payload> => {
    validate.username(username)
    validate.password(password)
    userId && validate.id(userId, 'userId')

    return (async (): Promise<Payload> => {
        let user

        try {
            user = await User.findOne({ username })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new CredentialsError('cagaste')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!match) throw new CredentialsError('cagaste')

        if (userId) {
            try {
                await User.deleteOne({ _id: userId })
            } catch (error) {
                throw new SystemError((error as Error).message)
            }
        }

        return {
            id: user._id.toString(),
            role: user.role,
        }
    })()
}