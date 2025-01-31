import errors from './errors.js'
const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string' || name === '') throw new ValidationError('invalid name')
    if (name.length < 2)
        throw new ValidationError('invalid name length')
}

const validatePackName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid pack name')
    if (name === '') throw new ValidationError('pack name is required')
    if (name.length < 5 || name.length > 50)
        throw new ValidationError('pack name should have more than 5 chars and less than 50')
}

const validateDescription = description => {
    if (typeof description !== 'string') throw new ValidationError('Invalid description: the value must be a string.')
    if (description.length > 255) {
        throw new ValidationError('Invalid description length: maximum allowed is 255 characters.');
    }
}

const validateDate = date => {
    if (!(date instanceof Date)) {
        throw new ValidationError('Invalid date: the value must be a valid Date object.');
    }
}

const validateInteger = num => {
    if (!Number.isInteger(num)) {
        throw new ValidationError('Units provided should be an integer')
    }
}

const validateNumber = num => {
    if (typeof num !== 'number' || !Number.isFinite(num)) {
        throw new ValidationError('Value provided should be a valid number')
    }
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (email.length > 254) throw new ValidationError('email is too long')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid email')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new ValidationError('invalid username')
    if (username.length < 4 || username.length > 25)
        throw new ValidationError('Username should be between 4 to 25 chars')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 4)
        throw new ValidationError('invalid password length')
}

const validateCurrency = currency => {
    if (typeof currency !== 'string' || currency === '') throw new ValidationError('invalid currency')
    if (currency.length !== 3)
        throw new ValidationError('currency should have 3 characters')
}

const validateMethod = method => {
    if (typeof method !== 'string' || method === '') throw new ValidationError('invalid method')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('invalid image')
}

const validateText = (text, explain = 'text') => {
    if (typeof text !== 'string') throw new ValidationError(`invalid text ${explain}`)
}

const validateUnit = (text) => {
    if (typeof text !== 'string') throw new ValidationError('invalid unit')
    if (text !== 'hours' && text !== 'units') throw new ValidationError('units shoud be "hours" or "units"')
}

const validatequantity = (text) => {
    if (typeof text !== 'string') throw new ValidationError('invalid quantity')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validateDni = dni => {
    if (typeof dni !== 'string') throw new ValidationError('invalid dni')
    if (dni.length > 9) throw new ValidationError('dni is too long')
    if (!/^[0-9]{8}[A-Z]$/i.test(dni))
        throw new ValidationError('invalid dni')
}

/* const validateRestParameters = (parameters) => {
    parameters.forEach(parameter => {
        validate[]
    })
} */

const validate = {
    name: validateName,
    packName: validatePackName,
    description: validateDescription,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    callback: validateCallback,
    integerNum: validateInteger,
    number: validateNumber,
    date: validateDate,
    currency: validateCurrency,
    method: validateMethod,
    units: validateUnit,
    quantity: validatequantity,
    dni: validateDni
}

export default validate