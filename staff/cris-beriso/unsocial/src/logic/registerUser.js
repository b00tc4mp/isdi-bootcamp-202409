import { validate } from './helpers'

import uuid from '../data/uuid'
/**
 * Recogemos los datos del nuevo usuario y 
 * los guardamos en USER (despues de unas comprobaciones).
 * Antes de guardar los datos de user en users, tenemos que convertir users en objeto,
 * para ello usamos JSON.parse. Corroboramos que no hay coincidencias y almacenamos la info.
 * Pusheamos user a users
 * @param {string} name 
 * @param {string tipo email} email 
 * @param {string} username 
 * @param {string} password 
 * @param {string} passwordRepeat 
 */
export default (name, email, username, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  const users = JSON.parse(localStorage.users)

  let user = users.find(user => user.username === username || user.email === email)

  if (user !== undefined)
    throw new Error('user already exists')

  user = { id: uuid(), name: name, email: email, username: username, password: password }

  users.push(user)

  localStorage.users = JSON.stringify(users)
}

