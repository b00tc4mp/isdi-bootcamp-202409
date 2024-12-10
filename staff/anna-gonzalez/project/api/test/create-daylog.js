const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles/daylog/2024-12-09T00:00:00.000Z')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzM3MzIxODEsImV4cCI6MTczNjMyNDE4MX0.Y7cSxOkyCqdeP6c6bQ624HgYFXEdwkTNW_fVRk0QMSo')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"date":"2024-12-09T00:00:00.000Z","formData": {"symptoms": "backache", "mood": "happy"}}')

//201 ''