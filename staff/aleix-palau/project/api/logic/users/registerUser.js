import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (email, password, passwordRepeat) => {
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
            await User.create({ email, password: hash })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}