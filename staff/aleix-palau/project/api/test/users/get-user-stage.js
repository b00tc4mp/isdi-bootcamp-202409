const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/675ff207b4215bb9c29f4cb2/stage')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVmZjIwN2I0MjE1YmI5YzI5ZjRjYjIiLCJpYXQiOjE3MzQzNTEwMjksImV4cCI6MTczNDM1NDYyOX0.fJpAA7xrvWxHpPj50Qok0ldMe7_Nh2LT53gdpAUF_PE')
xhr.send()