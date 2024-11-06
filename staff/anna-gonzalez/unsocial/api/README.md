terminal commands:

    cd staff/.../api
    npm init --yes //crear un paquete y poner "type": "module"
    npm i express //instalar express. el archivo generado x defecto se puede borrar
    touch index.js //creo un archivo

    control C //parar la api
    node . //arrancar el server. voy al navegador y pongo localhost:8080/ruta. ej: localhost:8080/authenticate
    npm start //previo habiéndolo puesto en el package "start"
    
    curl //herramienta que me permite conectarme al servidor rápidamente sin usar el navegador
        -H header donde especifico el content type. ej: -H 'Content-Type: application/json'
        -d enviamos un json y ruta. ej: -d '{"username":"pepitogrillo","password":"123123123"}' http://localhost:8080/login 
        -v verbose (para ver todo lo q ha pasado)
        -X digo qué método va ahí

    cd staff/.../api
    node logic/createPost.test.js //tests para probar la lógica de forma aislada. Una vez funciona, me lo llevo a index.js, haciendo una ruta para crear un post

    test/authenticate-user.sh //ejecuta automáticamente el código con el dólar que es para el terminal

    xhr se prueba en el navegador directamente, previamente hay q estar conectados a la api
        Si pongo lo siguiente tras probarlo en el navegador, me lo pasa a objeto:
        JSON.parse(xhr.response)

    ls -l test/authenticate-user.sh //ver si tengo permisos, o sea si el archivo es ejecutable
        RWX (lectura, escritura, ejecución) rwxrwxrwx (yo, mi equipo, otros equipos)
        en binario: 111 111 111

        RW- R-- R--
        110 100 100
        esto en binario es el número 6 4 4.
        
        Si quiero todos los permisos: 7 4 4
        chmod 744 test/login-user.sh

    node --inspect-brk //debugar
        o eso o añado en el script del package "inspect": "node --inspect-brk ." y npm run inspect

    npm i cors //conectar api app