import { validate, errors } from 'com'

const { SystemError } = errors

export default (adId) => {
  validate.id(adId, 'adId')

  return fetch(`http://${import.meta.env.VITE_API_URL}/ads/${adId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok) return alert('Ad deleted')

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