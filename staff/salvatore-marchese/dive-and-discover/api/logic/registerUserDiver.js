import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
import errorHandler from '../helpers/errorHandler.js'


const { DuplicityError, SystemError } = errors

export default (name, email, password, passwordRepeat) => {
    validate.name(name)
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
            await User.create({ name, email, password: hash })
        } catch (error) {
            if (errorHandler.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}