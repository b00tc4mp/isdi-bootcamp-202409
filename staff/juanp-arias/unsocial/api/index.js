import db from 'dat'
import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        console.log(`you're connected to db baby`)
        const server = express()//inicializamos un servidor con express

        server.use(cors())

        const jsonBodyParser = json()//toda la informacion que bajamos del servidor se convierte a formato JSON

        server.get('/', (_, res) => res.send('Hello, API!'))//Es como una ruta por defecto para informarnos que el API está arriba 

        server.post('/authenticate', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => res.json(userId))
                    .catch(error => {
                        res.status(401).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(401).json({ error: error.constructor.name, message: error.message })

                console.error(error)
            }
        })

        server.post('/register', jsonBodyParser, (req, res) => {
            try {
                const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

                logic.registerUser(name, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                console.error(error)
            }
        })

        server.get('/users/:targetUserId/name', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)
                const { targetUserId } = req.params

                logic.getUserName(userId, targetUserId)
                    .then(name => res.json(name))
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
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
            try {
                const userId = req.headers.authorization.slice(6)

                const { image, text } = req.body

                logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/posts', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)

                logic.getPosts(userId)
                    .then(posts => res.json(posts))
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })


        server.delete('/posts/:postId', jsonBodyParser, (req, res) => {
            try {
                const { postId } = req.params
                const userId = req.headers.authorization.slice(6)

                logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })

        server.patch('/posts/:postId/likes', (req, res) => {
            try {
                const { postId } = req.params
                const userId = req.headers.authorization.slice(6)

                logic.toggleLikePosts(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })


        server.post('/posts/:postId/comments', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)
                const { postId } = req.params
                const { text } = req.body

                logic.addComments(userId, postId, text)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
                console.error(error)
            }
        })

        server.delete('/posts/:postId/comments/:commentId', (req, res) => {
            try {
                const { postId, commentId } = req.params
                const userId = req.headers.authorization.slice(6)

                logic.removeComment(userId, postId, commentId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
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
    })