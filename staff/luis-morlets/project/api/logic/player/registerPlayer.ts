import bcrypt from 'bcryptjs'

import { Player } from 'dat'
import { validate, errors } from 'com'
import { MongoError } from 'mongodb'

const { SystemError, DuplicityError } = errors

export default (name: string, email: string, username: string, password: string, passwordRepeat: string): Promise<void> => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 8)
        } catch (error) {
            if (error instanceof SystemError) throw new SystemError((error as Error).message)
        }

        try {
            await Player.create({ name, email, username, password: hash })
        } catch (error) {
            if ((error as MongoError).code === 11000) throw new DuplicityError('this user already exists')

            if (error instanceof SystemError) throw new SystemError((error as Error).message)
        }
    })()
}