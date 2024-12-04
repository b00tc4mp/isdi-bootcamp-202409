import errors from './errors.js'

const { ValidationError } = errors 

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.length < 2)
        throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid e-mail')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
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

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validateAddress = address => {
    if (typeof address !== 'string') throw new ValidationError('invalid address');
    if (address.trim() === '') throw new ValidationError('address cannot be empty');
    if (address.length < 5) throw new ValidationError('address is too short');
    if (address.length > 200) throw new ValidationError('address is too long');
}

const validatePostcode = postcode => {
    if (typeof postcode !== 'string') throw new ValidationError('invalid postcode');
    if (!/^\d{5}$/.test(postcode)) throw new ValidationError('postcode must be a 5-digit number');
}

const validateCountry = country => {
    if (typeof country !== 'string') throw new ValidationError('invalid country');
    if (country.trim() === '') throw new ValidationError('country cannot be empty');
    if (country.length < 3) throw new ValidationError('country name is too short');
    if (country.length > 100) throw new ValidationError('country name is too long');
}

const validateCity = city => {
    if (typeof city !== 'string') throw new ValidationError('invalid city');
    if (city.trim() === '') throw new ValidationError('city cannot be empty');
    if (city.length < 2) throw new ValidationError('city name is too short');
    if (city.length > 100) throw new ValidationError('city name is too long');
}

const validateTelephone = telephone => {
    if (typeof telephone !== 'string') throw new ValidationError('invalid telephone number');
    if (!/^\+?\d{9,15}$/.test(telephone)) throw new ValidationError('telephone must be between 9 and 15 digits, with optional "+"');
}



const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    address: validateAddress,
    postcode: validatePostcode,
    country: validateCountry,
    city: validateCity,
    telephone: validateTelephone,
    id: validateId,
    callback: validateCallback
}

export default validate