import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name, nickname, password, passwordRepeat) => {
    validate.name(name)
    validate.nickname(nickname)
    validate.password(password)
    validate.passwordsmatch(password, passwordRepeat)

    debugger
    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({ name, nickname, password: hash })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}