import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'

import { errorHandler } from './routes/helpers/index.js'
import { usersRouter, logsRouter } from './routes/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())
    server.use(express.json())

    server.get('/', (_, res) => res.send('Hello, API!'))

    //Attach the routes
    server.use('/users', usersRouter)
    server.use('/logs', logsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})






// TO CHECK BELOW 


/* import 'dotenv/config'
import db from '../dat/index.js'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'


import logic from './logic/index.js' 
import { getUser, updateUser } from './logic/user.js'

import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('API connected!'))


    // TODO: Rename to login 
    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { email, password } = req.body

        return logic.authenticateUser(email, password)
            .then(({ id, role }) => jwt.sign({ sub: id, role }, process.env.JWT_SECRET, {expiresIn: '1h' }))
            .then(token => res.json({token}))
    }))
  
    server.post('/register-diver', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, email, password, 'password-repeat': passwordRepeat } = req.body

        // Ensure that passwords match before calling the register logic
        if (password !== passwordRepeat) {
            return res.status(400).send('Passwords do not match');
        }

        await logic.registerUserDiver(name, email, password, passwordRepeat).then(() => res.status(201).send())
    }))



    //READ 
    server.get('/users/:id', authorizationHandler, createFunctionalHandler( async(req, res) => {
        const { id } = req.params;
        const user = await getUser(id);
        res.json(user);
    }))

    //USER PROFILE
    server.get('/profile', authorizationHandler, async (req, res) => {
        const { userId } = req; // Extracted from the verified JWT token
        const user = await getUser(userId);
        res.json(user);
    })

    //UPDATE USER DATA
    server.put('/user/:id', jsonBodyParser, authorizationHandler, async (req, res) => {
        try {
            console.log("body")
            console.log(req.body)
            const updated = await updateUser(req.params.id, req.body);
            console.log(updated)
            res.json(updated);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})

 */