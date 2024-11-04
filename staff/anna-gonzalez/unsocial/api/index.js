import express, { json } from 'express' //nos traemos express, gracias al cual muchas cosas vienen montadas vs web-server, donde hacíamos muchas cosas a manija
import logic from './logic/index.js'

const server = express() //creamos un server
//server.use(express.static('public')) //le digo al server que utilice la carpeta public, que tiene contenido estático. static es un middleware

/*
middleware para procesar data JSON en el cuerpo de los requests HTTP
todas las peticiones con post y content application, parsealo a json
middleware para crear el body
recibiremos json, es decir, que al servidor le enviaremos un json, y él lo convierte a objeto usando JSON.parse
*/
const jsonBodyParser = express.json()

/* ------------------------EJEMPLO 1 QUERY STRING------------------------
server.get('/hello', (req, res) => {
    //res.query.to
    const { to } = req.query //recoge el parámetro que envías en la query string
    res.send(`hello ${to}`)
})

//http://localhost:8080/hello?to=Pepito -> Hello Pepito
*/

/* ------------------------EJEMPLO 2 QUERY STRING *MALA PRAXIS X SEGURIDAD D DATOS, LA BUENA PRAXIS ES USAR MÉTODO POST Y RECIBIRLO EN EL BODY*------------------------
server.get('/login', (req, res) => {
    const { username, password } = req.query

    if ((username === 'peterpan' || username === 'wendydarling') && password === '123123123') {
        res.send(`Welcome &{username}`)

        return
    }
    res.send('Wrong credentials') //si hay error, se enviará en la respuesta este mensaje
})

//http://localhost:8080/login?username=peterpan&password=123123123 -> Welcome peterpan
*/

//cuando tengas una petición get, a esta ruta ejecuta lo de al lado. si no usas las requests, pones el guión bajo
server.get('/', (_, res) => res.send('Hello, API!'))

//(presentation, middleware, back)
//enviamos un post a server, le enviamos un json a la ruta authenticate, lo parsearemos conviertiéndolo en objeto y lo va poner en la propiedad body de la request y lo podremos destructurar
server.post('/authenticate', jsonBodyParser, (req, res) => {
    const { username, password } = req.body //el body no viene por defecto en express, se monta con jsonBodyParser

    try {
        const userId = logic.authenticateUser(username, password)

        res.json(userId) //si ha ido bien, devuélveme un json que tenga el userId
    } catch (error) { //401 "unauthorized"
        res.status(401).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.post('/register', jsonBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    try {
        logic.registerUser(name, email, username, password, passwordRepeat)

        //201 "created"
        res.status(201).send()
    } catch (error) {
        //400 "bad request" error that is user's fault
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/users/:userId', (req, res) => {
    const { userId } = req.params

    try {
        const user = logic.getUserId(userId)

        res.json(user)
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/users/:userId/name', (req, res) => { //:parámetro dinámico, que puede variar. de los usuarios, quiero este usuario, y de ahí quiero el name. cuando quiero algo concreto. es una ruta semántica
    const { userId } = req.params //objeto que recoge la propiedad. forma de enviar datos a través de la url

    try {
        const name = logic.getUserName(userId)

        res.json(name)
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/posts', (req, res) => { //cuando no se recibe data dl cliente no hace falta el jsonBodyParser
    const userId = req.headers.authorization.slice(6)

    try {
        const posts = logic.getPosts(userId)

        res.json(posts)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.post('/posts', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6) //'Basic asdfasdfas'. el slice es para quedarse solo con el id

    const { image, text } = req.body //recuerda que pasamos el userId aparta x repartir responsabilidades

    try {
        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.delete('/posts/:postId', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6)

    const { postId } = req.params

    try {
        logic.deletePost(userId, postId)

        res.status(204).send() //devuelves un 200 pero sin body
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params

    try {
        const comments = logic.getComments(postId)

        res.json(comments)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.post('/posts/:postId/comments', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6)
    const { postId } = req.params
    const { text } = req.body

    try {
        logic.addComment(userId, postId, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.delete('/posts/:postId/comments/:commentId', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6)

    const { postId, commentId } = req.params

    try {
        logic.removeComment(userId, postId, commentId)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.patch('/posts/:postId/likes', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleLikePost(userId, postId)

        res.status(200).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.patch('/posts/:postId/saves', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleSavePost(userId, postId)

        res.status(200).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.listen(8080, () => console.log('Api is up'))

/*
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
*/