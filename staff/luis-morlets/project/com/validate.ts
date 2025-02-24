import errors from './errors.js'
const { ValidationError } = errors

const validateName = (name: string) => {
    if (typeof name !== 'string') throw new ValidationError('invalid text name')
    if (name.length < 2)
        throw new ValidationError('invalid name lenght')
}

const validateEmail = (email: string) => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}

const validateUsername = (username: string) => {
    if (typeof username !== 'string') throw new ValidationError('invalid username')
    if (username.length < 4 || username.length > 20)
        throw new ValidationError('invalid username lenght')
}

const validatePassword = (password: string) => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 8)
        throw new ValidationError('invalid password lenght')
}

const validatePasswordsMatch = (password: string, passwordRepeat: string) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateText = (text: string) => {
    if (typeof text !== 'string') throw new ValidationError('invalid text')
}

const validateId = (id: string, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateUuid = (uuid: string, explain: string = 'uuid') => {
    if (typeof uuid !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (!['eldon-brightstaff', 'phinolle-dalvush', 'grothar-skullcrusher', 'thalin-lightbringer', 'camilla-la-croix', 'qivos-shadowstep'].includes(uuid)) throw new ValidationError(`invalid ${explain}`)
}

const validateCallback = (callback: Function) => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validateArray = (array: string[], explain: string = 'array') => {
    if (array.length === 4) throw new ValidationError(`${explain} length must have 4 characters`)
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    text: validateText,
    id: validateId,
    callback: validateCallback,
    uuid: validateUuid,
    array: validateArray
}

export default validate