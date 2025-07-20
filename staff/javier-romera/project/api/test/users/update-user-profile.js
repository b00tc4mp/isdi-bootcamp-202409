const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users/profile')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzYwNDM0ZmRhOTA3ZWU0YzRjOWJlOTQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDM2MjYxOCwiZXhwIjoxNzM1NTcyMjE4fQ.pa7FrB0DF0x6WSkbx_U2_CamSW7Yx9_9xXijnhV4Juw')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"javi","email":"javi@gmail.com","oldPassword":"","newPassword":"","newPasswordRepeat":""}')