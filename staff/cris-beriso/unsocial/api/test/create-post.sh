 curl -H 'Authorization: Basic m2vv3y5rpkr' -H 'Content-Type: application/json' -d '{"image":"http://ed-image.com","text":"hello world"}' http://localhost:8080/posts -v

# -H son cabeceras. La primera identifica al que hace la solicitud. La segunda el tipo de dato que se envia. 
# -d es el mensaje. 

#Aqui se testea el server, en los test.js se testea la lógica. 