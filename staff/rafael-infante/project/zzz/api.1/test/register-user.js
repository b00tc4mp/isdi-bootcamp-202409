const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name":"Manuelita Saenz","email":"manu@saenz.com","username":"manuelita","password":"123123123","passwordRepeat":"123123123"}')