const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2vzaqy1te')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image": "https://img.freepik.com/vector-gratis/feliz-halloween-concepto-letras_23-2148628530.jpg", "text":"happy halloween"}')