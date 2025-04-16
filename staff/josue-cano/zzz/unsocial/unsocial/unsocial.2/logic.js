// recojo el valos de los inputs y los guardo en la variable newUser
function registerUser(name, email, username, password, passwordRepeat) {

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    if (name.length < 2)
        throw new Error('invalid name')

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('invalid e-mail')

    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined)
        throw new Error('user already exists')

    user = { name: name, email: email, username: username, password: password }


console.log(users)
users.push(user)
console.log(users)
}

function authenticateUser(username, password) {

    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    var user = users.find(function (user) {
        return user.username == username && user.password === password
    })

    if (user === undefined)
        throw new Error('wrong credentials')

    return user
}

