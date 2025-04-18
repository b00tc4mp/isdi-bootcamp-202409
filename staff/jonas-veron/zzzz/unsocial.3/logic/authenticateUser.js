const authenticateUser = (username, password) => {
    // create conditions for login
    if ( typeof username !== 'string') throw new Error('invalid username')
    if(username.length < 4 || username.length > 12 )
        throw new Error('Invalid username')
    

    if ( typeof password !== 'string') throw new Error('invalid password')
    if(password.length < 8)
        throw new Error('Invalid password')

    const users = JSON.parse(localStorage.users)
    
    const user = users.find(user =>
        user.username === username && user.password === password)
    
    if(user === undefined)
        throw new Error('Wrong credentials')

    return user.id
}
    