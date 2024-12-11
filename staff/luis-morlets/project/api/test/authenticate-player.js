const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/players/auth')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"luiseduardo","password":"123123123"}')