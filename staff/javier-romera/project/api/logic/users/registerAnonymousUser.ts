import bcrypt from 'bcryptjs'

import { User, TUser } from 'dat'
import { errors } from 'com'
import { uuid } from '../../util/index.js'

const { SystemError } = errors

export default (): Promise<TUser> => {
    return (async (): Promise<TUser> => {
        let hash
        let user
        const UUID = uuid()

        const email = UUID + '@gmail.com'
        const username = UUID

        try {
            hash = await bcrypt.hash('password', 1)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        try {
            user = await User.create({ email, username, password: hash, role: 'anonymous' })
        } catch (error) { // No duplicity check because of uuid
            throw new SystemError((error as Error).message)
        }

        return user
    })()
}