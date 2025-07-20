const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/users/675a08ffec407c3e85aff04c/score')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVhMDhmZmVjNDA3YzNlODVhZmYwNGMiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczNDAyODUxMSwiZXhwIjoxNzM1MjM4MTExfQ.77AknX9EPvTXyS-7LhgvOUsrSKCMTZMj-_cWst043zs')
xhr.send()

// 200 '100'