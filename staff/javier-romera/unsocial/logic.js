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

function registerUser(name, email, username, password, confirmpassword) {
    if (name.length < 2) {
        throw new Error('invalid name')
    }
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        throw new Error('invalid e-mail')
    }
    if (username.length < 4 || username.length > 12) {
        throw new Error('invalid username')
    }
    if (password.length < 8) {
        throw new Error('invalid password')
    }
    if (password !== confirmpassword) { // Comprobar que confirm password tiene el mismo valor que password
        throw new Error('Incorrect password')
    }

    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined) {
        throw new Error('user already exists')
    }

    user = { 'name': name, 'email': email, 'username': username, 'password': password } // Insertamos el usuario entero

    users.push(user)
}

function createPost(username, image, text) {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    // TODO input validation (and throw error)

    var post = {
        image: image,
        text: text,
        username: username,
        date: new Date
    }

    posts.push(post)
}

function getPosts() {
    return posts
}