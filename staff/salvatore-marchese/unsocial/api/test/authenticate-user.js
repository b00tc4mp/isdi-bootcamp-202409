const xhr = new XMLHttpRequest 

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/authenticate')
xhr.setRequestedHeader('Content-Type', 'application/jsno')
xhr.send('{"username":"SuperMario","password":"12341234"}')