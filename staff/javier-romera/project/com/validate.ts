import errors from './errors.js'

const { ValidationError } = errors

const validateName = (name: string): void => {
    if (typeof name !== 'string') throw new ValidationError('Invalid name')
    if (name.length < 2) throw new ValidationError('Name is too short, it should be at least 2 characters long')
    if (name.length > 16) throw new ValidationError('Name is too long, it should be shorter than 16 characters long')
}

const validateEmail = (email: string): void => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('Invalid e-mail')
}

const validateUsername = (username: string): void => {
    if (typeof username !== 'string') throw new ValidationError('Invalid username')
    if (username.length < 4)
        throw new ValidationError('Username is too short, it should be at least 4 characters long')
    if (username.length > 16)
        throw new ValidationError('Username is too long, it should be shorter than 16 characters long')
}

const validatePassword = (password: string): void => {
    if (typeof password !== 'string') throw new ValidationError('Invalid password')
    if (password.length < 8)
        throw new ValidationError('Password has to be at least 8 characters long')
}

const validatePasswordsMatch = (password: string, passwordRepeat: string): void => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('Invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('Passwords do not match')
}

const validateId = (id: string, explain: string = 'id'): void => {
    if (typeof id !== 'string') throw new ValidationError(`Invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`Invalid ${explain} length`)
}

const validateCallback = (callback: Function): void => {
    if (typeof callback !== 'function') throw new ValidationError('Invalid callback')
}

const validateCharacterName = (name: string): void => {
    if (typeof name !== 'string') throw new ValidationError('Invalid name')
}

const validateStatus = (status: Number): void => {
    if (typeof status !== 'number') throw new ValidationError('Invalid status')
    if (status < 0 || status > 3) throw new ValidationError('Invalid status')
}

const validateArc = (arc: string): void => {
    if (typeof arc !== 'string') throw new ValidationError('Invalid arc')
    if (arc !== 'Romance-Dawn' && arc !== 'Orange-Town' && arc !== 'Syrup-Village' && arc !== 'Baratie' && arc !== 'Arlong-Park' && arc !== 'Loguetown') throw new ValidationError('Invalid arc')
}

const validateScore = (score: number): void => {
    if (typeof score !== 'number') throw new ValidationError('Invalid score')
    if (score < 0 || score > 500) throw new ValidationError('Invalid score number')
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    id: validateId,
    callback: validateCallback,
    characterName: validateCharacterName,
    status: validateStatus,
    arc: validateArc,
    score: validateScore
}

export default validate