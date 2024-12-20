import { validate, errors } from 'com'

const { SystemError } = errors

export default (adId) => {
  validate.id(adId, 'adId')

  return fetch(`http://${import.meta.env.VITE_API_URL}/ads/${adId}/favorites`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok) return console.log('favorite toggled succesfully')
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
