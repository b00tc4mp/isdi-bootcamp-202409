const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/m2xahp4vc08/comments')
xhr.send()