
function registerUser(name, email, username, password, repeatpassword) {
    if (name.length < 2)
        throw new Error('invalid name')

    //RegEx (condiciones que evaluan el cumplimiento de distintos caracteres en el email)
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 3)
        throw new Error('invalid password')

    if (password !== repeatpassword)
        throw new Error('passwords do not match')

    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined)
        throw new Error('user already exists')

    user = { name: name, email: email, username: username, password: password, repeatpassword: repeatpassword }
    users.push(user)
}

function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    var user = users.find(function (user) {
        return user.username === username && user.password === password
    })

    if (user === undefined)
        throw new Error('User not found')
    return user
}