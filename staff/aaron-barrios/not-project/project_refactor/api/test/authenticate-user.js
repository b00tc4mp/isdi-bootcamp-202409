const xhr = new XMLHttpRequest

//RESPUESTA LO QUE RECIBE EL SERVIDOR
xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})


//LO QUE TU LE ENVÍAS (CLIENTE)
xhr.open('POST', 'http://localhost:8080/authenticate')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"username": "pepitogrillo", "password":"123"}')  