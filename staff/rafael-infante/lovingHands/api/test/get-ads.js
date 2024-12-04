import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads', {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwNGZhMWZhN2FjMDI3NmFiOGIwNWIiLCJyb2xlIjoiZWxkZXIiLCJpYXQiOjE3MzMzMTgxNzIsImV4cCI6MTczMzMyNTM3Mn0.x8ucyoTwGRA6GEdJbP8MOGk8kElc1leriXDjyVshAzw',
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
