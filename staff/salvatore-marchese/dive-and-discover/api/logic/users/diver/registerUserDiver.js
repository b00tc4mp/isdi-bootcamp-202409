import bcrypt from 'bcryptjs'
import { User } from 'dat'
import { errors, validate } from 'com'

const { DuplicityError, SystemError, ValidationError } = errors

export default async (name, email, password, passwordRepeat) => {
    // Validate input values
    validate.name(name)
    validate.email(email)
    validate.password(password)

    // Check if passwords match
    try {
        validate.passwordsMatch(password, passwordRepeat)
    } catch (error) {
        return Promise.reject(error); // Ensure the promise rejects if passwords don't match
    }

    // Hash password
    let hash
    try {
        hash = await bcrypt.hash(password, 10)
    } catch (error) {
        throw new SystemError(error.message)
    }

    // Check if user already exists
    try {
        await User.create({ name, email, password: hash })
    } catch (error) {
        if (error.code === 11000) throw new DuplicityError('user already exists')
        throw new SystemError(error.message)
    }
}