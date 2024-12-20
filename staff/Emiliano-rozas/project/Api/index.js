import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'
// import jwt from 'jsonwebtoken'

import { productsRouter, usersRouter, cartRouter, orderRouter, paymentsRouter } from './routes/index.js'
import { errorHandler } from './middleware/index.js'


db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('Welcome to Entelequia Comic - Book Store API!'))

    server.use('/users', usersRouter)
    server.use('/products', productsRouter)
    server.use('/carts', cartRouter)
    server.use('/orders', orderRouter)
    server.use('/payments', paymentsRouter);

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})