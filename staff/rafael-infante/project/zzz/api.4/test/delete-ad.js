import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads/674dee32a54000b5c6934c1c', {
  method: 'DELETE',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRkZGM5YzYzYzIxMjU2MzdkODhkY2UiLCJyb2xlIjoiY2FyZWdpdmVyIiwiaWF0IjoxNzMzMjI1MzQ3LCJleHAiOjE3MzMyMzI1NDd9.JqoXql9sH29COEnHLqmN7gUbexbX37GIa4P8u42mIhA',
  },
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
