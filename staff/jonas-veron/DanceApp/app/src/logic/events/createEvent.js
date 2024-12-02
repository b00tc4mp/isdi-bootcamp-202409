import { validate, errors } from "com"

const { SystemError } = errors

export default (image, text, date, location) => {
  validate.image(image)
  validate.text(text)
  validate.date(date)
  console.log(location)
  validate.location(location)

  return fetch(`http://${import.meta.env.VITE_API_URL}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, text, date, location }),
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
