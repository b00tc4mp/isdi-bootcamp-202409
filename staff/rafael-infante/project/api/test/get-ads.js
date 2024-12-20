import { errors } from 'com'

const { SystemError } = errors

fetch('http://localhost:8080/ads', {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwNjhmMWI5MjczYWI1YzdlZjA5NjYiLCJyb2xlIjoiZWxkZXIiLCJpYXQiOjE3MzMzMzE1MDEsImV4cCI6MTczMzMzODcwMX0.MPt9ouf5DcrwCGzukQ84af1RMqWonVtoZ3mTDNp0VS0',
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
