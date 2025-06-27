import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { authRouter, diverRouter, centerRouter, logsRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())
    server.use(express.json())

    server.get('/', (_, res) => res.send('Hello, API!'))

    //Attach the routes

    server.use('/users/auth', authRouter)
    server.use('/users/diver', diverRouter)
    server.use('/users/center', centerRouter)

    server.use('/logs', logsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})
