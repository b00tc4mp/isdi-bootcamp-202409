import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors'

//Inicializamos el server de express 
const server = express()


//Esto nos permite que la api sea accedida de muchos sitios
server.use(cors())


//Parsea todas las !!!respuestas!!! de express a json
const jsonBodyParser = express.json()  //¿?¿?¿? podemos mantener express.json? o quitamos express?? 


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
server.get('/users/:targetUserId/name', (req, res) => {
    //const { userId } = req.params
    const userId = req.headers.authorization.slice(6)
    const { targetUserId } = req.params

    try {
        const name = logic.getUserName(userId, targetUserId)

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



server.get('/posts', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    try {
        const posts = logic.getPosts(userId)
        res.json(posts)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)

    }
})


server.delete('/posts/:postId', jsonBodyParser, (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.deletePost(userId, postId)
        res.status(204).send() //Cuando el server devuelve OK
        //El resultado 200 estaría bien, pero cuando no hay que devolver nada mejor un 204
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

        res.status(204).send()


    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

    }

})


//Montar la url para los addComments
server.post('/posts/:postId/comments', jsonBodyParser, (req, res) => {

    const userId = req.headers.authorization.slice(6)

    const { postId } = req.params

    const { text } = req.body

    //const { params: { postId }, body: { text } } = req

    try {
        logic.addComment(userId, postId, text)
        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)
    }

})

//Llamada al toggle like posts
server.patch('/posts/:postId/likes', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleLikePost(userId, postId)
        res.status(204).send()

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)
    }
})


//url para removeComment
server.delete('/posts/:postId/comments/:commentId', (req, res) => {
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



//url para getComments
server.get('/posts/:postId/comments', (req, res) => {
    const userId = req.headers.authorization.slice(6)
    const { postId } = req.params

    try {
        const comments = logic.getComments(userId, postId)
        res.json(comments)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)

    }
})






server.listen(8080, () => console.log('api is up'))