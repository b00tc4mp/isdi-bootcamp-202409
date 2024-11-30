import 'dotenv/config'
import db from './dat/index.js'
import express, { json } from 'express'
import cors from 'cors'
// import jwt from 'jsonwebtoken'

import { productsRouter, usersRouter } from './routes/index.js'
import { errorHandler } from './middleware/index.js'


db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('Welcome to Entelequia Comic - Book Store API!'))

    server.use('/users', usersRouter)
    server.use('/products', productsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})