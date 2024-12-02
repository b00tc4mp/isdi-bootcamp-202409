import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { errors } from 'com'
import { uuid } from '../../util/index.js'

const { SystemError } = errors

export default () => {
    return (async () => {
        let hash
        let user
        const UUID = uuid()

        const email = UUID + '@gmail.com'
        const username = UUID

        try {
            hash = await bcrypt.hash('password', 1)
        } catch (error) {
            if (error instanceof Error) // In case there is a bcrypt hashing error
                throw new SystemError(error.message)
        }

        try {
            user = await User.create({ email, username, password: hash, role: 'anonymous' })
        } catch (error) { // No duplicity check because of uuid
            throw new SystemError((error as Error).message)
        }

        return user
    })()
}