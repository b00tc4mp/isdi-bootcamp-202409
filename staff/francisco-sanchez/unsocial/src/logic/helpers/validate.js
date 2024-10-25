//Validamos el que nombre no sea inferior a 2 carácteres
const validateName = name => {
    if (typeof name !== 'string') throw new Error('invalid name')
    if (name.length < 2) {
        throw new Error('Field name too short, min 3 chars')
    }
}

//Validamos el email (que incluya al menos una '@ 'y un '.')
const validateEmail = email => {
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')
}

//Busco si el usuario ya existe
const validateUsername = username => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')
}


const validatePassword = password => {
    if (typeof password !== 'string') throw new Error('invalid username')
    if (password.length < 4)
        throw new Error('invalid password')
}

const validatePasswordMatch = (password, passwordRepeat) => {
    //Validamos el password
    if (password !== passwordRepeat) {
        throw new Error('Passwords not match')
    }
}

const validateId = (id, explain = 'id') => {
    //if (typeof postId !== 'string') throw new Error('invalid postId')
    if (typeof id !== 'string') throw new Error(`invalid ${explain}`)
}

const validateImage = image => {
    if (typeof image !== 'string') throw new Error('invalid image')
}

const validateText = text => {
    if (typeof text !== 'string') throw new Error('invalid text')
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordMatch: validatePasswordMatch,
    id: validateId,
    image: validateImage,
    text: validateText
}

export default validate