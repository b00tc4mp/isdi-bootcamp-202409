import db from '../../dat/index.js'
import express, { json } from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import { errors } from 'com'

const { DuplicityError, SystemError, ValidationError, CredentialsError, NotFoundError, OwnershipError } = errors

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_req, res) => res.send('Hello, API!'))

    const createFunctionalHandler = callback =>
      (req, res, next) => {
        try {
          callback(req, res)
            .catch(next)
        } catch (error) {
          next(error)
        }
      }

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler((req, res) => {
      const { username, password } = req.body

      return logic.authenticateUser(username, password)
        .then(userId => res.json(userId))
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
      const { name, email, username, password, confirmPassword } = req.body

      return logic.registerUser(name, email, username, password, confirmPassword)
        .then(() => res.status(201).send())
    }))

    const authorizationHandler = (req, res, next) => {
      try {
        const userId = req.headers.authorization.slice(6)

        req.userId = userId

        next()
      } catch (error) {
        next(error)
      }
    }

    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, params: { targetUserId } } = req

      return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))

    server.get('/posts', authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId } = req

      return logic.getPosts(userId).then(posts => res.json(posts))
    }))

    server.post('/posts', jsonBodyParser, authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, body: { image, text } } = req

      return logic.createPost(userId, image, text).then(() => res.status(201).send())
    }))

    server.delete('/posts/:postId', authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, params: { postId } } = req

      return logic.deletePost(userId, postId).then(() => res.status(204).send())
    }))

    server.patch('/posts/:postId/likes', authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, params: { postId } } = req

      return logic.toggleLikePost(userId, postId).then(() => res.status(204).send())
    }))

    server.get('/posts/:postId/comments', authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, params: { postId } } = req

      return logic.getComments(userId, postId).then(comments => res.json(comments))
    }))

    server.delete('/posts/:postId/comments/:commentId', authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, params: { postId, commentId } } = req

      return logic.removeComment(userId, postId, commentId).then(() => res.status(204).send())
    }))

    server.post('/posts/:postId/comments', jsonBodyParser, authorizationHandler, createFunctionalHandler((req, res) => {
      const { userId, params: { postId }, body: { text } } = req

      logic.addComment(postId, text, userId)
        .then(() => res.status(201).send())
    }))

    server.use((error, req, res, next) => {
      let status = 500

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

