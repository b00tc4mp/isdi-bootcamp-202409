import { validate, errors } from 'com'

const { SystemError } = errors
/**
 * A traves de un id de tipo string obtenemos el nombre del usuario. 
 * Previamente hemos almacenado los datos de los usuarios en forma de string en localStorage.
 * Transformamos la string en objeto a traves de JSON.parse.
 * A traves del metodo find encontramos el nombre al que corresponde dicho id. 
 * 
 * @param {string} userId id del usuario del que queremos obtener el nombre
 * @returns el nombre del usuario obtenido a partir del id
 */
export default callback => {
  validate.callback(callback)

  const xhr = new XMLHttpRequest

  xhr.addEventListener('load', () => {
    const { status, response } = xhr

    if (status === 200) {
      const name = JSON.parse(response)

      callback(null, name)

      return
    }

    const { error, message } = JSON.parse(response)

    const constructor = error[error]

    callback(new Error(message))
  })

  xhr.addEventListener('error', () => callback(new SystemError('server error')))

  xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}/name`)
  xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
  xhr.send()
}
