import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test').then(() => {
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
    server.post('/authenticate', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password).then(userId => res.json(userId))
    }))

    server.post('/register', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        return logic.registerUser(name, email, username, password, passwordRepeat).then(() => res.status(201).send())
    }))

    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))

    //Inserta los posts
    server.post('/posts', jsonBodyParser, authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, body: { image, text } } = req

        return logic.createPost(userId, image, text).then(() => res.status(201).send())
    }))

    //Recupera los posts
    server.get('/posts', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId } = req

        return logic.getPosts(userId).then(posts => res.json(posts))
    }))

    //elimina un post
    server.delete('/posts/:postId', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.deletePost(userId, postId).then(() => res.status(204).send())
    }))

    //Llamada al toggle like posts
    server.patch('/posts/:postId/likes', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.toggleLikePost(userId, postId).then(() => res.status(204).send())
    }))

    //Montar la url para los addComments
    server.post('/posts/:postId/comments', authorizationHandler, jsonBodyParser, createFunctionalHandler((req, res) => {
        const { userId, params: { postId }, body: { text } } = req

        return logic.addComment(userId, postId, text).then(() => res.status(201).send())
    }))

    //url para removeComment
    server.delete('/posts/:postId/comments/:commentId', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId, commentId } } = req

        return logic.removeComment(userId, postId, commentId).then(() => res.status(204).send())
    }))

    //url para getComments
    server.get('/posts/:postId/comments', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { postId } } = req

        return logic.getComments(userId, postId).then(comments => res.json(comments))
    }))

    server.use(errorHandler)

    server.listen(8080, () => console.log('api is up'))
})