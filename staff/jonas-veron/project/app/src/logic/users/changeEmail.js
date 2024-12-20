import { validate, errors } from "com"

const { SystemError } = errors

export default (oldEmail, newEmail, newEmailRepeat) => {
  validate.email(newEmail)
  validate.emailsMatch(newEmail, newEmailRepeat)

  return fetch(`http://${import.meta.env.VITE_API_URL}/users/changeEmail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldEmail, newEmail, newEmailRepeat }),
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
