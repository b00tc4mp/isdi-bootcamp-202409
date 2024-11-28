import 'dotenv/config'
import db from './dat/index.js'
import express, { json } from 'express'
import cors from 'cors'
// import jwt from 'jsonwebtoken'

import logic from './logic/index.js'

import { createFunctionalHandler } from './middleware/index.js'


db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('Welcome to Entelequia Comic - Book Store API!'))

    server.post('/users', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        await logic.registerUser(name, email, username, password, passwordRepeat)

        res.status(201).send()
    }))

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})