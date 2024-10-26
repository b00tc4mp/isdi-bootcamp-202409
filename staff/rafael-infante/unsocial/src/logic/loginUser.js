import { validate } from './helpers'

export default (loginUsername, loginPassword) => {
  validate.username(loginUsername)
  validate.password(loginPassword)

  const users = JSON.parse(localStorage.users)

  const user = users.find(user => user.username === loginUsername && user.password === loginPassword)

  if (user === undefined)
    throw new Error('wrong credentials')

  sessionStorage.loggedUserId = user.userId
}