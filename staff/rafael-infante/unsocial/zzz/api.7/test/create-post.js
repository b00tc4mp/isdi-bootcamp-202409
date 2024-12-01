const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts/')
xhr.setRequestHeader('Authorization', 'Basic m2wgq7tdelk')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image":"https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg","text":"Mi mejor version"}')