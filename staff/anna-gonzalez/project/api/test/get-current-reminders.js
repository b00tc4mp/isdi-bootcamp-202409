const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/reminders/day/2024-12-16')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQzNjAxNjQsImV4cCI6MTczNjk1MjE2NH0.Zdu_CCjdspGEDmI1ujQ6U7iQ3acbU1bQfJJbTEt1730')
xhr.send()

//200 '[{"_id":"67605856103a1ee327f35d69","user":"674c4f12f8e6789144c5d1a9","date":"2024-12-16T00:00:00.000Z","title":"test doctor appointment"},{"_id":"6760587c103a1ee327f35d6c","user":"674c4f12f8e6789144c5d1a9","date":"2024-12-16T00:00:00.000Z","title":"test doctor appointment"}]'