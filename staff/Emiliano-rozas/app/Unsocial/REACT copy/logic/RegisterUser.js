//Business

const registerUser = (name, email, username, password, passwordRepeat) => {
    if (typeof name !== "string") throw new Error("Invalid Name");
    if (name.length < 2)
        throw new Error("invalid name length");

    if (typeof email !== "string") throw new Error("Invalid Email");
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new Error("invalid e-mail")

    if (typeof username !== "string") throw new Error("Invalid Username")
    if (username.length < 4)
        throw new Error("invalid Username")

    if (typeof password !== "string") throw new Error("Invalid Password");
    if (password.length < 8)
        throw new Error("invalid Password")

    if (typeof passwordRepeat !== "string") throw new Error("Invalid Password");
    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    const users = JSON.parse(localStorage.users)

    let user = users.find(user => user.username === username || user.email === email)

    if (user !== undefined)
        throw new Error("User already exist")

    user = { id: uuid(), name: name, email: email, username: username, password: password }

    users.push(user)

    localStorage.users = JSON.stringify(users)

}