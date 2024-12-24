const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2vw4ucygv/likes')
xhr.setRequestHeader('Authorization', 'Basic m2vvw4xzn6d')
xhr.send()

// revisar los datos en mongoose