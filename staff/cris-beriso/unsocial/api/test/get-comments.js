const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('GET', 'http://localhost:8080/posts/67322cd9d8208c90cf28c095/comments')
xhr.setRequestHeader('Authorization', 'Basic 672e230267cd354e2b45d776')
xhr.send()