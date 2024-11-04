import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors'

const server = express()//inicializamos un servidor con express

server.use(cors())

const jsonBodyParser = json()//toda la informacion que bajamos del servidor se convierte a formato JSON

server.get('/', (_, res) => res.send('Hello, API!'))//Es como una ruta por defecto para informarnos que el API está arriba 

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

server.get('/users/:userId', (req, res) => {
    const { userId } = req.params

    try {
        const id = logic.getUserId(userId)

        res.json(id)
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
    }
})

server.get('/posts', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    try {
        const posts = logic.getPosts(userId)

        res.json(posts)
    } catch {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)
    }
})


server.delete('/posts/:postId', jsonBodyParser, (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.deletePost(userId, postId)

        res.status(204).send()
    } catch {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)
    }
})

server.patch('/posts/:postId/likes', (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.toggleLikePosts(userId, postId)
        res.status(204).send()
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
        logic.addComments(userId, postId, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)
    }
})

server.delete('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.removeComment(userId, postId, commentId)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)
    try {
        const comments = logic.getComments(userId, postId)
        res.json(comments)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
        console.error(error)
    }
})

server.listen(7070, () => console.log('api is up'))