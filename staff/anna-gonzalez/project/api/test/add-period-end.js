const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles/674ded4fe0024360e26a5cb6')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzMxNjA3NzAsImV4cCI6MTczMzE2NDM3MH0.QMzOl9yl2v3-bkSnfdk9nk9lgkrD9OVz_wvJHU7zP7c')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send('{"periodEnd":"2023-11-01"}')

//201 ''