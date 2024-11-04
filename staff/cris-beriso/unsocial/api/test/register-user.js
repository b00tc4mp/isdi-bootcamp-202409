const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.reponse)
})

xhr.open('POST', 'http://localhost:8080/register')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"name": "Campa Nilla","email":"campa@nilla.com","username":"campa","password":"123123123","password-repeat":"123123123"}')
