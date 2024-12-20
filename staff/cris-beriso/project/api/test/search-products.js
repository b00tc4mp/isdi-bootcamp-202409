const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/products/search?category=Rostro')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU2ZTA2M2JhM2I2ZjA2MmNkYjgxYzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzM3NTQ4MjYsImV4cCI6MTczMzc1ODQyNn0.yF6VwHAdJX2HbWz3HCoQK3Dnyx8bbvcPDulSrnIK9uI')
xhr.send()