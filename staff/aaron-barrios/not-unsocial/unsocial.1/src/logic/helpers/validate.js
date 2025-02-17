const validateName = name => {
    if (typeof name !== 'string') throw new Error('invalid name')
    if (name.length < 2)
        throw new Error('Name too short')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('Invalid e-mail')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 2)
        throw new Error('Password too short')
}

const validatePasswordMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat')
    if (passwordRepeat !== password) {
        password.value = ''
        passwordRepeat.value = ''
        throw new Error('Password does not match!')
    }
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
    passwordMatch: validatePasswordMatch,
    image: validateImage,
    text: validateText,
    id: validateId
}

export default validate