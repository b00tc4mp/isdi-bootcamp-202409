const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('PATCH', 'http://localhost:8080/posts/m2xahp4vc08')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.send()