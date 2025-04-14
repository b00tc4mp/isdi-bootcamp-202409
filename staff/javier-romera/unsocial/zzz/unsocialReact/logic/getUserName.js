const getUserName = userId => {
    if (typeof userId !== 'string') {
        throw new Error('invalid user id')
    }

    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === userId)

    if (!user) {
        throw new Error('user not found')
    }

    return user.name
}