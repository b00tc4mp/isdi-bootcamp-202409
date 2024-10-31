const authenticateUser = (username, password) =>{
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    const user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('User not found')
    return user
}