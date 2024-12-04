import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Migue Lita',
    email: 'migue@lita.com',
    password: '123123123',
    passwordRepeat: '123123123',
    telephone: '+34123123123',
  }),
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
