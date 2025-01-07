import 'dotenv/config'
import db from 'dat'
import express from 'express' // ayuda a crear servidores web en Node.js(con esto ponemos get, post)
import cors from 'cors' // permite que el servidor reciba solicitudes de otros dominios o aplicaciones

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter, postsRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    server.use('/users', usersRouter)
    server.use('/posts', postsRouter)


    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})