import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.length < 1)
        throw new ValidationError('Invalid name length')
}

const validateNickname = nickname => {
    if (typeof nickname !== 'string') throw new ValidationError('invalid nickname')
    if (nickname.length < 1)
        throw new ValidationError('Invalid nickname length')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid name')
    if (password.length < 1)
        throw new ValidationError('Invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateAvatar = avatar => {
    if (typeof avatar !== 'string') throw new ValidationError('invalid avatar')
    if (avatar.trim().length === 0) throw new ValidationError('invalid avatar length')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new validateAvatar('invalid callback')
}

const validate = {
    name: validateName,
    nickname: validateNickname,
    password: validatePassword,
    passwordsmatch: validatePasswordsMatch,
    avatar: validateAvatar,
    id: validateId,
    callback: validateCallback
}

export default validate