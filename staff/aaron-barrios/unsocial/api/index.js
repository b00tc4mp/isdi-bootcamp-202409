import express, { json } from 'express'
import logic from './logic/index.js'

//CREACION DEL SERVIDOR CON EL METODO EXPRESS
const server = express()

const jsonBodyParser = express.json() //MIDDLEWARE

//MOSTRAMOS QUE EL SERVIDOR ESTA VIVO Y TE DEVUELVE LA RESPUESTA DE HELLO API -> NO HAY PETICON
server.get('/', (_, res) => res.send('Hello, API!'))


//PETICIÓN DEL ID DEL USUARIO -> MÉTODO AUTHENTICATE
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

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


// ----- GET USERNAME -----
//SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
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


// ----- GET POSTS -----
//SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
server.get('/posts/:userId', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    try {
        const posts = logic.getPosts(userId)

        res.json(posts)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

// ----- GET COMMENTS -----
//SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
server.get('/comments/:userId/', (req, res) => {
    const { userId } = req.params

    try {
        const name = logic.getUserName(userId)

        res.json(name)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


// ----- CREATE POST -----
server.post('/posts', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6) //OBTENEMOS EL ID 'Basic //asdfasdfas' -> ID

    const { image, text } = req.body

    try {
        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

// ----- CREATE COMMENT -----
server.post('/posts/comments/:userId/:postId', jsonBodyParser, (req, res) => {
    const userId = req.headers.authorization.slice(6) //OBTENEMOS EL ID 'Basic //asdfasdfas' -> ID  

    const { text } = req.body

    try {
        logic.createComment(userId, postId, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

// ----- DELETE POST -----
//SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
server.delete('/posts/:userId/ :postId', (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.deletepost(userId, postId)

        res.status(200).send()

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }

})


server.listen(8080, () => console.log('api is up'))

// TODO use cookies for session management (RTFM cookies + express) 