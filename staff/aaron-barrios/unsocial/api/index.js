import db from 'dat'
import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors'



db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        //CREACION DEL SERVIDOR CON EL METODO EXPRESS
        const server = express()

        server.use(cors())

        const jsonBodyParser = express.json() //MIDDLEWARE

        //MOSTRAMOS QUE EL SERVIDOR ESTA VIVO Y TE DEVUELVE LA RESPUESTA DE HELLO API -> NO HAY PETICON
        server.get('/', (_, res) => res.send('Hello, API!'))

        //PETICIÓN DEL ID DEL USUARIO -> MÉTODO AUTHENTICATE
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
                        res.status(401).json({ error: error.constructor.name, message: error.message })

                        console.error(error)
                    })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                console.error(error)
            }
        })


        // ----- GET USERNAME -----
        //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
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


        // ----- GET POSTS -----
        //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
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

        // ----- GET COMMENTS -----
        //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
        server.get('/posts/:postId/comments', (req, res) => {

            try {
                const { userId } = req.params

                const name = logic.getUserName(userId)

                res.json(name)
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                console.error(error)
            }
        })


        // ----- CREATE POST -----
        server.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6) //OBTENEMOS EL ID 'Basic //asdfasdfas' -> ID

                const { image, text } = req.body

                logic.createPost(userId, text, image)
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

        // ----- CREATE COMMENT -----
        server.post('/posts/comments/:userId/:postId', jsonBodyParser, (req, res) => {
            try {
                // const {params: {postId}, body: {text}} = req
                const userId = req.headers.authorization.slice(6) //OBTENEMOS EL ID 'Basic //asdfasdfas' -> ID  

                const { postId } = req.params

                const { text } = req.body

                logic.createComment(userId, postId, text)
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

        // ----- DELETE POST -----
        //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
        server.delete('/posts/:postId', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId } = req.params

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

        // ----- DELETE COMMENT -----
        //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
        server.delete('/posts/:postId/comments/:commentId', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)
                const { postId, commentId } = req.params

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

        // ----- TOGGLE LIKE POST -----
        //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
        server.patch('/posts/:postId/likes', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId } = req.params

                logic.toggleLikePost(userId, postId)
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


        server.listen(8080, () => console.log('api is up'))
    })