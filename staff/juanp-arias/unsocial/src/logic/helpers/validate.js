const validateName = name => {
    if (typeof name !== 'string') throw new Error('invalid name')
    if (name.length < 2)
        throw new Error('invalid name')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 3)
        throw new Error('invalid password')
}

const validatePasswordRepeat = (password, repeatpassword) => {
    if (typeof repeatpassword !== 'string') throw new Error('invalid password repeat')
    if (password !== repeatpassword)
        throw new Error('passwords do not match')

}

const validateImage = image => {
    if (typeof image !== 'string') throw new Error('invalid image');
    if (typeof text === "") throw new Error('invalid post')
}

const validateText = text => {
    if (typeof text !== 'string') throw new Error('invalid text');
    if (typeof text === "") throw new Error('invalid post')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new Error(`invalid ${explain}`)
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordRepeat: validatePasswordRepeat,
    image: validateImage,
    text: validateText,
    id: validateId
}
export default validate