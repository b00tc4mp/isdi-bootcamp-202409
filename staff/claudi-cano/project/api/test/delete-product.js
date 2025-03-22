const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/products/m32soiolmk8')
xhr.setRequestHeader('Authorization', 'Basic m2vvw4xzn6d')
xhr.send()

// revisar los datos en mongoose