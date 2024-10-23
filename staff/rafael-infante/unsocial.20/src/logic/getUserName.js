const getUserName = (userId) => {
  if (typeof userId !== 'string') throw new Error

  const users = JSON.parse(localStorage.users)

  const user = users.find(user => user.userId === userId)

  return user.name
}

export default getUserName