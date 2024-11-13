import db from 'dat'
import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import { errors } from 'com'

const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } = errors

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        console.log('connected to db')

        const server = express()

        server.use(cors())

        const jsonBodyParser = json()

        server.get('/', (_, res) => res.send('Hello, API!'))

        server.post('/users/auth', jsonBodyParser, (req, res, next) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => res.json(userId))
                    //.catch(error => next(error))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.post('/users', jsonBodyParser, (req, res, next) => {
            try {
                const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

                logic.registerUser(name, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.get('/users/:targetUserId/name', (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { targetUserId } = req.params

                logic.getUserName(userId, targetUserId)
                    .then(name => res.json(name))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.post('/posts', jsonBodyParser, (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { image, text } = req.body

                logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.get('/posts', (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                logic.getPosts(userId)
                    .then(posts => res.json(posts))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.delete('/posts/:postId', (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId } = req.params

                logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.patch('/posts/:postId/likes', (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId } = req.params

                logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.post('/posts/:postId/comments', jsonBodyParser, (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { params: { postId }, body: { text } } = req

                logic.addComment(userId, postId, text)
                    .then(() => res.status(201).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.delete('/posts/:postId/comments/:commentId', (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId, commentId } = req.params

                logic.removeComment(userId, postId, commentId)
                    .then(() => res.status(204).send())
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

        server.get('/posts/:postId/comments', (req, res, next) => {
            try {
                const userId = req.headers.authorization.slice(6)

                const { postId } = req.params

                logic.getComments(userId, postId)
                    .then(comments => res.json(comments))
                    .catch(next)
            } catch (error) {
                next(error)
            }
        })

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