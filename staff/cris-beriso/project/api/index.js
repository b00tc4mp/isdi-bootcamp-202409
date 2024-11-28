import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
  console.log('connected to db')

  const server = express()

  server.use(cors())

  const jsonBodyParser = json() //todas las request que tengan el metodo post y el content type aplication, lo parsean a JS. 

  server.get('/', (_, res) => res.send('Hello, API!'))

  // server.post('/users/auth', jsonBodyParser, createFunctionalHandler((req, res) => {
  //   const { username, password } = req.body

  //   return logic.authenticateUser(username, password)
  //     .then(({ id, role }) => jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' }))
  //     .then(token => res.json(token))
  // }))

  server.post('/users', jsonBodyParser, createFunctionalHandler(async (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(name, email, username, password, passwordRepeat)

    res.status(201).send()
  }))

  server.use(errorHandler)

  server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})
