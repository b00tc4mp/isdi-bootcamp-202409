import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('database connected')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('API is Up Ready to go'))

    /*

    Here will be all the endpoints of the API. 

    */

    //server.use(errorHandler)    --> To late

    server.listen(process.env.PORT, () => console.log('api is up'))
})