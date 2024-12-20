import bcrypt from 'bcryptjs'

import { User } from '../../../dat/index.js'
import validate from '../../../com/validate.js'//import { validate, errors } from 'com' //check route//import { validate, errors } from '../../com/index.js'
import errors from '../../../com/errors.js'

const { DuplicityError, SystemError } = errors

const registerUser = (name, email, username, password, password2) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(password, password2)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash =>
            User.create({ name, email, username, password: hash })
                .then(_ => { })
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already registered')

                    throw new SystemError(error.message)

                })
        )
}

export default registerUser 