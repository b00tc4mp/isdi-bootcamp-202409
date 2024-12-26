import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/users/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'migue@lita.com',
    password: '123123123',
  }),
})
  .catch((error) => {
    throw new SystemError(error.message)
  })
  .then((res) => {
    if (res.ok)
      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((token) => {
          console.log(token)
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
