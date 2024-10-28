function registerUser(name, email, username, password, confirmPassword) {
  if (name.length < 2)
    throw new Error('Invalid name')

  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new Error('Invalid email')

  var registeredUser = users.find(function (user) {
    return user.email === email || user.username === username
  })
  if (registeredUser)
    throw new Error('This user is already registered')

  if (username.length < 4 || username.length > 12)
    throw new Error('invalid user name')

  if (password.length < 8)
    throw new Error('invalid password')

  if (password !== confirmPassword)
    throw new Error('passwords do not match')
  var user = { name: name, email: email, username: username, password: password }

  users.push(user)
}

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

function createpost(username, image, text) {
  if (username.length < 4 || username.length > 12)
    throw new Error('invalid username')
  // TODO input validation

  var post = {
    image: image,
    text: text,
    username: username,
    date: new Date
  }

  posts.push(post)
}

function getPosts() {
  return posts
}