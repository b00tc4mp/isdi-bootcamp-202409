const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/matches/6848205e3781ebf4fcf2fd30')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODQyOWYyZmYwMWZmMDJhYWI3MGYwZDQiLCJpYXQiOjE3NDk1NTcwOTcsImV4cCI6MTc0OTYwMDI5N30.5zCgyDFlj8YHKXzn4rPY_5F7vffRQHuD_Opf6THD73k')
xhr.send()