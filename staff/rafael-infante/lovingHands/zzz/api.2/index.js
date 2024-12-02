import 'dotenv/config'
import db from '../dat/index.js'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { errors } from 'com'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
  console.log('connected to db')

  const server = express()

  server.use(cors())

  const jsonBodyParser = json()

  server.get('/', (_, res) => res.send('Hello, API!'))

  server.post(
    '/users/auth',
    jsonBodyParser,
    createFunctionalHandler(async (req, res) => {
      const { email, password } = req.body

      const { id, role } = await logic.authenticateUser(email, password)

      const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '2h' })

      res.json(token)
    })
  )

  server.post(
    '/users',
    jsonBodyParser,
    createFunctionalHandler(async (req, res) => {
      const { name, email, password, passwordRepeat } = req.body

      await logic.registerUser(name, email, password, passwordRepeat)

      res.status(201).send()
    })
  )

  server.get(
    '/users/:targetUserId/name',
    authorizationHandler,
    createFunctionalHandler((req, res) => {
      const {
        userId,
        params: { targetUserId },
      } = req

      return logic.getUserName(userId, targetUserId).then((name) => res.json(name))
    })
  )

  server.use(errorHandler)

  server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})
