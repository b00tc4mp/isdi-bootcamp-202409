const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/products')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRmMzkzODJkMGQ3NGFiNjFhMWVjMTMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzMyNTAwMjEsImV4cCI6MTczMzI1MzYyMX0.9heyeERcWCACKftg5tNeJPqBIPguplpxuYxLOa6L7mc')
xhr.send()