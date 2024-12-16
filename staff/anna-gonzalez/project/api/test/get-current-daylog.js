const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/cycles/daylog/2024-12-02')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQzNjAxNjQsImV4cCI6MTczNjk1MjE2NH0.Zdu_CCjdspGEDmI1ujQ6U7iQ3acbU1bQfJJbTEt1730')
xhr.send()

//200 '{"_id":"676052d5103a1ee327f35d27","user":"674c4f12f8e6789144c5d1a9","start":"2024-10-11T00:00:00.000Z","dayLogs":[{"date":"2024-12-02T00:00:00.000Z","symptoms":[],"_id":"676055a7103a1ee327f35d53"}],"end":"2024-12-14T23:00:00.000Z"}'