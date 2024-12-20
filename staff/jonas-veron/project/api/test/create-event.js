import { errors } from "com"

const { SystemError } = errors

const event = {
  image:
    "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
  text: "¡A BAILAR!",
  date: new Date("2024-12-07"),
  location: { address: "Barcelona", coordinates: [41.3870154, 2.1700471] },
}
console.log(event)
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRkNzEyODFlNzE4Nzk5MTc1YTFiOWYiLCJyb2xlIjoiZGFuY2VyIiwiaWF0IjoxNzMzMTI4NTAzLCJleHAiOjE3MzMxMzIxMDN9.35SD8dFFfYLXtL1dLOLaPDbErXMC9SXeUWq2QdE7L6o"

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
