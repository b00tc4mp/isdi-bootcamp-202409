import { errors } from "com"

const { SystemError } = errors

fetch("http://localhost:3000/users/6748c0ad23658da0023c3dad/name", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ4YzBhZDIzNjU4ZGEwMDIzYzNkYWQiLCJyb2xlIjoiZGFuY2VyIiwiaWF0IjoxNzMyODIxMTk0LCJleHAiOjE3MzI4NDI3OTR9.Lc7gheHT0SkhcuGYhJ8Q7U9KpDXttNwu0UN2PToCBcE",
  },
})
  .catch((error) => {
    console.log(error)
    throw new SystemError(error.message)
  })
  .then((res) => {
    if (res.ok) console.log("SUCCESS TEST", res.status)
    else console.log("fail test", res.status)
  })
