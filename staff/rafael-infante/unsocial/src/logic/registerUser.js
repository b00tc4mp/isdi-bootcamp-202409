import uuid from "../data/uuid"
import { validate } from "./helpers/"

export default (name, email, username, password, confirmPassword) => {
  validate.name(name)
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, confirmPassword)


  const users = JSON.parse(localStorage.users)

  const registeredUser = users.find(user => user.email === email || user.username === username)

  if (registeredUser)
    throw new Error('This user is already registered')

  const user = { userId: uuid(), name: name, email: email, username: username, password: password }

  users.push(user)

  localStorage.users = JSON.stringify(users)
}