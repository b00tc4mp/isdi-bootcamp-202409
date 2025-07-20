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
const validateRole = (role) => {
    if (typeof role !== 'string') throw new ValidationError('Invalid role')
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

const validateLocation = (location) => {
    if (typeof location.address !== 'string') throw new ValidationError('Invalid location format')
    if (location.address.trim().length < 3) throw new ValidationError('Location must be at least 3 characters')
    if (location.address.trim().length > 200) throw new ValidationError('Location must not exceed 100 characters')
}

const validateWhatHappened = (whatHappened) => {
    if (typeof whatHappened !== 'string') {
        throw new ValidationError('Invalid whatHappened format')
    }
    const whatHappenedEnum = ['lost', 'found']
    if (!whatHappenedEnum.includes(whatHappened)) {
        throw new ValidationError('Invalid enum')
    }
}
const validatePetType = (petType) => {
    if (typeof petType !== 'string') {
        throw new ValidationError('invalid text')
    }
    const petTypesEnum = ['cat', 'dog', 'ferret']
    if (!petTypesEnum.includes(petType)) {
        throw new ValidationError('Invalid enum')
    }
}
const validatePetGender = (petGender) => {
    if (typeof petGender !== 'string') {
        throw new ValidationError('Invalid petGender format');
    }
    const petGenderEnum = ['male', 'female']
    if (!petGenderEnum.includes(petGender)) {
        throw new ValidationError('Invalid enum')

    }
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    surname: validateSurname,
    phone: validatePhone,
    role: validateRole,
    city: validateCity,
    postalCode: validatePostalCode,
    callback: validateCallback,
    location: validateLocation,
    whatHappened: validateWhatHappened,
    petType: validatePetType,
    petGender: validatePetGender
}

export default validate