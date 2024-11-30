import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { errors } from 'com'
import { MongoError } from 'mongodb'
import { uuid } from '../../util/index.js'

const { DuplicityError, SystemError } = errors

export default () => {
    return (async () => {
        let hash
        let user
        const UUID = uuid()

        const name = UUID
        const email = UUID + '@gmail.com'
        const username = UUID

        try {
            hash = await bcrypt.hash('password', 1)
        } catch (error) {
            if (error instanceof Error)
                throw new SystemError(error.message)
        }

        try {
            user = await User.create({ name, email, username, password: hash, role: 'anonymous' })
        } catch (error) {
            if ((error as MongoError).code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError((error as Error).message)
        }

        return user
    })()
}