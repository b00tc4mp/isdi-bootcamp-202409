import { errors } from "com"

const { SystemError } = errors

const event = {
  image:
    "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
  text: "¡A BAILAR!",
  date: "2024-12-04T00:00:00Z",
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNGZlNTgwZDc5NmJlODY3NGIzN2UiLCJyb2xlIjoib3JnYW5pemVyIiwiaWF0IjoxNzMyOTkwMTI1LCJleHAiOjE3MzI5OTM3MjV9.ZI-dS3AbJ0PirD6giik_x5WB9GQ7IRzf35Jh6BzE_Ms"

fetch("http://localhost:3000/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(event),
}).then((response) => {
  if (response.ok) {
    console.log("OK")
    return response.json()
  }
  return response
    .json()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(({ error, message }) => {
      throw new errors[error](message)
    })
})
