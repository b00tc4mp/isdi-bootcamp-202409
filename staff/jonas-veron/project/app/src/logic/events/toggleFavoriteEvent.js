import { validate, errors } from "com"

const { SystemError } = errors

export default (eventId) => {
  validate.id(eventId, "eventId")

  return fetch(
    `http://${import.meta.env.VITE_API_URL}/events/${eventId}/favorites`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
  )
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
