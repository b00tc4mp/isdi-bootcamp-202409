const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m31o037p6yl/likes')
xhr.setRequestHeader('Authorization', 'Basic m2wgq7tdelk')
xhr.send()