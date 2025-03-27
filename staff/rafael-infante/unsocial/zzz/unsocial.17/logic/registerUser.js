const registerUser = (name, email, username, password, confirmPassword) => {
  if (name.length < 2)
    throw new Error('Invalid name')

  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new Error('Invalid email')

  if (username.length < 4 || username.length > 12)
    throw new Error('invalid user name')

  if (password.length < 8)
    throw new Error('invalid password')

  if (password !== confirmPassword)
    throw new Error('passwords do not match')

  const users = JSON.parse(localStorage.users)

  const registeredUser = users.find(user => user.email === email || user.username === username)

  if (registeredUser)
    throw new Error('This user is already registered')

  const user = { userId: uuid(), name: name, email: email, username: username, password: password }

  users.push(user)

  localStorage.users = JSON.stringify(users)
}