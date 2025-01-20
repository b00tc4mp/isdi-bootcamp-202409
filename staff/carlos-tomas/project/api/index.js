import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { userRouter, veterinaryRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('Hello, API!'))


    server.use('/users', userRouter)
    server.use('/veterinary', veterinaryRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, process.env.URL_API, () => console.log(`API listening ${process.env.URL_API} and port ${process.env.PORT} `))
})