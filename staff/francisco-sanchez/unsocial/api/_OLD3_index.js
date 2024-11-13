import db from 'dat'
import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors' //Para permitir el acceso a la api desde la app
import { errors } from 'com'

const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } = errors

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        console.log('Conected to database')

        //Inicializamos el server de express 
        const server = express()

        //Esto nos permite que la api sea accedida de muchos sitios
        server.use(cors())

        //Parsea todas las !!!respuestas!!! de express a json
        //const jsonBodyParser = express.json()
        const jsonBodyParser = json()

        //Literalmente le decimos: 
        //Cuando entre una petición get en la raiz del documento "/", devuelve Hello Api! 
        server.get('/', (_, res) => res.send('Hello, API! Status = Ready to go!'))

        //Cómo es un método usaremos siempre un try / catch
        server.post('/authenticate', jsonBodyParser, (req, res, next) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => res.json(userId))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.post('/register', jsonBodyParser, (req, res, next) => {
            try {
                const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

                logic.registerUser(name, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        const authorizationHandler = (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                req.userId = userId

                next()
            } catch (error) {
                next(error)
            }
        }

        server.get('/users/:targetUserId/name', authorizationHandler, (req, res, next) => {
            try {
                const { userId, params: { targetUserId } } = req

                logic.getUserName(userId, targetUserId)
                    .then(name => res.json(name))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //Inserta los posts
        server.post('/posts', jsonBodyParser, authorizationHandler, (req, res, next) => {
            try {
                const { userId, body: { image, text } } = req

                logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //Recupera los posts
        server.get('/posts', authorizationHandler, (req, res, next) => {
            try {
                const { userId } = req

                logic.getPosts(userId)
                    .then(posts => res.json(posts))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //elimina un post
        server.delete('/posts/:postId', authorizationHandler, (req, res, next) => {
            try {
                const { userId, params: { postId } } = req

                logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //Llamada al toggle like posts
        server.patch('/posts/:postId/likes', authorizationHandler, (req, res, next) => {
            try {
                const { userId, params: { postId } } = req

                logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //Montar la url para los addComments
        server.post('/posts/:postId/comments', authorizationHandler, jsonBodyParser, (req, res, next) => {
            try {
                const { userId, params: { postId }, body: { text } } = req

                logic.addComment(userId, postId, text)
                    .then(() => res.status(201).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //url para removeComment
        server.delete('/posts/:postId/comments/:commentId', authorizationHandler, (req, res, next) => {
            try {
                const { userId, params: { postId, commentId } } = req

                logic.removeComment(userId, postId, commentId)
                    .then(() => res.status(204).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        //url para getComments
        server.get('/posts/:postId/comments', authorizationHandler, (req, res, next) => {
            try {
                const { userId, params: { postId } } = req

                logic.getComments(userId, postId)
                    .then(comments => res.json(comments))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })
        //:
        /* Aquí pondremos el middleware de Express para controlar los errores
        function errorHandler (err, req, res, next) {
            if (res.headersSent) {
                return next(err)
            }
            res.status(500)
            res.render('error', { error: err })
        }
        */

        server.use((error, req, res, next) => {
            let status = 500

            // if (error instanceof ValidationError)
            //     status = 406
            // else if (error instanceof NotFoundError)
            //     status = 404
            // else if (error instanceof CredentialsError)
            //     status = 401
            // else if (error instanceof DuplicityError)
            //     status = 409
            // else if (error instanceof OwnershipError)
            //     status = 403

            switch (true) {
                case (error instanceof ValidationError):
                    status = 406
                    break
                case (error instanceof NotFoundError):
                    status = 404
                    break
                case (error instanceof CredentialsError):
                    status = 401
                    break
                case (error instanceof DuplicityError):
                    status = 409
                    break
                case (error instanceof OwnershipError):
                    status = 403
                    break
            }
            res.status(status).json({ error: status === 500 ? SystemError.name : error.constructor.name, message: error.message })

            console.error(error)
        })

        server.listen(8080, () => console.log('api is up'))
    })