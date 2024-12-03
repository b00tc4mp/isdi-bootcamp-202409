import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express' // ayuda a crear servidores web en Node.js(con esto ponemos get, post)
import cors from 'cors' // permite que el servidor reciba solicitudes de otros dominios o aplicaciones
import jwt from 'jsonwebtoken'//para proteger nuestra pagina

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './routes/helpers/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { email, password } = req.body

        const { id, role } = await logic.authenticateUser(email, password)

        const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json(token)
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { name, email, password, 'password-repeat': passwordRepeat } = req.body

        return logic.registerUser(name, email, password, passwordRepeat).then(() => res.status(201).send())
    }))

    server.put('/users', jsonBodyParser, createFunctionalHandler((req, res) => {
        const { id, name, surname, phone, city, postalCode } = req.body

        return logic.saveUser(id, name, surname, phone, city, postalCode).then(() => res.status(201).send())
    }))

    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})