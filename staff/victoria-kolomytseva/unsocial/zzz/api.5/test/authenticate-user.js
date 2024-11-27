const xhr = new XMLHttpRequest //rea una solicitud nueva, llamada xhr, para enviar datos al servidor
//agregamos una función que se ejecuta cuando el servidor responde
xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response) //xhr.status: el código de estado de la respuesta (como 200 si fue exitoso).
})//xhr.response: el mensaje que el servidor envía como respuesta

xhr.open('POST', 'http://localhost:8080/authenticate') //Esto configura la solicitud para usar el método POST, que envía datos a la dirección
xhr.setRequestHeader('Content-Type', 'application/json')//Agregar el Tipo de Contenido
xhr.send('{"username" : "pepitogrillo","password":"123123123"}')//El servidor puede usar esta información para verificar si las credenciales son correctas.