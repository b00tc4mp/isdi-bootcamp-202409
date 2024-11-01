const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('Post', 'http://localhost:8080/register')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"debora","email":"debora@melano.com","username":"deboramelano","password":"123123123","password-repeat":"123123123"}')
