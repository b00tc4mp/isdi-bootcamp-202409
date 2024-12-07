import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads/675462a5f1f819890b8919d4/favorites', {
  method: 'PATCH',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU0NjI3YWYxZjgxOTg5MGI4OTE5Y2QiLCJyb2xlIjoiY2FyZWdpdmVyIiwiaWF0IjoxNzMzNTgzNDk2LCJleHAiOjE3MzM1OTA2OTZ9.3w-uv8El-4mfdxtpQzJc5EAck3sMaDubkiI-_8sFM54',
  },
})
  .catch((error) => {
    throw new SystemError(error.message)
  })
  .then((res) => {
    if (res.ok) return console.log('favorite toggled succesfully')
    return res
      .json()
      .catch((error) => {
        throw new SystemError(error.message)
      })
      .then(({ error, message }) => {
        throw new errors[error](message)
      })
  })
