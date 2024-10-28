const loginUser = (username, password) => {
    if (typeof username !== "string") throw new Error("Invalid Username");

    if (username.length < 4 || username.length > 14)
        throw new Error("invalid username")


    if (typeof password !== "string") throw new Error("Invalid Password");
    if (password.length < 8)
        throw new Error("invalid password")

    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error("Wrong Credentials")

    sessionStorage.userId = user.id
}

export default loginUser
