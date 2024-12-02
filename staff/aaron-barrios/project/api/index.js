import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    //hace que tu servidor sea accesible a otros dominios 
    server.use(cors())

    server.get('/', (_, res) => res.send('HELLO, API!'))

    server.use('/users', usersRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})