const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/heartbeats')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UxNTYwMTRhZDE3YjAxMTMxZjM5Y2YiLCJpYXQiOjE3NDI4OTg1MDUsImV4cCI6MTc0MjkxMjkwNX0.5mr4FF0oIZrbUPA354QOnhizSarUeCsUjfn9zmhPgI0')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"receiverId":"67dfeb46769007a2ce497003","action":"left"}')