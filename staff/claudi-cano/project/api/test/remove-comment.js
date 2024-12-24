const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2vw4ucygv/comments/m32wgx8rwzs')
xhr.setRequestHeader('Authorization', 'Basic m2vvw4xzn6d')
xhr.send()

// revisar los datos en mongoose