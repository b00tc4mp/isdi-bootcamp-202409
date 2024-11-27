import { errors } from 'com'//Importa un objeto que contiene clases de errores personalizados, como SystemError, para gestionar errores específicos.
import { extractPayloadFromJWT } from '../util' //Una función que probablemente decodifica un token JWT para extraer información útil (como el userId) de su "payload".


const { SystemError } = errors

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
