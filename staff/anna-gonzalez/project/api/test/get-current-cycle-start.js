const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/cycles/lastCycle')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzM1MTY5NjQsImV4cCI6MTczNjEwODk2NH0.PWXf7m0iaJJgntVVCAEsMnlx83Nk4IDVHWhjn0vsOAY')
xhr.send()

// 200 '{"_id":"67519684ab5194d8df988a72","user":"674c4f12f8e6789144c5d1a9","start":"2024-12-03T23:00:00.000Z","dayLogs":[],"periodEnd":"2024-12-03T23:00:00.000Z"}''