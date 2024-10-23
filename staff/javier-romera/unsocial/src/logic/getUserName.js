const getUserName = () => {
    const users = JSON.parse(localStorage.users)

    const user = users.find(user => user.id === sessionStorage.loggedInUserId)

    if (!user) throw new Error('user not found')

    return user.name
}

export default getUserName