const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2x6bfznwyj/comments')
xhr.setRequestHeader('Authorization', 'Basic m2osxzzmwg6')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send('{"text":"ouuuuu mama!"}')
