const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles/daylog/2024-12-09')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQzNjAxNjQsImV4cCI6MTczNjk1MjE2NH0.Zdu_CCjdspGEDmI1ujQ6U7iQ3acbU1bQfJJbTEt1730')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"formattedDate":"2024-12-09","formData": {"symptoms": "backache", "mood": "happy"}}')

//201 ''