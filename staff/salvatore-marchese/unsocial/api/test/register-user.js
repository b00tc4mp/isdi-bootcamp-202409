const xhr = new XHLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost8080/register')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Mario","email":"mario@gmail.com","username":"SuperMario","password":"12341234","password-repeat":"12341234"}')