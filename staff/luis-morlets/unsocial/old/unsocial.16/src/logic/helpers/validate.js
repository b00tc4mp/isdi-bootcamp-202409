const validateName = name => {
    if (typeof name !== 'string') throw new Error('invalid text name')
    if (name.length < 2)
        throw new Error('invalid name lenght')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 14)
        throw new Error('invalid username lenght')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 8)
        throw new Error('invalid password lenght')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new Error('invalid password repeat')
    if (password !== passwordRepeat)
        throw new Error('passwords do not match')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new Error('invalid image')
}

const validateText = text => {
    if (typeof text !== 'string') throw new Error('invalid text')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new Error(`invalid ${explain}`)
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId
}

export default validate