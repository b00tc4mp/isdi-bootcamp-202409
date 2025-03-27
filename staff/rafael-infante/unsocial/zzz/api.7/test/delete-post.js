const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m31nyx5ie7n')
xhr.setRequestHeader('Authorization', 'Basic m2wgq7tdelk')
xhr.send()