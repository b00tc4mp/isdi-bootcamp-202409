const validateName = name => {
    if (typeof name !== 'string') throw new Error('Invalid name')
    if (name.length < 2)
        throw new Error('Invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new Error('Invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('Invalid email')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new Error('Invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username length')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new Error('Invalid password')
    if (password.length < 8)
        throw new Error('Invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new Error('Invalid password repeat')
    if (password !== passwordRepeat)
        throw new Error('Passwords do not match')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new Error('Invalid image')
}

const validateText = text => {
    if (typeof text !== 'string') throw new Error('Invalid text')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new Error(`invalid ${explain}`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new Error('Invalid callback')
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
    callback: validateCallback
}

export default validate