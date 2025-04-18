import uuid from '../data/uuid'

export default (name, email, username, password, passwordRepeat) => {

    if ( typeof name !== 'string') throw new Error('invalid name')
    if(name.length < 2)
        throw new Error('Invalid name')

    if ( typeof email !== 'string') throw new Error('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    if ( typeof username !== 'string') throw new Error('invalid username')
    if(username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    if ( typeof password !== 'string') throw new Error('invalid password')
    if(password.length < 8)
        throw new Error('Invalid password')

    if ( typeof passwordRepeat !== 'string') throw new Error('invalid password repeat')
    if(passwordRepeat !== password)
        throw new Error('Passwords do not match!')

    const users = JSON.parse(localStorage.users)
    
    //check if the username or email already exists
    let user = users.find(user => user.username === username || user.email === email)

    if(user !== undefined)
        throw new Error('User already exists')

    user = {
        id: uuid(),
        name: name,
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}