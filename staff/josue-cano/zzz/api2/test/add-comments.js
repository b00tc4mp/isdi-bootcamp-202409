const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})


xhr.open('POST', 'http://localhost:8080/posts/m2x2g9dhsdo/comments')
xhr.setRequestHeader('Authorization', 'Basic m2x5x9r5oz8')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text":"quepaxaa"}')
