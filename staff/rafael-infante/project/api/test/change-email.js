import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/users/changeEmail', {
  method: 'POST',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzYwN2JiYzMzMDBhMGRmMzRiY2UyYjciLCJyb2xlIjoiY2FyZWdpdmVyIiwiaWF0IjoxNzM0Mzc5Mjk5LCJleHAiOjE3MzQ0MjI0OTl9.QqhzaT7kUX3fGxJQuttEkPQ3PAMBeXDpPgqVArWD508',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    oldEmail: 'teresa@madre.com',
    newEmail: 'abuela@teresa.com',
    newEmailRepeat: 'abuela@teresa.com',
  }),
})
  .catch((error) => {
    throw new SystemError(error.message)
  })
  .then((res) => {
    if (res.ok) return console.debug('email changed')

    return res
      .json()
      .catch((error) => {
        throw new SystemError(error.message)
      })
      .then(({ error, message }) => {
        throw new errors[error](message)
      })
  })
