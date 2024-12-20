import { validate, errors } from 'com'

const { SystemError } = errors

export default (adId, comment, calification) => {
  validate.id(adId, 'adId')
  validate.text(comment)

  return fetch(`http://${import.meta.env.VITE_API_URL}/ads/${adId}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment, calification }),
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok) return

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
