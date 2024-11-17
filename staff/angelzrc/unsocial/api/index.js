import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'


db.connect(process.env.MONGO_URL).then(() => {

    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(userId => jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '2h' }))
            .then(token => res.json(token))
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        return logic.registerUser(name, email, username, password, passworRepeat).then(() => res.status(201).send())
    }))

    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))

    server.post('/posts', jsonBodyParser, authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, body: { image, text } } = req

        return logic.createPost(userId, image, text).then(() => res.status(201).send())
    }))

    server.get('/posts', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId } = req

        return logic.getPosts(userId).then(posts => res.json(posts))
    }))

    server.delete('/posts/:postId', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.deletePost(userId, postId).then(() => res.status(204).send())
    }))

    server.patch('/posts/:postId/likes', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.toggleLikePost(userId, postId).then(() => res.status(204).send())
    }))

    server.post('/posts/:postId/comments', authorizationHandler, jsonBodyParser, createFunctionalHandler((req, res) => {
        const { userId, params: { postId }, body: { text } } = req

        return logic.addComment(userId, postId, text).then(() => res.status(201).send())
    }))

    server.delete('/posts/:postId/comments/:commentId', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId, commentId } } = req

        return logic.removeComment(userId, postId, commentId).then(() => res.status(204).send())
    }))

    server.get('/posts/:postId/comments', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.getComments(userId, postId).then(comments => res.json(comments))
    }))
    server.use(errorHandler)
    server.listen(process.env.PORT, () => console.log(`API is listening on port ${process.env.PORT}`))
})