import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads', {
  method: 'POST',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwNjhmMWI5MjczYWI1YzdlZjA5NjYiLCJyb2xlIjoiZWxkZXIiLCJpYXQiOjE3MzMzMzA1MTYsImV4cCI6MTczMzMzNzcxNn0.x00iT3GUXV23ggSBYpg8k6J07ULBpCnYl8A_1otCasE',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image: 'https://imagenes.cope.es/files/content_image/uploads/2024/07/11/669038a685834.jpeg',
    text: 'soy ayudante en el hogar',
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
