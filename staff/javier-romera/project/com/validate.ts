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
    if (password.length < 8) throw new ValidationError('Password has to be at least 8 characters long')
}

const validatePasswordsMatch = (password: string, passwordRepeat: string): void => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('Invalid password repeat')
    if (password !== passwordRepeat) throw new ValidationError('Passwords do not match')
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

const validateFrom = (from: string): void => {
    if (typeof from !== 'string') throw new ValidationError('Invalid from')
    if (from !== 'onepiecedle' && from !== 'onedoku') throw new ValidationError('Invalid from area')
}

const validateArc = (arc: string): void => {
    if (typeof arc !== 'string') throw new ValidationError('Invalid arc')
    if (arc !== 'Romance-Dawn' && arc !== 'Orange-Town' && arc !== 'Syrup-Village' && arc !== 'Baratie' && arc !== 'Arlong-Park' && arc !== 'Loguetown') throw new ValidationError('Invalid arc')
}

const validateScore = (score: number): void => {
    if (typeof score !== 'number') throw new ValidationError('Invalid score')
    if (score < 0 || score > 500) throw new ValidationError('Invalid score number')
}

const validateRankingLength = (rankingLength: number): void => {
    if (typeof rankingLength !== 'number') throw new ValidationError('Invalid ranking length')
    if (rankingLength > 20) throw new ValidationError('Ranking length already reached it\'s maximum')
}

const validateUpdateProfile = (username: string | undefined, email: string | undefined, oldPassword: string | undefined, newPassword: string | undefined, newPasswordRepeat: string | undefined) => {
    if (!(username || email || oldPassword || newPassword || newPasswordRepeat)) throw new ValidationError('Invalid data')
}

const validatePasswordUpdate = (oldPassword: string | undefined, newPassword: string | undefined, newPasswordRepeat: string | undefined): void => {
    if (oldPassword || newPassword || newPasswordRepeat)
        if (!(oldPassword && newPassword && newPasswordRepeat))
            throw new ValidationError('You have to fill all the password fields')

    if (typeof oldPassword !== 'string') throw new ValidationError('Invalid old password')
    if (oldPassword.length < 8) throw new ValidationError('Old password has to be at least 8 characters long')

    if (typeof newPassword !== 'string') throw new ValidationError('Invalid new password')
    if (newPassword.length < 8) throw new ValidationError('New password has to be at least 8 characters long')

    if (typeof newPasswordRepeat !== 'string') throw new ValidationError('Invalid new password repeat')
    if (newPasswordRepeat.length < 8) throw new ValidationError('New password repeat has to be at least 8 characters long')

    if (newPassword !== newPasswordRepeat) throw new ValidationError('New passwords do not match')
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
    score: validateScore,
    rankingLength: validateRankingLength,
    updateProfile: validateUpdateProfile,
    passwordUpdate: validatePasswordUpdate,
    from: validateFrom
}

export default validate