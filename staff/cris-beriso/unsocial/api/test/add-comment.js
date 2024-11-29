const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/6730dcf6f1c5e699fd2f603f/comments')
xhr.setRequestHeader('Authorization', 'Basic 672e23e5344b26bc5b0f870f')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text": "hola"}')