const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/register')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Aragorn","email":"aragorn@middleearth.com","username":"aragorn","password":"111111","password-repeat":"111111"}')