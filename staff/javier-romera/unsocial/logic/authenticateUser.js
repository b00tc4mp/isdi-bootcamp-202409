function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 12) {
        throw new Error('invalid username')
    }
    if (password.length < 8) {
        throw new Error('invalid password')
    }
    var user = users.find(function (user) { // Miramos si el usuario es válido
        return user.username === username && user.password === password
    })

    if (user === undefined) {
        throw new Error('cagaste')
    }

    return user
}