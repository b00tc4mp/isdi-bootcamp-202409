const authenticateUser = (username, password) => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('unsername lenght should be between 4 and 12 chars')

    if (typeof password !== 'string') throw new Error('invalid username')
    if (password.length === '')
        throw new Error('Password is required')

    //Recuperamos los usuarios de la memoria
    const users = JSON.parse(localStorage.users)

    let user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('User or password are not valid')

    return user.id
}