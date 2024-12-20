import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads/6751ff0ad1bbbf4d3aca2f74/reviews', {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUyMTA2ZDBiZmM5MmQ3MDdkMWFiNTEiLCJyb2xlIjoiZWxkZXIiLCJpYXQiOjE3MzM0NzU3NDEsImV4cCI6MTczMzQ4Mjk0MX0.7fgLWSipQgoKcTAynJ9hNzCnU-wXIe3FHbzcRH74arU',
  },
})
  .then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      if (errorData && errorData.error && errorData.message) {
        throw new errors[errorData.error](errorData.message)
      }
      throw new SystemError(`HTTP Error: ${res.status}`)
    }
    return res.json()
  })
  .then((data) => {
    console.log('Ads:', data)
  })
  .catch((error) => {
    console.error('Fetch failed:', error.message)
  })
