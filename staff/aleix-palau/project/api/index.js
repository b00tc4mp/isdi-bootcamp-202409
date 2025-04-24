import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'
import http from 'http'

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter, heartbeatsRouter, matchesRouter, notificationsRouter } from './routes/index.js'
import { initializeSocket } from './socketSetup.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
    console.log('connected to db')

    const app = express()
    const server = http.createServer(app) // Create HTTP server from Express app for Socket.io

    // Setup socket and get the userSockets map
    const { io, userSockets } = initializeSocket(server)

    // Store the map on the app instance for use in route handlers
    app.set('userSockets', userSockets)

    // Add io to the request object for use in route handlers
    app.use((req, res, next) => {
        req.io = io // Pass io instance
        next()
    })

    app.use(cors())

    // Increase the body size limit to 4 MB for JSON and urlencoded bodies
    app.use(express.json({ limit: '4mb' }))
    app.use(express.urlencoded({ limit: '4mb', extended: true }))

    app.get('/', (_, res) => res.send('Sup, API!'))

    app.use('/users', usersRouter)
    app.use('/heartbeats', heartbeatsRouter)
    app.use('/matches', matchesRouter)
    app.use('/notifications', notificationsRouter)

    app.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})