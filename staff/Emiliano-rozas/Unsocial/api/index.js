import express, { json } from 'express'
import logic from './logic/index.js'

const server = express()

const jsonBodyParser = express.json()

server.get('/', (_, res) => res.send('Hello,API!'))

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

server.post('/posts/:postId', jsonBodyParser, (req, res) => {

    const userId = req.headers.authorization.slice(6)

    const { text } = req.body

    const { postId } = req.params

    try {
        logic.addComment(userId, postId, text)

        res.status(201).send()

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.delete('/posts/:postId/comments/:commentId', (req, res) => {

    const userId = req.headers.authorization.slice(6)

    const { postId, commentId } = req.params

    try {
        logic.removeComments(userId, postId, commentId)

        res.status(200).send()

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.get('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params

    try {
        const comment = logic.getComments(postId)

        res.json(comment)
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

server.patch('/posts/:postId/', (req, res) => {
    const userId = req.headers.authorization.slice(6)

    const { postId } = req.params
    try {
        logic.toggleLikePost(userId, postId)

        res.status(201).send()

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })

        console.error(error)
    }
})

server.listen(8080, () => console.log('api is up'))