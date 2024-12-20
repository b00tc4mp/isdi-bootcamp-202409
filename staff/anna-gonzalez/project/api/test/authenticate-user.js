const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users/auth')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"email":"an@na.com","password":"123123123"}')

//200 '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNGYxMmY4ZTY3ODkxNDRjNWQxYTkiLCJpYXQiOjE3MzQzNjgxNzksImV4cCI6MTczNjk2MDE3OX0.36aTbcLwFEdox-ASSySVazNWNni-jdNgiqjeM9fVDmw"'