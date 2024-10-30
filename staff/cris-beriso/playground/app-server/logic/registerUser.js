import { uuid } from '../util/index.js'

import { users } from '../data/index.js'

export default (name, email, username, password, passwordRepeat) => {
  if (name.length < 2)
    throw new Error('invalid name')

  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new Error('invalid e-mail')

  if (username.length < 4 || username.length > 12)
    throw new Error('invalid username')

  if (password.length < 8)
    throw new Error('invalid password')

  if (password !== passwordRepeat)
    throw new Error('passwords do not match')

  let user = users.find(user => user.username === username || user.email === email)

  if (user !== undefined)
    throw new Error('user already exists')

  user = { id: uuid(), name: name, email: email, username: username, password: password }

  users.push(user)
}