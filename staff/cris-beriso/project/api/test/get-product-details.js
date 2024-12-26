const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/products/67545b9183cabedba990578e')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU0NWI5MTgzY2FiZWRiYTk5MDU3ODYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzM2NjQzNTIsImV4cCI6MTczMzY2Nzk1Mn0.nNIkPW9PQTbfI-VMMfB7E4oYXD8XpENLLvT8lDNL3MA')
xhr.send()