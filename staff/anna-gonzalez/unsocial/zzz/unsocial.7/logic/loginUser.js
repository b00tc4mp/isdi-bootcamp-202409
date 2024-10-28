function loginUser(username, password) {
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    if (password.length < 8)
        throw new Error('Invalid password')

    var user = users.find(function (user) { //check if valid user
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('User not registered')

    return user
}