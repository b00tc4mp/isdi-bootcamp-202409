const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/wishlist')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUzMThhMGEzNjVkZmRmMWQ0ZTQ3NTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzM1NzE3NTIsImV4cCI6MTczMzU3NTM1Mn0.knD8_2LPMyMqK9XbMqMP4p3nIz_7miYzoRGgtypCZOI')
xhr.send()