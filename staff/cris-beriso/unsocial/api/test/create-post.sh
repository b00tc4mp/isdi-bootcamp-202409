 curl -H 'Authorization: Basic m2vzaqy1te' -H 'Content-Type: application/json' -d '{"image":"https://img.freepik.com/vector-gratis/feliz-halloween-concepto-letras_23-2148628530.jpg","text":"happy halloween"}' http://localhost:8080/posts -v

# -H son cabeceras. La primera identifica al que hace la solicitud. La segunda el tipo de dato que se envia. 
# -d es el mensaje. 
# -v este flag lo que hace es sintetizar la información que devuelve el curl para que sea más facil de entender.

#Aqui se testea el server, en los test.js se testea la lógica. 