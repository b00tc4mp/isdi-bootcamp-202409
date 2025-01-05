 curl -H 'Content-Type: application/json' -d '{"username":"pepitogrillo","password":"123123123"}' http://localhost:8080/authenticate -v

 //curl: Es una herramienta en la terminal para enviar y recibir datos desde o hacia servidores
 //-H especifica un encabezado HTTP. Aquí, se usa para indicar que el tipo de contenido es application/json, lo que significa que los datos se envían en formato JSON.
 //-d indica los datos que estamos enviando.
 // http://localhost:8080/authenticate: la URL del servidor y el recurso al que enviamos los datos para autenticar al usuario.
 

 //Este comando intenta enviar el nombre de usuario y contraseña a http://localhost:8080/authenticate en un formato que el servidor espera, y recibe una respuesta para verificar si los datos de inicio de sesión son correctos.