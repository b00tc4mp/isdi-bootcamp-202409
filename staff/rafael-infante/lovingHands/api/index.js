import 'dotenv/config'
import db from '../dat/index.js'
import express, {json} from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
  console.log('connected to db')

  const server = express()

  server.use(cors())

  const jsonBodyParser = json()

  server.get('/', (_, res) => res.send('Hello, API!'))

  server.post('/users', jsonBodyParser, (req, res) => {
    const { name, email, username, password, passwordRepeat } = req.body
  
    try {
      logic.registerUser(name, email, username, password, passwordRepeat)
  
      res.status(201).send()
    } catch (error) {
      res.status(400).json({ error: error.constructor.name, message: error.message })
  
      console.error(error)
    }
  })

  server.use(errorHandler)

  server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})