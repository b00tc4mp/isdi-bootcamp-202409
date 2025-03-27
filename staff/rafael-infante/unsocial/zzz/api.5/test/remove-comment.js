const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('DELETE', 'http://localhost:8080/posts/m2whs8nnb4/comments/m31yymtxsg')
xhr.setRequestHeader('Authorization', 'Basic m2wgq7tdelk')
xhr.send()