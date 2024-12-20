import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/users/changePassword', {
  method: 'POST',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzYwN2JiYzMzMDBhMGRmMzRiY2UyYjciLCJyb2xlIjoiY2FyZWdpdmVyIiwiaWF0IjoxNzM0Mzc4ODIwLCJleHAiOjE3MzQ0MjIwMjB9.hTW8HHpNO5XHPsbc0n1pgfAnqIrYSfo6APWYGFQyvRQ',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    oldPassword: '111222333',
    newPassword: '444555666',
    newPasswordRepeat: '444555666',
  }),
})
  .catch((error) => {
    throw new SystemError(error.message)
  })
  .then((res) => {
    if (res.ok) return console.debug('password changed')

    return res
      .json()
      .catch((error) => {
        throw new SystemError(error.message)
      })
      .then(({ error, message }) => {
        throw new errors[error](message)
      })
  })
