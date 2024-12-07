const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/cycles/start')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzM1MTY5NjQsImV4cCI6MTczNjEwODk2NH0.PWXf7m0iaJJgntVVCAEsMnlx83Nk4IDVHWhjn0vsOAY')
xhr.send()

//