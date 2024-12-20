import { errors } from "com"

const { SystemError } = errors

fetch("http://localhost:3000/users/6748c0ad23658da0023c3dad/name", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ4YzBhZDIzNjU4ZGEwMDIzYzNkYWQiLCJyb2xlIjoiZGFuY2VyIiwiaWF0IjoxNzMyOTA3MzQ4LCJleHAiOjE3MzI5Mjg5NDh9.-S6eFCsXJ2qu3m2taHHs1DQc5u7Tepep6bzK3L45gRI",
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
