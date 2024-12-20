import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.length < 2)
        throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalidemail')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid email')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new ValidationError('invalide username')
    if (username.length < 3 || username.length > 20)
        throw new ValidationError('invalid username length')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 8)
        throw new ValidationError('invalid password length')
}

const validatePasswordsMatch = (password, password2) => {
    if (typeof password2 !== 'string') throw new ValidationError('invalid repeated password')
    if (password !== password2)
        throw new ValidationError('passwords do not match')
}

const validateLink = link => {
    if (typeof link !== 'string') throw new ValidationError('invalid link')
    if (link.trim().length === 0) throw new ValidationError('invalid url length')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('invalid text')
    if (text.trim().length === 0) throw new ValidationError('invalid text length')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCategory = (category, explain = 'category') => {
    if (typeof category !== 'number') throw new ValidationError(`invalid ${explain}`)
}

const validateCountry = (country, explain = 'country') => {
    if (typeof country !== 'string') throw new ValidationError(`invalid ${explain}`)
}

const validatePrice = (price, explain = 'price') => {
    if (typeof price !== 'number') throw new ValidationError(`invalid ${explain}`)
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    link: validateLink,
    text: validateText,
    id: validateId,
    category: validateCategory,
    country: validateCountry,
    price: validatePrice
}


export default validate