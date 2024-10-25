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
  if (typeof name !== 'string') throw new Error('invalid name')
  if (name.length < 2)
    throw new Error('invalid name')

  if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    throw new Error('invalid e-mail')

  if (username.length < 4 || username.length > 12)
    throw new Error('invalid username')

  if (password.length < 8)
    throw new Error('invalid password')

  if (typeof passwordRepeat !== 'string') throw new Error('invalid password repeat')
  if (password !== passwordRepeat)
    throw new Error('passwords do not match')

  const users = JSON.parse(localStorage.users)

  let user = users.find(user => user.username === username || user.email === email)

  if (user !== undefined)
    throw new Error('user already exists')

  user = { id: uuid(), name: name, email: email, username: username, password: password }

  users.push(user)

  localStorage.users = JSON.stringify(users)
}

