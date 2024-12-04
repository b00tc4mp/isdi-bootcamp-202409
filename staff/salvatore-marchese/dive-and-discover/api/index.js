import 'dotenv/config'
import db from '../dat/index.js'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'


import logic from './logic/index.js' 
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('API connected!'))

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { email, password } = req.body

        const { id, role } = await logic.authenticateUser(email, password)

        const token = jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json(token)
    }))

    server.post('/HomeDiver', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, email, password, 'password-repeat': passwordRepeat } = req.body

        // Ensure that passwords match before calling the register logic
        if (password !== passwordRepeat) {
            return res.status(400).send('Passwords do not match');
        }

        await logic.registerUserDiver(name, email, password, passwordRepeat)

        res.status(201).send()
    }))

    server.get('/Diver/Profile', authorizationHandler, async (req, res) => {
        const { sub } = req.user; // Extracted from the verified JWT token
        const user = await logic.getUserById(sub);
        res.json(user);
    })

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})

