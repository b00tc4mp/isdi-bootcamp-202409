import 'dotenv/config'
import db from 'dat'
import express, { Request, Response } from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import playersRouter from './routes/player/index.js'
import gameRouter from './routes/game/index.js'

db.connect(process.env.MONGO_URL_TEST!).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_: Request, res: Response): void => { res.send('Hello API!') })

    server.use('/players', playersRouter)
    server.use('/game', gameRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})
