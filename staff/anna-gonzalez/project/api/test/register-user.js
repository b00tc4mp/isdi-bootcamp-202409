const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Duna","email":"du@na.com","password":"123123123","password-repeat":"123123123"}')

//201 ''