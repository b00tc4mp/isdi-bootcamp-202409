const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/users/score')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVhMDhmZmVjNDA3YzNlODVhZmYwNGMiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDAyODUxMSwiZXhwIjoxNzM1MjM4MTExfQ.77AknX9EPvTXyS-7LhgvOUsrSKCMTZMj-_cWst043zs')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"score":100}')