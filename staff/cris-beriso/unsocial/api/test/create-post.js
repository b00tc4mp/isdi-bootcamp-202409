const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic 672e23c59b19f01fb4c38f37')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49v0CTq4qN332Zz6k7Ov_7KON5si0ZSXa8w&s", "text":"happy dog"}')