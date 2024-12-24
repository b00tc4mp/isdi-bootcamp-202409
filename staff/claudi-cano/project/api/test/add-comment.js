const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PRODUCT', 'http://localhost:8080/products/m2vw4ucygv/comments')
xhr.setRequestHeader('Authorization', 'Basic m2vvw4xzn6d')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send('{"text":"yeaaaah!"}')

// revisar los datos en mongoose