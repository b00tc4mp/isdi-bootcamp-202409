const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Javi3","email":"javi3@gmail.com","username":"javi3","password":"123123123","password-repeat":"123123123"}')

// 201 ''