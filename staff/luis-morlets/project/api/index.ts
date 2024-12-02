import 'dotenv/config'
import db from 'dat'
import express, { Request, RequestHandler, Response, json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import logic from './logic/index.js'
import IRequest from './types.js'

import { createFunctionalHandler, errorHandler, authorizationHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST!).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_: Request, res: Response): void => { res.send('Hello API!') })

    server.post('/players/auth', jsonBodyParser, createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body

        const { id } = await logic.authenticatePlayer(username, password)

        const token = await jwt.sign({ sub: id }, process.env.JWT_SECRET!, { expiresIn: '14d' })

        res.json(token)
    }))

    server.post('/players', jsonBodyParser, createFunctionalHandler(async (req: Request, res: Response) => {
        const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

        await logic.registerPlayer(name, email, username, password, passwordRepeat)

        res.status(201).send()
    }))

    server.get('/players/:targetPlayerId/username', authorizationHandler as RequestHandler, createFunctionalHandler(async (req: IRequest, res: Response) => {
        const { playerId, params: { targetPlayerId } } = req

        const username = await logic.getPlayerUsername(playerId, targetPlayerId)

        res.json(username)
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})
