import uuid from '../data/uuid'

export default (name, email, username, password, passwordRepeat) => {
    if (typeof name !== 'string') throw new Error('invalid text name')
    if (name.length < 2)
        throw new Error('invalid name lenght')

    if (typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 14)
        throw new Error('invalid username lenght')

    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 8)
        throw new Error('invalid password lenght')

    if (typeof passwordRepeat !== 'string') throw new Error('invalid password repeat')
    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined)
        throw new Error('user aleready exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password, passwordRepeat: passwordRepeat }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}