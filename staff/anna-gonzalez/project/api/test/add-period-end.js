const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzMzMjYwMTcsImV4cCI6MTczMzMyOTYxN30.bk8VyWaaeV08O5ljfWWt4g4gGqzsnxYMuoU7Zm8XeZc')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"periodEnd":"2024-11-10T00:00:00.000"}')

//201 ''