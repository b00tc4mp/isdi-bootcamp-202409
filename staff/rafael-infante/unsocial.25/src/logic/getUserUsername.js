const getUserUsername = () => {

  const users = JSON.parse(localStorage.users)

  const user = users.find(user => user.userId === sessionStorage.loggedUserId)

  if (!user) throw new Error('user not found')

  return user.username
}

export default getUserUsername