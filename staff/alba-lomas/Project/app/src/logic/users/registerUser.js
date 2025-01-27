


import { validate, errors } from 'com'

const { SystemError } = errors

export default (role, name, email, license, password, passwordRepeat) => {
  validate.role(role)
  validate.name(name)
  validate.email(email)
  validate.license(license)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return fetch(`http://${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, name, email, license, password, 'password-repeat': passwordRepeat })
  })

    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
      if (res.ok)
        return

      return res.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(({ error, message }) => { throw new errors[error](message) })
    })
}