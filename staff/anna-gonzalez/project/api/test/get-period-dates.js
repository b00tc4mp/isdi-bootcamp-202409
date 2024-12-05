const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles/periodDays')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzM0MTU1NjQsImV4cCI6MTczMzQxOTE2NH0.j72qOdp-734JaOJlxz9BbTlcjRtlnLscz1LaXGp8yxw')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"currentDate":"2024-10-11T00:00:00.000Z"}')