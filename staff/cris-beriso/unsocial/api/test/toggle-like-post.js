const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m30forth0co/likes')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.send()