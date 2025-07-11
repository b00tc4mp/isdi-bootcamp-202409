import { errors } from './errors.js'

const { ValidationError } = errors

//users

const validateName = (name, explain = 'name') => {
    if (typeof name !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (name.length < 2)
        throw new ValidationError(`invalid ${explain} length`)
}

const validateEmail = (email, explain = 'email') => {
    if (typeof email !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError(`invalid ${explain}`)
}

const validateUsername = (username, explain = 'username') => {
    if (typeof username !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (username.length < 4 || username.length > 12)
        throw new ValidationError(`invalid ${explain} length`)
}

const validatePassword = (password, explain = 'password') => {
    if (typeof password !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (password.length < 8)
        throw new ValidationError(`invalid ${explain} length`)
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid passwordRepeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateImage = (image, explain = 'image') => {
    if (typeof image !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (image.trim().length === 0) throw new ValidationError(`invalid ${explain} length`)
}

const validateText = (text, explain = 'text') => {
    if (typeof text !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (text.trim().length === 0) throw new ValidationError(`invalid ${explain} length`)
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

//pets 

const validatePetName = (name, explain = 'pet name') => {
    if (typeof name !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (name.trim().length < 2) throw new ValidationError(`${explain} too short`)
}

const validateSpecies = (species, explain = 'species') => {
    const validSpecies = ['dog', 'cat']
    if (!validSpecies.includes(species)) throw new ValidationError(`invalid ${explain}`)
}

const validatePetBday = (birthdate, explain = 'birthdate') => {
    if (!(birthdate instanceof Date) && typeof birthdate !== 'string')
        throw new ValidationError(`invalid ${explain}`)

    const date = new Date(birthdate)
    const now = new Date()

    if (isNaN(date.getTime()))
        throw new ValidationError(`${explain} is not a valid date`)

    if (date > now)
        throw new ValidationError(`${explain} cannot be in the future`)

    const oldestPossiblePetAge = 50
    const years = now.getFullYear() - date.getFullYear()
    if (years > oldestPossiblePetAge)
        throw new ValidationError(`${explain} is too far in the past`)
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
    petname: validatePetName,
    species: validateSpecies,
    birthdate: validatePetBday
}

export default validate
