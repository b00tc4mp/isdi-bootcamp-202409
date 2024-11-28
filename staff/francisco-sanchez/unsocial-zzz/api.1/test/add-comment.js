const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/672f7aef4ee4e332926502a9/comments')
xhr.setRequestHeader('Authorization', 'Basic 672e2707de7dde80ec9233c6')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send('{"text":"Y este comentario se ha realizado desde XHR"}')