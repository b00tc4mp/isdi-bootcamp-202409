import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads/6751ff0ad1bbbf4d3aca2f74/reviews', {
  method: 'POST',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUyMTA2ZDBiZmM5MmQ3MDdkMWFiNTEiLCJyb2xlIjoiZWxkZXIiLCJpYXQiOjE3MzM0MzcwNjksImV4cCI6MTczMzQ0NDI2OX0.KSJAtYpCKZ8BgpUh69OH-tV7XvesHmbsVeCMKRYzXUI',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    comment: 'excelente servicio 4',
    calification: 4,
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
