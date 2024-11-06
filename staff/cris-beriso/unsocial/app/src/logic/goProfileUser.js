import getUserId from './getUserId';
import { validate } from 'com';

export default (name, username, password) => {
  validate.name(name)
  validate.username(username)
  validate.password(password)

  const users = JSON.parse(localStorage.users)

  const userId = getUserId()

  let user = users.find(({ id }) => id === userId)

  name === undefined ? user.name = user.name : user.name = name
  username === undefined ? user.username = user.username : user.username = username
  password === undefined ? user.password = user.password : user.password = password

  localStorage.users = JSON.stringify(users)
}