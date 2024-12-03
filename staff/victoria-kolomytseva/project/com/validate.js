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

const validateSurname = surname => {
    if (typeof surname !== 'string') throw new ValidationError('invalid surname')
    if (surname.length < 3 || surname.length > 30)
        throw new ValidationError('invalid surname length')
}
const validatePhone = phone => {
    if (typeof phone !== 'string') throw new ValidationError('invalid phone')
    if (phone.length < 3)
        throw new ValidationError('invalid number phone')
}
const validateCity = city => {
    if (typeof city !== 'string') throw new ValidationError('invalid city')
    if (city.length < 2)
        throw new ValidationError('City is not exist')
}
const validatePostalCode = postalCode => {
    if (typeof postalCode !== 'string') throw new ValidationError('invalid postal code')
    if (postalCode.length < 4)
        throw new ValidationError('Postal is not exist')
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
    surname: validateSurname,
    phone: validatePhone,
    city: validateCity,
    postalCode: validatePostalCode,
    callback: validateCallback
}

export default validate