import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('Invalid name')
    if (name.length < 2 || name.length > 10)
        throw new ValidationError('Invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('Invalid email')
    if (!/^(([^<>()[\]\.,:\s@\"]+(\.[^<>()[\]\.,:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,:\s@\"]+\.)+[^<>()[\]\.,:\s@\"]{2,})$/i.test(email))
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

const validatePhase = phase => {
    if (!['menstruation', 'follicular', 'ovulation', 'luteal'].includes(phase)) { throw new ValidationError('Invalid phase') }
}

const validateDayLogData = data => {
    if (typeof data !== 'object') { throw new Error('Invalid data format') }
}

const validateDate = date => {
    const ISODate = new Date(date).toISOString()
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[\+\-]\d{2}:\d{2})$/

    if (!regex.test(ISODate)) { throw new Error('Invalid ISO date format') }
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
    data: validateDayLogData,
    date: validateDate,
    phase: validatePhase,
    id: validateId,
    callback: validateCallback
}

export default validate