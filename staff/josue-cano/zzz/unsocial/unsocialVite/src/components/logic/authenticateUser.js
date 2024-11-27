const authenticateUser = (username, password) => {

    if (username.length < 4 || username.length > 12)
        throw new Error('invalid username')

    if (password.length < 8)
        throw new Error('invalid password')

    const persistedUsers = JSON.parse(localStorage.getItem("users"))

    const user = persistedUsers.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('wrong credentials')

    return user.id
}

export default authenticateUser