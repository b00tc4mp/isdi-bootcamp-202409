const xhr = new XMLHttpRequest

/*
Aqui establezco lo que ocurre cuando proceso la respuesta ('load'). 
Que es mostrar el estado y la respuesta.
*/
xhr.addEventListener('load', () => {
  console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/authenticate')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username":"beriso", "password":"criscris"}')
