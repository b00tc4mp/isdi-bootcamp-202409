const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/67321b9c1caf2dc8f4e26353')
xhr.setRequestHeader('Authorization', 'Basic 672e23e5344b26bc5b0f870f')
xhr.send()
