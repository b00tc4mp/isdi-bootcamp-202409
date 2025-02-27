import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name, username, password, phone, email, passwordRepeat) => {
    validate.name(name)
    validate.username(username)
    validate.password(password)
    validate.phone(phone)
    validate.email(email)
    validate.passwordsMatch(password, passwordRepeat)

    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({ name, username, password: hash, phone, email })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user already exists')
            throw new SystemError(error.message)
        }
    })()
}