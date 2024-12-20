import { errors } from "com"

const { SystemError } = errors

fetch("http://localhost:3000/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "juansito",
    email: "juans@roca.com",
    password: "123123123",
    passwordRepeat: "123123123",
  }),
})
  .catch((error) => {
    throw new SystemError(error.message)
  })
  .then((response) => {
    console.log(response)
    if (response.ok) return

    return response
      .json()
      .catch((error) => {
        throw new SystemError(error.message)
      })
      .then(({ error, message }) => {
        throw new errors[error](message)
      })
  })
