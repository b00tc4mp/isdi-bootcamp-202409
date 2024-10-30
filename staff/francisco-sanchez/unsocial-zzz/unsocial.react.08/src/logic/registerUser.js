import validate from './helpers/validate.js'

import uuid from '../data/uuid.js'

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)


    //Recuperamos los usuarios de la memoria
    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)


    if (user) {
        throw new Error('The user ' + username + ' already exist in the database')
    }

    let newUser = {
        id: uuid(),
        name: name,
        email: email,
        username: username,
        password: password
    }
    users.push(newUser)

    //Actualizamos el array de usuarios en la memoria
    localStorage.users = JSON.stringify(users)
}