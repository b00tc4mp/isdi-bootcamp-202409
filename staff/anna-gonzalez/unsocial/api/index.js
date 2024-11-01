import express, { json } from 'express' //nos traemos express, gracias al cual ya muchas cosas vienen montadas vs web-server, donde hacíamos muchas cosas a manija
import logic from './logic/index.js'

const server = express() //creamos un server
//server.use(express.static('public')) //le digo al server que utilice la carpeta public, que tiene contenido estático. static es un middleware

//middleware used to process JSON data in the body of the HTTP requests. todas las peticiones con post y content application, parsealo a json
//middleware para crear el body
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

//cuando tengas una petición get, a la ruta ejecuta lo de al lado. si no usas las requests, pones el guión bajo
server.get('/', (_, res) => res.send('Hello, API!'))

//(presentation, middleware, back)
server.post('/authenticate', jsonBodyParser, (req, res) => {
    const { username, password } = req.body //el body no viene por defecto en express, se monta con jsonBodyParser

    try {
        const userId = logic.authenticateUser(username, password)

        res.json(userId)
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

server.get('/users/:userId/name', (req, res) => { //:parámetro dinámico, que puede variar
    const { userId } = req.params

    try {
        const name = logic.getUserName(userId)

        res.json(name)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.post('/posts', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6) //'Basic asdfasdfas'. el slice es para quedarse solo con el id

    const { image, text } = req.body

    try {
        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.delete('/deletePost', jsonBodyParser, (req, res) => {


    const { postId } = req.body

    try {
        logic.deletePost(postId, userId)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.listen(8080, () => console.log('Api is up'))

/*
terminal commands:
    node . //arrancar el server. voy al navegador y pongo localhost:8080/ruta. ej: localhost:8080/authenticate
*/