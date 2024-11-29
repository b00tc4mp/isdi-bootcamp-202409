import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpeers/index.js'
import { usersRouter, postsRouter } from './routes/index.js'


db.connect(process.env.MONGO_URL).then(() => {
    //CREACION DEL SERVIDOR CON EL METODO EXPRESS
    const server = express()

    server.use(cors())

    //MOSTRAMOS QUE EL SERVIDOR ESTA VIVO Y TE DEVUELVE LA RESPUESTA DE HELLO API -> NO HAY PETICON
    server.get('/', (_, res) => res.send('Hello, API!'))

    server.use('/users', usersRouter)
    server.use('/posts', postsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})