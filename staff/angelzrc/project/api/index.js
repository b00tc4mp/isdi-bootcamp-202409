import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter, postsRouter, meetsRouter } from './routes/index.js'

console.log('MONGO URL:', process.env.MONGO_URL)
console.log('Port:', process.env.PORT);
db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.use('/users', usersRouter)
    server.use('/posts', postsRouter)
    server.use('/meets', meetsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})