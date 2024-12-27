const validateName = name => {
    if (typeof name !== 'string') throw new Error('invalid name')
    if (name.length < 2)
        throw new Error('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail') //tiene que coincidir con todas las reglas de la expresión regular
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username length')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 8)
        throw new Error('invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new Error('invalid password repeat')
    if (password !== passwordRepeat) // verifica que ambas contraseñas sean iguales
        throw new Error('passwords do not match, babes')
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
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId
}

export default validate