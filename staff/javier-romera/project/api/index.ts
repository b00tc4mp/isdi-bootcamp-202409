import 'dotenv/config'
import db from 'dat'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { deleteAnonymousUsersCronJob } from './cron/index.js'

import { errorHandler } from './routes/helpers/index.js'
import { charactersRouter, usersRouter, conditionsRouter } from './routes/index.js'

db.connect(process.env.ALLPIECE_URL!).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_: Request, res: Response): void => { res.send('Hello API!') })

    server.use('/users', usersRouter)
    server.use('/characters', charactersRouter)
    server.use('/conditions', conditionsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})

deleteAnonymousUsersCronJob()