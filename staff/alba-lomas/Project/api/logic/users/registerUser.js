


import bcrypt from 'bcryptjs'
import { User } from 'dat'
import { validate, errors } from 'com'

const { DuplicityError, SystemError, ValidationError } = errors

export default async (role, name, email, license, password, passwordRepeat) => {
    validate.role(role)
    validate.name(name)
    validate.email(email)

    if (!license) {
        throw new ValidationError('Licencia inválida') 
    }

    try {
        validate.license(license) 
    } catch (err) {
        throw new ValidationError('Formato de documento de identidad inválido') 
    }

    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    try {
        const hash = await bcrypt.hash(password, 10)
        await User.create({ role, name, email, license, password: hash })
    } catch (error) {
        if (error.code === 11000) throw new DuplicityError('Este usuario ya existe')
        throw new SystemError(error.message)
    }
}
