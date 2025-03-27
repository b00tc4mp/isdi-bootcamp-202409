import { validate, errors } from 'com'
import { extractPayloadFromJWT } from '../utils'

const { SystemError } = errors

export default () => {
  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}/name`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok)
        return res.json().catch((error) => {
          throw new SystemError(error.message)
        })

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then(({ error, message }) => {
          throw new errors[error](message)
        })
    })
}
