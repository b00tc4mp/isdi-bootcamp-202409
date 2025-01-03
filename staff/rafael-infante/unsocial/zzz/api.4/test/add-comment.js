const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/m31o037p6yl/comments')
xhr.setRequestHeader('Authorization', 'Basic m2wgq7tdelk')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"text":"Gracias Cami!"}')