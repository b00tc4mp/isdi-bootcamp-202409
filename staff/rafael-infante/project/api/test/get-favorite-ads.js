import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads/favorites', {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU3ZmI4M2IyMTAzNTVkZDA2MmY5YjEiLCJyb2xlIjoiY2FyZWdpdmVyIiwiaWF0IjoxNzMzOTE3NjIxLCJleHAiOjE3MzM5NjA4MjF9.nwUk9NLYpDhmftorbnzGMascqp-F5-MLmGye-IcoE2s',
  },
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
        .then((data) => {
          console.log('Succesfully fetched favorite ads:', data)
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
