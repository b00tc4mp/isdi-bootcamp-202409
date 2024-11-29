import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import logic from './logic/index.js'
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpeers/index.js'


db.connect(process.env.MONGO_URL).then(() => {
    //CREACION DEL SERVIDOR CON EL METODO EXPRESS
    const server = express()

    server.use(cors())

    const jsonBodyParser = json() //MIDDLEWARE

    //MOSTRAMOS QUE EL SERVIDOR ESTA VIVO Y TE DEVUELVE LA RESPUESTA DE HELLO API -> NO HAY PETICON
    server.get('/', (_, res) => res.send('Hello, API!'))

    //PETICIÓN DEL ID DEL USUARIO -> MÉTODO AUTHENTICATE
    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { username, password } = req.body

        const { id, role } = await logic.authenticateUser(username, password)

        const token = jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json(token)
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        await logic.registerUser(name, email, username, password, passwordRepeat)

        res.status(201).send()
    }))

    // ----- GET USERNAME -----
    //SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: { targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json(name))
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})