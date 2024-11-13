import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        console.log('connected to db')

        const server = express()

        server.use(cors())

        const jsonBodyParser = json()

        server.get('/', (_, res) => res.send('Hello API!'))

        server.post('/users/auth', jsonBodyParser, createFunctionalHandler((req, res) => {
            const { username, password } = req.body

            return logic.authenticateUser(username, password)
                .then(userId => res.json(userId))
        }))

        server.post('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
            const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

            return logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => res.status(201).send())
        }))

        //UUUGGGHHHH
        server.get('/users/:userId', (req, res) => { // Estos objetos en parametro son los que se envian después
            const { userId } = req.params

            try {
                const user = logic.getUserId(userId)

                res.json(user)
            } catch (error) {
                res.status(404).json({ error: error.constructor.name, message: error.message })

                console.error(error)
            }
        })
        //UUUGGGHHHH

        server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
            const { userId, params: { targetUserId } } = req

            return logic.getUserName(userId, targetUserId)
                .then(name => res.json(name))
        }))

        server.get('/posts', authorizationHandler, createFunctionalHandler((req, res) => {
            const { userId } = req

            return logic.getPosts(userId)
                .then(posts => res.json(posts))
        }))

        server.post('/posts', authorizationHandler, jsonBodyParser, createFunctionalHandler((req, res) => {
            const { userId, body: { image, text } } = req

            return logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
        }))

        server.delete('/posts/:postId', authorizationHandler, createFunctionalHandler((req, res) => {
            const { userId, params: { postId } } = req

            return logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        server.patch('/posts/:postId/likes', authorizationHandler, createFunctionalHandler((req, res) => {
            const { userId, params: { postId } } = req

            return logic.toggleLikePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        server.get('/posts/:postId/comments', authorizationHandler, createFunctionalHandler((req, res) => {
            const { userId, params: { postId } } = req

            return logic.getComments(userId, postId)
                .then(comments => res.json(comments))
        }))

        server.post('/posts/:postId/comments', authorizationHandler, jsonBodyParser, createFunctionalHandler((req, res) => {
            const { userId, params: { postId }, body: { text } } = req

            return logic.addComment(userId, postId, text)
                .then(() => res.status(201).send())
        }))

        server.delete('/posts/:postId/comments/:commentId', authorizationHandler, createFunctionalHandler((req, res) => {
            const { userId, params: { postId, commentId } } = req

            return logic.removeComment(userId, postId, commentId)
                .then(() => { res.status(204).send() })
        }))

        server.use(errorHandler)

        server.listen(8080, () => console.log('api is up'))
    })