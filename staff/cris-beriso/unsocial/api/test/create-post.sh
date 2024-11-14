 curl -H 'Authorization: Basic 6734ce44dfcd991dd513e654' -H 'Content-Type: application/json' -d '{"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30KLozTwK_j-Gp4oU7vaomlxKWFVrs3-9Gw&s","text":"I love this sport"}' http://localhost:8080/posts -v

# -H son cabeceras. La primera identifica al que hace la solicitud. La segunda el tipo de dato que se envia. 
# -d es el mensaje. 
# -v este flag lo que hace es sintetizar la información que devuelve el curl para que sea más facil de entender.

#Aqui se testea el server, en los test.js se testea la lógica. 