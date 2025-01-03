const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/')
xhr.setRequestHeader('Authorization', 'Basic m2wgq7tdelk')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image":"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg","text":"karma leon"}')