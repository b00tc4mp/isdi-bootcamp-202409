import 'dotenv/config'
import db from 'dat'
import cors from 'cors'
import express from 'express'
import { usersRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        console.log(`studify is connected to db`)

        const app = express()
        app.use(cors())

        app.get('/', (_, res) => res.send('Hello, API!'))

        app.use('/users', usersRouter)

        app.listen(process.env.PORT, () => console.log(`api is up on port ${process.env.PORT}`))
    })
