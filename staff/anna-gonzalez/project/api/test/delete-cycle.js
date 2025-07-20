const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/cycles/2024-12-16')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQzNjAxNjQsImV4cCI6MTczNjk1MjE2NH0.Zdu_CCjdspGEDmI1ujQ6U7iQ3acbU1bQfJJbTEt1730')
xhr.send()

//204 ''