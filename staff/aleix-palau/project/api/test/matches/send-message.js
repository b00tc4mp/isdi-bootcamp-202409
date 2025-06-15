const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/matches/684818813781ebf4fcf1dd4a/messages')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODQyOWYyZmYwMWZmMDJhYWI3MGYwZDQiLCJpYXQiOjE3NDk1NTQ5ODYsImV4cCI6MTc0OTU5ODE4Nn0.cquHAcZm36qJU00t4D6mrQCa_-StNEpZM86rkKp-YU0')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text":"Holi!"}')