const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/players')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Luis Eduardo","email":"luis@eduardo.com","username":"luiseduardo","password":"123123123","password-repeat":"123123123"}')