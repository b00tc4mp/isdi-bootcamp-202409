import 'dotenv/config'
import db from '../dat/index.js' // double check the route
import express from 'express'
import cors from 'cors'

import errorHandler from './routes/helpers/errorHandler.js'//index.js
import { usersRouter, recommendRouter } from './routes/index.js' // add {recommendRouter} latter //process.env.MONGO_URL_TEST

db.connect(process.env.MONGO_URL).then(() => { // switch to main db latter
    console.log('db connected')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('Hello API!'))

    server.use('/users', usersRouter)
    server.use('/recommends', recommendRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})