const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PRODUCT', 'http://localhost:8080/users/auth')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"ClauStark","password":"123123123"}')

// revisar los datos en mongoose