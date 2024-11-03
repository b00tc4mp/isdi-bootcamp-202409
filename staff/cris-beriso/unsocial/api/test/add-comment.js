const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m31vupo8g1r/comments')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text": "hola"}')