import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('Invalid name')
    if (name.length < 2 || name.length > 10)
        throw new ValidationError('Invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('Invalid e-mail')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('Invalid password')
    if (password.length < 8)
        throw new ValidationError('Invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('Invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('Passwords do not match')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('Invalid text')
    if (text.trim().length === 0) throw new ValidationError('Invalid text length')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`Invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`Invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('Invalid callback')
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    text: validateText,
    id: validateId,
    callback: validateCallback
}

export default validate