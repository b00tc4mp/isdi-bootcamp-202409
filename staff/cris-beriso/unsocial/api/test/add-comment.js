const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m2xahp4vc08/comments')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text": "hola"}')