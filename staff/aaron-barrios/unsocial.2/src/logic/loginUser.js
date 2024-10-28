export default (username, password) => {
    if (typeof username !== 'string') throw new Error('invalid username')
    if (username.length < 4 || username.length > 12)
        throw new Error('Invalid username length')


    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.username === username && user.password === password)


    if (user === undefined)
        throw new Error('Wrong credentials')

    sessionStorage.userId = user.id
}

