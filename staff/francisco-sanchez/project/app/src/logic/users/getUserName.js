import { errors } from 'com'
import { extractPayloadJWt } from '../../util'

const { SystemError } = errors

export default () => {
    console.log('llego a la función getUserName')
    const { sub: userId } = extractPayloadJWt(localStorage.token)
    console.log(`El userId que paso a la url es:  ${userId}`)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/name`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(error => {
            console.log('paso por el error')
            throw new SystemError(error.message)
        })

        .then(res => {
            console.log('Respuesta del servidor:', res) // Depuración
            if (res.ok)
                return res.json()
                    .then(data => {
                        console.log('Datos obtenidos del servidor:', data) // Depuración
                        return data
                    })
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}