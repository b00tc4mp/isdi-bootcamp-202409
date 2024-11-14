import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpeers/index.js'


db.connect(process.env.MONGO_URL_TEST).then(() => {
    //CREACION DEL SERVIDOR CON EL METODO EXPRESS
    const server = express()

    server.use(cors())

    const jsonBodyParser = json() //MIDDLEWARE

    //MOSTRAMOS QUE EL SERVIDOR ESTA VIVO Y TE DEVUELVE LA RESPUESTA DE HELLO API -> NO HAY PETICON
    server.get('/', (_, res) => res.send('Hello, API!'))

    //PETICIÓN DEL ID DEL USUARIO -> MÉTODO AUTHENTICATE
    server.post('/users/auth', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password).then(userId => res.json(userId))
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        return logic.registerUser(name, email, username, password, passwordRepeat).then(() => res.status(201).send())
    }))


    // ----- GET USERNAME -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))


    // ----- GET POSTS -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.get('/posts', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId } = req

        return logic.getPosts(userId).then(posts => res.json(posts))
    }))


    // ----- GET COMMENTS -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.get('/posts/:postId/comments', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.getComments(userId, postId).then(comments => res.json(comments))
    }))


    // ----- CREATE POST -----
    server.post('/posts', jsonBodyParser, authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, body: { text, image } } = req

        return logic.createPost(userId, text, image).then(() => res.status(201).send())
    }))

    // ----- CREATE COMMENT -----
    server.post('/posts/:postId/comments', jsonBodyParser, authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId }, body: { text } } = req

        return logic.createComment(userId, postId, text).then(() => res.status(201).send())
    }))

    // ----- DELETE POST -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.delete('/posts/:postId', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.deletePost(userId, postId).then(() => res.status(204).send())
    }))

    // ----- DELETE COMMENT -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.delete('/posts/:postId/comments/:commentId', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId, commentId } } = req

        return logic.removeComment(userId, postId, commentId).then(() => res.status(204).send())
    }))

    // ----- TOGGLE LIKE POST -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.patch('/posts/:postId/likes', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.toggleLikePost(userId, postId).then(() => res.status(204).send())
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})