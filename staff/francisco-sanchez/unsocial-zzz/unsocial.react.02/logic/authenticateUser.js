const authenticateUser = (username, password) => {
    if (username.length < 4 || username.length > 12)
        throw new Error('unsername lenght should be between 4 and 12 chars')

    if (password.length === '')
        throw new Error('Password is required')

    let user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('User or password are not valid')

    return user
}