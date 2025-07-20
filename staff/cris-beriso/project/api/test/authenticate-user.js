const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users/auth')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"pineapple", "password":"criscris"}')