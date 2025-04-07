const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/6730dcf6f1c5e699fd2f603f/comments/6730ddc4f1c5e699fd2f6040')
xhr.setRequestHeader('Authorization', 'Basic 672e23e5344b26bc5b0f870f')
xhr.send()