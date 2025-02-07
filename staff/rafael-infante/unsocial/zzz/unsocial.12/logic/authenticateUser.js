function authenticateUser(loginUsername, loginPassword) {
  if (loginUsername.length < 4 || loginUsername.length > 12)
    throw new Error('invalid username')

  if (loginPassword < 8)
    throw new Error('invalid password')

  var user = users.find(function (user) {
    return user.username === loginUsername && user.password === loginPassword
  })

  if (user === undefined)
    throw new Error('wrong credentials')

  return user
}