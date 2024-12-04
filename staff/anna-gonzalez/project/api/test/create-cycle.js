const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/cycles')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzMzMTMwODIsImV4cCI6MTczMzMxNjY4Mn0.fwxxp-wDbsAyqYNIlZWZ_4pcI_lYV-FSGP3n8E8U7Lg')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"start":"2024-10-11T00:00:00.000"}')

//201 ''