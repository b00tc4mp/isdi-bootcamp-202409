const authenticateUser = (username, password) => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 14)
        throw new Error('invalid username lenght')

    if (typeof password !== 'string') throw new Error('invalid password')
    if (password.length < 8)
        throw new Error('invalid password lenght')

    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('Wrong credentials, try again')

    return user.id
}

export default authenticateUser