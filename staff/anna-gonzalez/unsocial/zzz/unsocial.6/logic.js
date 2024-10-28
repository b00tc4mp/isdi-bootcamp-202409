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

function registerUser(name, email, username, password, passwordRepeat) {
    if (name.length < 2)
        throw new Error('Invalid name')

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error('Invalid e-mail')

    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    if (password.length < 8)
        throw new Error('Invalid password')

    if (password !== passwordRepeat)
        throw new Error('Passwords do not match')

    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined)
        throw new Error('User already exists')

    user = { name: name, email: email, username: username, password: password }

    users.push(user)
}

function createPost(username, image, text) {
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username')

    if (image === undefined)
        throw new Error('Inser a link to an image')

    if (text === undefined)
        throw new Error('Insert a text, even if it is an empty space')

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