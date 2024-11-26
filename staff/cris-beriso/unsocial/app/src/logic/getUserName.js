import { errors } from 'com'
import { extractPayloadFromJWT } from '../util'

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
export default () => {
  const { sub: userId } = extractPayloadFromJWT(localStorage.token)

  return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}/name`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
      if (res.ok)
        return res.json()
          .catch(error => { throw new SystemError(error.message) })

      return res.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(({ error, message }) => { throw new errors[error](message) })
    })
}