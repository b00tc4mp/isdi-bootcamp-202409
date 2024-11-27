const authenticateUser = (username, password) => {
    if (username.length < 4 || username.length > 14)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('Wrong credentials, try again')

    return user
}