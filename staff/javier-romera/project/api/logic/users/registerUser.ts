import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
import { MongoError } from 'mongodb'

const { DuplicityError, SystemError } = errors

export default (email: string, username: string, password: string, passwordRepeat: string): Promise<void> => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            if (error instanceof Error)
                throw new SystemError(error.message)
        }

        try {
            await User.create({ email, username, password: hash })
        } catch (error) {
            if ((error as MongoError).code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError((error as Error).message)
        }
    })()
}