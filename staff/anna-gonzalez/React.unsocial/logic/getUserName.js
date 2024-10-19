const getUserName = userId => {
    if (typeof userId !== 'string') { throw new Error('Invalid userId') } //input validation

    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === userId)
    //find is used to find a user in users with a callback

    if (!user) {
        throw new Error('User not found')
    } //if it doesn't find the user...

    return user.name
}