const registerUser = (name, email, username, password, passwordRepeat) => {
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

    const users = JSON.parse(localStorage.users) //bring object from localStorage

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined)
        throw new Error('User already exists')

    user = { id: uuid(), name: name, email: email, username: username, password: password }

    users.push(user)

    localStorage.users = JSON.stringify(users) //return the users a string
}