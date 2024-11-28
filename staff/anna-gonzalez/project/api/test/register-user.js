const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/register')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Clara","email":"cla@ra.com","password":"123123123","password-repeat":"123123123"}')

//201 ''