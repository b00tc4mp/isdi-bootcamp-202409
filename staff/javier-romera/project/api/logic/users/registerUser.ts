import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
import { MongoError } from 'mongodb'

const { DuplicityError, SystemError, NotFoundError } = errors

export default (email: string, username: string, password: string, passwordRepeat: string, userId?: string): Promise<void> => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    userId && validate.id(userId, 'userId')

    return (async (): Promise<void> => {
        let hash
        let user

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            if (error instanceof Error)
                throw new SystemError(error.message)
        }

        if (!userId) {
            try {
                await User.create({ email, username, password: hash })
            } catch (error) {
                if ((error as MongoError).code === 11000) throw new DuplicityError('user already exists')

                throw new SystemError((error as Error).message)
            }
        } else {
            try {
                user = await User.findById(userId).lean()
            } catch (error) {
                if (error instanceof Error)
                    throw new SystemError(error.message)
            }

            if (!user) throw new NotFoundError('user not found')

            try {
                await User.updateOne({ _id: userId }, { email: email, username: username, password: hash, role: 'regular' })
            } catch (error) {
                if ((error as MongoError).code === 11000) throw new DuplicityError('user already exists')

                throw new SystemError((error as Error).message)
            }
        }
    })()
}