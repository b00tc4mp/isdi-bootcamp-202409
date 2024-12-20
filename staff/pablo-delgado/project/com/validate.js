import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.length < 2)
        throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new ValidationError('invalid username')
    if (username.length < 3 || username.length > 30)
        throw new ValidationError('invalid username length')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 8)
        throw new ValidationError('invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('invalid image')
    if (image.trim().length === 0) throw new ValidationError('invalid image length')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('invalid text')
    if (text.trim().length === 0) throw new ValidationError('invalid text length')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

//
const validateString = (value, name) => {
    if (typeof value !== 'string') throw new ValidationError(`${name} must be a string`)
    if (value.trim().length === 0) throw new ValidationError(`${name} cannot be empty`)
}

const validateNumber = (value, name) => {
    if (typeof value !== 'number' || isNaN(value)) throw new ValidationError(`${name} must be a valid number`)
}

const validateArray = (value, name) => {
    if (!Array.isArray(value)) throw new ValidationError(`${name} must be an array`)
}

const validateCoordinate = (value, name) => {
    if (typeof value !== 'number' || isNaN(value)) throw new ValidationError(`${name} must be a valid coordinate`)
}

const validateQuery = query => {
    validateString(query, 'query') // Reutiliza validateString
}

const validateDistance = distance => {
    validateNumber(distance, 'distance') // Reutiliza validateNumber
}

const validateCoords = coords => {
    validateArray(coords, 'coords') // Reutiliza validateArray
    if (coords.length !== 2) throw new ValidationError('coords must have two elements')
    validateCoordinate(coords[0], 'longitude') // Reutiliza validateCoordinate
    validateCoordinate(coords[1], 'latitude') // Reutiliza validateCoordinate
}
const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    callback: validateCallback,
    string: validateString, 
    number: validateNumber, 
    array: validateArray,  
    coordinate: validateCoordinate
}

export default validate