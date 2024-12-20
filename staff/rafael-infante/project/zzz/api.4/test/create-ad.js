import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads', {
  method: 'POST',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRkZmExNGE1NDAwMGI1YzY5MzRjMjYiLCJyb2xlIjoiY2FyZWdpdmVyIiwiaWF0IjoxNzMzMTYzNjAyLCJleHAiOjE3MzMxNzA4MDJ9.OQbS49nlNawJxeQ_Irit1WSP6i2L-kxG12toye0uZAM',
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
