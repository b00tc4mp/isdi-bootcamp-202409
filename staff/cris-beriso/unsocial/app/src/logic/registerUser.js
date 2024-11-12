import { validate, errors } from 'com'

const { SystemError } = errors

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
export default (name, email, username, password, passwordRepeat, callback) => {
  validate.name(name)
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)
  validate.callback(callback)

  const xhr = new XMLHttpRequest

  xhr.addEventListener('load', () => {
    const { status, response } = xhr

    if (status === 201) {
      callback(null)

      return
    }

    const { error, message } = JSON.parse(response)

    const constructor = errors[error]

    callback(new Error(message))
  })

  xhr.addEventListener('error', () => callback(new SystemError('server error')))

  xhr.open('POST', 'http://localhost:8080/users')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({ name, email, username, password, 'password-repeat': passwordRepeat }))
}

