const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Pine Apple", "email": "pine@apple.com", "username": "pineapple", "password": "criscris", "password-repeat": "criscris"}')