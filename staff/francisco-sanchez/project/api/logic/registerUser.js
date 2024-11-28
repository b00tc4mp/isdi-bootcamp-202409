import bcrypt from 'bcryptjs'

import { User } from 'dat'
import errors from '../../com/errors.js'
import validate from '../../com/validate.js'

const { DuplicityError, SystemError } = errors

export default (name, username, password, passwordRepeat, email, plan, creationStatus) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)


    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({ name, email, username, password: hash, plan, creationStatus })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user elready exists')

            throw new SystemError(error.message)

        }
    })()
}