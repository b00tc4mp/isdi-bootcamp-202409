// index.js
import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter } from './routes/index.js'

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('🟢 Connected to MongoDB Atlas')

    const server = express()

    server.use(cors())
    server.use(express.json())

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.use('/users', usersRouter)
    server.use(errorHandler)

    server.listen(PORT, () => {
      console.log(`✅ API listening port ${PORT}`)
    })
  } catch (err) {
    console.error('🔴 Error connecting MongoDB:', err.message)
  }
}

startServer()
