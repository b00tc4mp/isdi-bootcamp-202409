import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter, packsRouter, trackerRouter, activitiesRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('database connected')

    const server = express()

    server.use(cors())

    server.get('/', (_, res) => res.send('API is Up Ready to go'))

    //Here will be all the endpoints of the API. 
    server.use('/users', usersRouter)
    server.use('/packs', packsRouter)
    server.use('/tracker', trackerRouter)
    server.use('/activities', activitiesRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`api is up and listening on port ${process.env.PORT}`))
})