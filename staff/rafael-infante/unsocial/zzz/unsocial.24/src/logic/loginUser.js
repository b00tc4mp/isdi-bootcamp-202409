const loginUser = (loginUsername, loginPassword) => {
  if (typeof loginUsername !== 'string') throw new Error
  if (typeof loginPassword !== 'string') throw new Error

  if (loginUsername.length < 4 || loginUsername.length > 12)
    throw new Error('invalid username')

  if (loginPassword < 8)
    throw new Error('invalid password')

  const users = JSON.parse(localStorage.users)

  const user = users.find(user => user.username === loginUsername && user.password === loginPassword)

  if (user === undefined)
    throw new Error('wrong credentials')

  sessionStorage.loggedUserId = user.userId
}

export default loginUser