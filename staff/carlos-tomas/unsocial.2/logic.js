function registerUser(nameInput, emailInput, usernameInput, passwordInput, passwordRepeat) {

    if (nameInput.length < 2)
        throw new Error("name too short")

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailInput))
        throw new Error("invaled e-mail")

    if (usernameInput.length < 4 || usernameInput.length > 12)
        throw new Error("invalid username")

    if (passwordInput.length < 8)
        throw new Error("invalid password")

    if (passwordInput !== passwordRepeat)
        throw new Error("passwords do not match")

    var user = users.find(function (user) {
        return (user.username === usernameInput) || (user.email === emailInput)
    })

    if (user !== undefined) {
        alert("user already exists")

        return
    }
    var user = {
        name: nameInput,
        email: emailInput,
        username: usernameInput,
        password: passwordInput
    }

    users.push(user)
}

function authenticateUser(username, password) {
    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')
    var user = users.find(function (element) {
        return (element.username === username) && (element.password === password)
    })

    if (user === undefined)
        throw new Error('wrong credentials')

    return user

}