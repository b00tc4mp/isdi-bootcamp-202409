const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:7070/register')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Debora Hombres","email":"debora@hombres.com","username":"debora","password":"123456","password-repeat":"123456"}')