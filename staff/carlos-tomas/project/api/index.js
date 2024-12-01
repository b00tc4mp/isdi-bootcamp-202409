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

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { username, password } = req.body

        const { id, role } = await logic.authenticateUser(username, password)

        const token = jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token })
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, username, password, phone, email, passwordRepeat } = req.body

        await logic.registerUser(name, username, password, phone, email, passwordRepeat)

        res.status(201).send()
    }))


    server.use(errorHandler)

    server.listen(8080, '192.168.1.62', () => console.log('API listening on /192.168.1.107:8080'))
})