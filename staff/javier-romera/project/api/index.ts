import 'dotenv/config'
import db from 'dat'
import express, { Request, Response, json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import logic from './logic/index.js'
import { createFunctionalHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.ALLPIECE_URL_TEST!).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_: Request, res: Response): void => { res.send('Hello API!') })

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body

        const { id, role } = await logic.authenticateUser(username, password)

        const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET!, { expiresIn: '14d' })

        res.json(token)
    }))

    server.post('/users', jsonBodyParser, createFunctionalHandler(async (req: Request, res: Response) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        await logic.registerUser(name, email, username, password, passwordRepeat)

        res.status(201).send()
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})