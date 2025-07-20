const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/products/6750854585bc811dd4b7eb57/comments/6750859c3c40c8eeca11ee97')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwODU0Mzg1YmM4MTFkZDRiN2ViMjciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzMzMzExNzIsImV4cCI6MTczMzMzNDc3Mn0.IMkIlqNY5knaFFjd_4LwkV543flRLJ2pu58HBvU-OjM')
xhr.send()
