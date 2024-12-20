import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads/6751ff0ad1bbbf4d3aca2f74/reviews/67522d0fc9fbd0be7b6dd05d', {
  method: 'DELETE',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUyMTA2ZDBiZmM5MmQ3MDdkMWFiNTEiLCJyb2xlIjoiZWxkZXIiLCJpYXQiOjE3MzM0NzU3NDEsImV4cCI6MTczMzQ4Mjk0MX0.7fgLWSipQgoKcTAynJ9hNzCnU-wXIe3FHbzcRH74arU',
  },
})
  .catch((error) => {
    throw new SystemError(error.message)
  })
  .then((res) => {
    if (res.ok) return console.log('review deleted')

    return res
      .json()
      .catch((error) => {
        throw new SystemError(error.message)
      })
      .then(({ error, message }) => {
        throw new errors[error](message)
      })
  })
