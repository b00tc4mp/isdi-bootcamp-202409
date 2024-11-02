const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2xaitq72o')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.send()
