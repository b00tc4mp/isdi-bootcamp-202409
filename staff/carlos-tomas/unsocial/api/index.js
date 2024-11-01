import express, { json } from 'express'
import logic from './logic/index.js'

const server = express()

const jsonBodyParser = express.json()

server.get('/', (_, res) => res.send('Hello, API!'))

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

server.get('/users/:userId/name', (req, res) => { // la direccion donde tiene que ir y luego :userId le damos la id y luego nos busca el nombre de ese id 
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
    const userId = req.headers.authorization.slice(6) // 'Basic asdfasdfas'

    const { image, text } = req.body

    try {
        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.delete('/posts/deletePost/:postId', (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.deletePost(userId, postId)
        res.status(200).send()
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.patch('/posts/likes/:postId', (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.toggleLikePost(userId, postId)
        res.status(200).send()
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/posts/getposts', (req, res) => {

    try {

        const posts = logic.getPosts()
        res.json(posts)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.post('/posts/comment/:postId', jsonBodyParser, (req, res) => {
    const { postId } = req.params
    const userId = req.headers.authorization.slice(6)
    const { text } = req.body

    try {
        logic.addComment(userId, postId, text)
        res.status(200).send()
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


server.delete('/posts/deleteComment/:postId/:commentId', (req, res) => {
    const { postId, commentId } = req.params
    const userId = req.headers.authorization.slice(6)

    try {
        logic.removeComments(userId, postId, commentId)
        res.status(200).send()
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})


server.listen(8080, () => console.log('api is up'))

// TODO use cookies for session management (RTFM cookies + express)