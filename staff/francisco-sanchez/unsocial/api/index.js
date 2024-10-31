import express, { json } from 'express'
import logic from './logic/index.js'

//Inicializamos el server de express 
const server = express()

//Parsea todas las respuestas de express a json
const jsonBodyParser = express.json()


//Metemos un servidor de aviso para indicar que está levantado
//el "_" hace referencia al parametro req, pero no lo estamos usando. 

//Literalmente le decimos: 
//Cuando entre una petición get en la raiz del documento "/", devuelve Hello Api! 
server.get('/', (_, res) => res.send('Hello, API!'))


//Nos indica la ruta de la carpeta public, sitio en el que están todos los archivos
//html, css, ... direcamente desde el navegador 
server.use(express.static('public'))


//Un post lleva toda la información en el cuerpo
//Usamos jsonbodyparser para transformar todo a json, desestructura y valida
//Si todo va bien devolvemos el userId
//Cómo es un método usaremos siempre un try / catch
server.post('/authenticate', jsonBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)
        res.json(userId)
    } catch (error) {
        res.status(401).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


server.post('/register', jsonBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    try {
        logic.registerUser(name, email, username, password, passwordRepeat)
        //Devolvemos un estado 201 si el registro ha ido correcto
        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


//el ":userId", sirve para pasar el usuario como parte de la URL 
// Ejemplo de la llamada --> curl http://localhost:8080/users/m2ey7tvjg0t/name -v (El user que le pasamos es variable)
server.get('/users/:userId/name', (req, res) => {
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
    const userId = req.headers.authorization.slice(6)

    const { image, text } = req.body

    try {
        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


server.listen(8080, () => console.log('api is up'))