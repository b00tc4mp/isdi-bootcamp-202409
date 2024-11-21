import errors from './errors.js'
const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid text name')
    if (name.length < 2)
        throw new ValidationError('invalid name lenght')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new ValidationError('invalid username')
    if (username.length < 4 || username.length > 14)
        throw new ValidationError('invalid username lenght')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 8)
        throw new ValidationError('invalid password lenght')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('invalid image')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('invalid text')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    callback: validateCallback
}

export default validate