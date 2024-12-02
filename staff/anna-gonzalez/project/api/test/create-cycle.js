const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzMxNjAyMzksImV4cCI6MTczMzE2MzgzOX0.kyo7SIIt3csont75A8zoh6Ict-RvbM6iUfsrUlhvXyA')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"date":"2024-11-02"}')

//201 ''