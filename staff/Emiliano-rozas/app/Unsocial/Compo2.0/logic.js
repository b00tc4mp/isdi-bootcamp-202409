// Business

function registerUser(name, email, username, password, passwordRepeat) {

    if (name.length < 2)
        throw new Error("invalid Name");

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error("invalid e-mail")

    if (username.length < 4)
        throw new Error("invalid Username")

    if (password.length < 8)
        throw new Error("invalid Password")

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    var user = users.find(function (user) {
        return user.username === username || user.email === email
    })

    if (user !== undefined)
        throw new Error("User already exist")

    user = { name: name, email: email, username: username, password: password }
    users.push(user)

}

function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 14)
        throw new Error("invalid username")

    if (password.length < 8)
        throw new Error("invalid password")

    var user = users.find(function (user) {
        return user.username === username && user.password === password

    })

    if (user === undefined)
        throw new Error("Wrong Credentials")

    return user
}

function createPost(username, image, text) {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')


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