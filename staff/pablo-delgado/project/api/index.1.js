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
            .then(({ id, role }) => jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' }))
            .then(token => res.json(token))
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        return logic.registerUser(name, email, username, password, passwordRepeat).then(() => res.status(201).send())
    }))

    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})